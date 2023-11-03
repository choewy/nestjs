import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoDBConnectionName } from '@common/enums';
import { AwsSQSLog } from '@common/schemas';
import { ListResponseDto } from '@common/dto';

import { AwsSQSLogResponseDto, GetLogsQueryDto } from './dto';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(AwsSQSLog.name, MongoDBConnectionName.App)
    private readonly awsSQSLogModel: Model<AwsSQSLog>,
  ) {}

  async getAwsSQSLogsByQuery(query: GetLogsQueryDto): Promise<ListResponseDto<GetLogsQueryDto, AwsSQSLogResponseDto>> {
    const skip = isNaN(query.skip) ? 0 : Number(query.skip);
    const limit = isNaN(query.limit) ? 20 : Number(query.limit);

    const [total, rows] = await Promise.all([
      await this.awsSQSLogModel.count(),
      await this.awsSQSLogModel.find().skip(skip).limit(limit).sort({ createdAt: 'desc' }).exec(),
    ]);

    return new ListResponseDto(
      total,
      { skip, limit },
      rows.map((row) => new AwsSQSLogResponseDto(row)),
    );
  }
}

import { Controller, Get, Query } from '@nestjs/common';

import { ListResponseDto } from '@common/dto';

import { AwsSQSLogResponseDto, GetLogsQueryDto } from './dto';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get('sqs')
  async getAwsSQSLogsByQuery(
    @Query() query: GetLogsQueryDto,
  ): Promise<ListResponseDto<GetLogsQueryDto, AwsSQSLogResponseDto>> {
    return this.logsService.getAwsSQSLogsByQuery(query);
  }
}

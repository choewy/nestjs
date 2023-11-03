import { BadRequestException, Injectable } from '@nestjs/common';

import { AwsSQSQueueName } from '@common/enums';
import { HostMessageEvent } from '@common/events';

import { AwsSQSProducer, AwsSQSService } from '@core/aws-sqs';

@Injectable()
export class GuestService {
  private readonly awsSQSProducer: AwsSQSProducer;

  constructor(private readonly awsSQSService: AwsSQSService) {
    this.awsSQSProducer = this.awsSQSService.createProducer(GuestService.name);
  }

  async sendMessageToHost(message?: string): Promise<void> {
    if (!message) {
      throw new BadRequestException();
    }

    const error = await this.awsSQSProducer.sendMsg(
      AwsSQSQueueName.Host,
      HostMessageEvent.Subject,
      new HostMessageEvent(message),
    );

    if (error) {
      throw new BadRequestException(error);
    }
  }
}

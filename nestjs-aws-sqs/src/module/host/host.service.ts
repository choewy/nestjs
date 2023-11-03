import { BadRequestException, Injectable } from '@nestjs/common';

import { AwsSQSQueueName } from '@common/enums';
import { GuestMessageEvent } from '@common/events';

import { AwsSQSProducer, AwsSQSService } from '@core/aws-sqs';

@Injectable()
export class HostService {
  private readonly awsSQSProducer: AwsSQSProducer;

  constructor(private readonly awsSQSService: AwsSQSService) {
    this.awsSQSProducer = this.awsSQSService.createProducer(HostService.name);
  }

  async sendMessageToGuest(message?: string): Promise<void> {
    if (!message) {
      throw new BadRequestException();
    }

    const error = await this.awsSQSProducer.sendMsg(
      AwsSQSQueueName.Guest,
      GuestMessageEvent.Subject,
      new GuestMessageEvent(message),
    );

    if (error) {
      throw new BadRequestException(error);
    }
  }
}

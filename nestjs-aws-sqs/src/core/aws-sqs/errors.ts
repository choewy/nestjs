export class AwsSQSProduceError extends Error {
  constructor(readonly details?: unknown) {
    super();

    this.name = AwsSQSProduceError.name;

    if (details instanceof Error) {
      this.message = details.message;
    }
  }
}

export class AwsSQSConsumeError extends Error {
  constructor(readonly details?: unknown) {
    super();

    this.name = AwsSQSConsumeError.name;

    if (details instanceof Error) {
      this.message = details.message;
    }
  }
}

export class AwsSQSConsumerError extends Error {
  constructor(readonly details?: unknown) {
    super();

    this.name = AwsSQSConsumerError.name;

    if (details instanceof Error) {
      this.message = details.message;
    }
  }
}

export class AwsSQSProcessingFailError extends Error {
  constructor(readonly details?: unknown) {
    super();

    this.name = AwsSQSProcessingFailError.name;

    if (details instanceof Error) {
      this.message = details.message;
    }
  }
}

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

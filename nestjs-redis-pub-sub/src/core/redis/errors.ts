export class RedisSubError extends Error {
  constructor(details?: unknown) {
    super();

    this.name = RedisSubError.name;

    if (details instanceof Error) {
      this.message = details.message;
      this.stack = details.stack;
    }
  }
}

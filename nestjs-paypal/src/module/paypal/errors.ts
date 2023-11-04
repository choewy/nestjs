import { AxiosError } from 'axios';

export class FailGetPaypalOrderError extends Error {
  constructor(details?: unknown) {
    super();

    this.name = FailGetPaypalOrderError.name;

    if (details instanceof AxiosError) {
      this.cause = details.response?.data;
    }

    if (details instanceof Error) {
      this.cause = details;
    }
  }
}

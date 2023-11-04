import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export class InputHandler<T> {
  constructor(private setBody: Dispatch<SetStateAction<T>>) {}

  string = (e: ChangeEvent<HTMLInputElement>) => {
    this.setBody((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  int = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    if (e.target.value === '') {
      return this.setBody((prev) => ({ ...prev, [name]: null }));
    }

    const value = Number(e.target.value);

    if (Number.isNaN(value)) {
      return;
    }

    this.setBody((prev) => ({ ...prev, [name]: value }));
  };
}

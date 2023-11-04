import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export class InputHandler<T> {
  constructor(private setBody: Dispatch<SetStateAction<T>>) {}

  text = (e: ChangeEvent<HTMLInputElement>) => {
    this.setBody((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  number = (e: ChangeEvent<HTMLInputElement>) => {
    const split = e.target.value.split('.');

    if (split.length > 2) {
      return;
    }

    if (e.target.value.endsWith('.')) {
      this.setBody((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));

      return;
    }

    let value: number;

    if (split.length > 1) {
      let precision = split[0];
      let scale = split[1];

      if (scale.length > 2) {
        scale = scale.slice(0, 2);
      }

      value = Number([precision, scale].join('.'));
    } else {
      value = Number(e.target.value);
    }

    if (Number.isNaN(value)) {
      return;
    }

    this.setBody((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };
}

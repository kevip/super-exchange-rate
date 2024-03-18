import { FormControl, ValidatorFn } from "@angular/forms";

export class Control extends FormControl {

  protected textErrors: { [key: string]: string } = {
    required: 'Este campo es requerido',
  };
  constructor(value = '', validators?: ValidatorFn[]) {
    super(value, validators);
  }
  get message(): string {
    if (this.errors !== null) {
      const error = Object.keys(this.errors)[0];

      return this.textErrors[error];
    }

    return '';
  }

  get isInvalid(): boolean {
    return this.touched && this.invalid;
  }
}

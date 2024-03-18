import { Validators } from '@angular/forms';
import { Control } from './control';

export class EmailControl extends Control {

  protected override textErrors: { [key: string]: string } = {
    required: 'Este campo es requerido',
    email: 'Correo inválido',
  };

  constructor(value = '') {
    super(value, [
      Validators.required,
      Validators.email,
    ]);
  }
}

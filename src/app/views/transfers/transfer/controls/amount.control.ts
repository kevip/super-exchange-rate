import { Validators } from '@angular/forms';
import { Control } from './control';

export class AmountControl extends Control {

  protected override textErrors: { [key: string]: string } = {
    required: 'Este campo es requerido',
    min: 'El monto mínimo es de 1',
    max: 'El monto máximo es de 999999999',
  };

  constructor(value = '') {
    super(value, [
      Validators.required,
      Validators.min(1),
      Validators.max(999999999),
    ]);
  }
}

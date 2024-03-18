import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeRateCardComponent } from './exchange-rate-card.component';
import { MatCardModule } from '@angular/material/card';

const MATERIAL_MODULES = [
  MatCardModule,
]
@NgModule({
  declarations: [ExchangeRateCardComponent],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
  ],
  exports: [ExchangeRateCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExchangeRateCardModule { }

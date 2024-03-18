import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { CurrencyExchangeRoutingModule } from './currency-exchange-routing.module';
import { CurrencyExchangeComponent } from './currency-exchange.component';
import { ExchangeRateHttp } from 'src/app/core/http/exchange-rate.http';
import { MatTableModule } from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import { ExchangeRateService } from 'src/app/core/services/exchange-rate.service';
import { MatIconModule } from '@angular/material/icon';
import { ExchangeRateListModule } from 'src/app/shared/components/exchange-rate-list/exchange-rate-list.module';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatTableModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    CurrencyExchangeComponent,
  ],
  imports: [
    CommonModule,
    CurrencyExchangeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ExchangeRateListModule,
    ...MATERIAL_MODULES,
  ],
  providers: [
    ExchangeRateHttp,
    CdkColumnDef,
    ExchangeRateService,
  ]
})
export class CurrencyExchangeModule { }

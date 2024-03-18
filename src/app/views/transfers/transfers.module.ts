import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransfersRoutingModule } from './transfers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExchangeRateService } from 'src/app/core/services/exchange-rate.service';
import { ExchangeRateHttp } from 'src/app/core/http/exchange-rate.http';
import { HttpClientModule } from '@angular/common/http';
import { TransferComponent } from './transfer/transfer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { ExchangeRateCardModule } from 'src/app/shared/components/exchange-rate-card/exchange-rate-card.module';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatOptionModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    TransferComponent,
  ],
  imports: [
    CommonModule,
    TransfersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ExchangeRateCardModule,
    ...MATERIAL_MODULES,
  ],
  providers: [
    ExchangeRateService,
    ExchangeRateHttp,
  ]
})
export class TransfersModule { }

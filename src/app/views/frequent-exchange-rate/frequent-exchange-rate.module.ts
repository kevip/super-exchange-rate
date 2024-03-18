import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FrequentExchangeRateRoutingModule } from './frequent-exchange-rate-routing.module';
import { FrequentExchangeRateComponent } from './frequent-exchange-rate.component';
import { ExchangeRateService } from 'src/app/core/services/exchange-rate.service';
import { ExchangeRateHttp } from 'src/app/core/http/exchange-rate.http';
import { ExchangeRateListModule } from 'src/app/shared/components/exchange-rate-list/exchange-rate-list.module';
import { EditFrequentComponent } from './edit-frequent/edit-frequent.component';

@NgModule({
  declarations: [
    FrequentExchangeRateComponent,
    EditFrequentComponent,
  ],
  imports: [
    CommonModule,
    FrequentExchangeRateRoutingModule,
    RouterModule,
    HttpClientModule,
    ExchangeRateListModule,
  ],
  providers: [
    ExchangeRateService,
    ExchangeRateHttp,
  ],
})
export class FrequentExchangeRateModule { }

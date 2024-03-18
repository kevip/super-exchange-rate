import { ResolveFn } from '@angular/router';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { inject } from '@angular/core';
import { TRecentExchangeRate } from '../models/recent-exchange-rate/recent-exchange-rate.model';

export const frequentExchangeRateResolver: ResolveFn<TRecentExchangeRate[]> = (
  route,
  state,
  service: ExchangeRateService = inject(ExchangeRateService)
) => {

  return service.getFrequentExchangeRates();
};

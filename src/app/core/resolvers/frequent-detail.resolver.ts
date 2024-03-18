import { ResolveFn } from '@angular/router';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { inject } from '@angular/core';
import { TRecentExchangeRate } from '../models/recent-exchange-rate/recent-exchange-rate.model';

export const frequentDetailResolver: ResolveFn<TRecentExchangeRate> = (
  route,
  state,
  service: ExchangeRateService = inject(ExchangeRateService)) => {
  const uuid = route.paramMap.get('uuid') as string;

  return service.getFrequentDetail(uuid);
};

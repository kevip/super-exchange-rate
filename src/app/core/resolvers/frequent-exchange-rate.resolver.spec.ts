import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { frequentExchangeRateResolver } from './frequent-exchange-rate.resolver';
import { TRecentExchangeRate } from '../models/recent-exchange-rate/recent-exchange-rate.model';

describe('frequentExchangeRateResolver', () => {
  const executeResolver: ResolveFn<TRecentExchangeRate[]> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => frequentExchangeRateResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

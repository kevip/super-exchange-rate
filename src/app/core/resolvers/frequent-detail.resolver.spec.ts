import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { frequentDetailResolver } from './frequent-detail.resolver';
import { TRecentExchangeRate } from '../models/recent-exchange-rate/recent-exchange-rate.model';

describe('frequentDetailResolver', () => {
  const executeResolver: ResolveFn<TRecentExchangeRate> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => frequentDetailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

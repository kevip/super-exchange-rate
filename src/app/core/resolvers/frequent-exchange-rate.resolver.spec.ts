import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { frequentExchangeRateResolver } from './frequent-exchange-rate.resolver';

describe('frequentExchangeRateResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => frequentExchangeRateResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

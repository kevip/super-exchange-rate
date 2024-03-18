import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { frequentDetailResolver } from './frequent-detail.resolver';

describe('frequentDetailResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => frequentDetailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

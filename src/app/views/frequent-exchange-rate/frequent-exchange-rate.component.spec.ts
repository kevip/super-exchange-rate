import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentExchangeRateComponent } from './frequent-exchange-rate.component';

describe('FrequentExchangeRateComponent', () => {
  let component: FrequentExchangeRateComponent;
  let fixture: ComponentFixture<FrequentExchangeRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrequentExchangeRateComponent]
    });
    fixture = TestBed.createComponent(FrequentExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

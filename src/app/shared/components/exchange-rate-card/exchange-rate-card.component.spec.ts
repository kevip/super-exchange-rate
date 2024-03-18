import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeRateCardComponent } from './exchange-rate-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ExchangeRateCardComponent', () => {
  let component: ExchangeRateCardComponent;
  let fixture: ComponentFixture<ExchangeRateCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeRateCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(ExchangeRateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

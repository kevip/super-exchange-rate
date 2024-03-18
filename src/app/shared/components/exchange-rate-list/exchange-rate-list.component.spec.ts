import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeRateListComponent } from './exchange-rate-list.component';

describe('ExchangeRateListComponent', () => {
  let component: ExchangeRateListComponent;
  let fixture: ComponentFixture<ExchangeRateListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeRateListComponent]
    });
    fixture = TestBed.createComponent(ExchangeRateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

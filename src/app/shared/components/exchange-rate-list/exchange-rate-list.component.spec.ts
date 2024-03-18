import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeRateListComponent } from './exchange-rate-list.component';
import { ExchangeRateService } from 'src/app/core/services/exchange-rate.service';
import { ExchangeRateHttp } from 'src/app/core/http/exchange-rate.http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ExchangeRateListModule } from './exchange-rate-list.module';

describe('ExchangeRateListComponent', () => {
  let component: ExchangeRateListComponent;
  let fixture: ComponentFixture<ExchangeRateListComponent>;
  let httpStub: jasmine.SpyObj<ExchangeRateHttp>;
  let serviceStub: jasmine.SpyObj<ExchangeRateService>;

  beforeEach(() => {
    httpStub = jasmine.createSpyObj(ExchangeRateHttp, ['calculateExchangeRate']);
    serviceStub = jasmine.createSpyObj(ExchangeRateService, [''])
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeRateListComponent],
      providers: [
        { provide: ExchangeRateService, useValue: httpStub},
        { provide: ExchangeRateHttp, useValue: serviceStub},
      ],
      imports: [ExchangeRateListModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(ExchangeRateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('when add frequents', () => {
    it('should ');
  });
});

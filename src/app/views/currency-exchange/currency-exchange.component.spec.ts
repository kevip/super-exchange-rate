import { ComponentFixture, TestBed, fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { delay, of } from 'rxjs';

import { CurrencyExchangeComponent } from './currency-exchange.component';
import { ExchangeRateHttp } from 'src/app/core/http/exchange-rate.http';
import { ExchangeRateService } from 'src/app/core/services/exchange-rate.service';
import { ExchangeRateListModule } from 'src/app/shared/components/exchange-rate-list/exchange-rate-list.module';
import { ConvertModel } from 'src/app/core/models/convert/convert.model';

fdescribe('CurrencyExchangeComponent', () => {
  let component: CurrencyExchangeComponent;
  let fixture: ComponentFixture<CurrencyExchangeComponent>;
  let httpStub: jasmine.SpyObj<ExchangeRateHttp>;
  let serviceStub: jasmine.SpyObj<ExchangeRateService>;
  const routeStub = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(() => {
    httpStub = jasmine.createSpyObj(ExchangeRateHttp, ['calculateExchangeRate']);
    serviceStub = jasmine.createSpyObj(ExchangeRateService, ['calculateExchangeRate'])
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyExchangeComponent],
      providers: [
        { provide: ExchangeRateService, useValue: httpStub },
        { provide: ExchangeRateHttp, useValue: serviceStub },
        { provide: ActivatedRoute, useValue: routeStub },
      ],
      imports: [
        ExchangeRateListModule,
        RouterModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(CurrencyExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('when getting exchange rate', () => {
    it('should stop loading when finalize', fakeAsync(() => {
      const source = 'from';
      const response = {
        success: true,
        query: {
          from: "USD",
          to: "EUR",
          amount: 750
        },
        info: {
          timestamp: 1710774484,
          rate: 0.91859
        },
        date: "2024-03-18",
        result: 688.9425
      };
      httpStub.calculateExchangeRate.and.returnValue(of(new ConvertModel(response)));

      component.getExchangeRate(source);
      tick(300);

      expect(component.calculatingRate).toBeFalse();
    }));
    it('should set new value when success', fakeAsync(() => {
      const source = 'to';
      const response = {
        success: true,
        query: {
          from: "USD",
          to: "EUR",
          amount: 750
        },
        info: {
          timestamp: 1710774484,
          rate: 0.91859
        },
        date: "2024-03-18",
        result: 688.9425
      };
      httpStub.calculateExchangeRate.and.returnValue(of(new ConvertModel(response)));

      component.getExchangeRate(source);
      tick(300);

      expect(component.form.controls.currencyFrom.value).toEqual(response.result);
    }));
    it('should not set new value when success is false', fakeAsync(() => {
      const source = 'from';
      const response = {
        success: false,
        query: {
          from: "USD",
          to: "EUR",
          amount: 750
        },
        info: {
          timestamp: 1710774484,
          rate: 0.91859
        },
        date: "2024-03-18",
        result: 688.9425
      };
      httpStub.calculateExchangeRate.and.returnValue(of(new ConvertModel(response)));

      component.getExchangeRate(source);
      tick(300);

      expect(component.form.controls.currencyTo.value).not.toEqual(response.result);
    }));
    it('should still loading when service has a delay', fakeAsync(() => {
      const source = 'from';
      const response = {
        success: true,
        query: {
          from: "USD",
          to: "EUR",
          amount: 750
        },
        info: {
          timestamp: 1710774484,
          rate: 0.91859
        },
        date: "2024-03-18",
        result: 688.9425
      };
      httpStub.calculateExchangeRate.and.returnValue(
        of(new ConvertModel(response)).pipe(delay(500))
        );

      component.getExchangeRate(source);
      tick(300);

      expect(component.calculatingRate).toBeTrue();
      tick(500);
      expect(component.calculatingRate).toBeFalse();
    }));
  });
});

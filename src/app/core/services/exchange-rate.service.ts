import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConvertModel } from '../models/convert/convert.model';
import { ExchangeRateHttp } from '../http/exchange-rate.http';
import { TRecentExchangeRate } from '../models/recent-exchange-rate/recent-exchange-rate.model';

@Injectable()
export class ExchangeRateService {

  constructor(private http: ExchangeRateHttp) { }

  calculateExchangeRate(currency: any, amount: string): Observable<ConvertModel> {

    return this.http.calculateExchangeRate({
      from: currency.from,
      to: currency.to,
      amount,
    });
  }

  addFrequentExchangeRate(exchangeRate: TRecentExchangeRate): void {
    const rates = this.getFrequentExchangeRates();
    window.localStorage.setItem('rates', JSON.stringify([
      ...rates, exchangeRate
    ]));
  }

  getFrequentExchangeRates(): TRecentExchangeRate[] {
    try {
      const json = window.localStorage.getItem('rates');

      return json ? JSON.parse(json) : [];
    } catch (e) {
      return [];
    }
  }
}

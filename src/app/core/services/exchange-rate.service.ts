import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConvertModel } from '../models/convert/convert.model';
import { ExchangeRateHttp } from '../http/exchange-rate.http';
import { TRecentExchangeRate } from '../models/recent-exchange-rate/recent-exchange-rate.model';

@Injectable()
export class ExchangeRateService {
  private frequentsExchangeRateSub = new BehaviorSubject<TRecentExchangeRate[]>([]);

  frequentExchangeRate$ = this.frequentsExchangeRateSub.asObservable();

  constructor(private http: ExchangeRateHttp) { }

  calculateExchangeRate(currency: any, amount: string): Observable<ConvertModel> {

    return this.http.calculateExchangeRate({
      from: currency.from,
      to: currency.to,
      amount,
    });
  }

  addFrequent(exchangeRate: TRecentExchangeRate): void {
    const rates = this.getFrequentExchangeRates();
    window.localStorage.setItem('rates', JSON.stringify([
      ...rates, exchangeRate
    ]));
    this.frequentsExchangeRateSub.next(rates);
  }

  getFrequentExchangeRates(): TRecentExchangeRate[] {
    try {
      const json = window.localStorage.getItem('rates');
      const rates = json ? JSON.parse(json) : [];
      this.frequentsExchangeRateSub.next(rates);

      return rates;
    } catch (e) {
      return [];
    }
  }
  removeFrequent(uuid: string): void {
    let rates = this.getFrequentExchangeRates();
    rates = rates.filter(rate => (rate.uuid !== uuid));
    window.localStorage.setItem('rates', JSON.stringify(rates));
    this.frequentsExchangeRateSub.next(rates);
  }
}

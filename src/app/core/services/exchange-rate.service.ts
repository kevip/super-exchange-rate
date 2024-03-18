import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, tap } from 'rxjs';
import { ConvertModel } from '../models/convert/convert.model';
import { ExchangeRateHttp } from '../http/exchange-rate.http';
import { TRecentExchangeRate } from '../models/recent-exchange-rate/recent-exchange-rate.model';
import { ECurrency } from '../config/currency';

@Injectable()
export class ExchangeRateService {
  frequentsExchangeRateSub = new BehaviorSubject<TRecentExchangeRate[]>([]);

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
    this.saveFrequents([...rates, exchangeRate]);
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

  getFrequentDetail(uuid: string): TRecentExchangeRate {
    const rates = this.getFrequentExchangeRates();

    return rates.find(rate => rate.uuid === uuid) as TRecentExchangeRate;
  }

  updateFrequent(uuid: string): Observable<any> {
    const frequent = this.getFrequentDetail(uuid);
    const defaultCurrencyFrom = ECurrency.CLP;

    return this.http.getRecentExchangeRate({
      from: defaultCurrencyFrom,
      to: frequent.currency
    }).pipe(
      filter(resp => resp.success),
      map(resp => resp.rates),
      map(rates => rates.find(rate => rate.currency === frequent.currency)),
      filter(rate => rate !== undefined),
      tap(newRate => {
        const rates = this.getFrequentExchangeRates().map(rate => {
          return rate.currency === newRate?.currency ? { ...rate, value: newRate.value } : rate;
        });
        this.saveFrequents(rates);
      })
    );
  }

  saveFrequents(rates: TRecentExchangeRate[]): void {
    this.setFrequents(rates);
    window.localStorage.setItem('rates', JSON.stringify(rates));
  }

  setFrequents(rates: TRecentExchangeRate[]): void {
    console.log(rates)
    this.frequentsExchangeRateSub.next(rates);
  }
}

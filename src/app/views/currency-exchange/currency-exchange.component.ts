import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, filter, finalize, interval, map, startWith, switchMap, take } from 'rxjs';
import { ECurrency } from 'src/app/core/config/currency';
import { ECurrencyName } from 'src/app/core/config/currency-name';
import { ECurrencySymbol } from 'src/app/core/config/currency-symbol';
import { ExchangeRateHttp } from 'src/app/core/http/exchange-rate.http';
import { RecentExchangeRateModel } from 'src/app/core/models/recent-exchange-rate/recent-exchange-rate.model';
import { ExchangeRateService } from 'src/app/core/services/exchange-rate.service';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss'],
})
export class CurrencyExchangeComponent implements OnInit {
  /**
   * Default source currency
   */
  currencyFrom = ECurrency.CLP;
  /**
   * Default target currency
   */
  currencyTo = ECurrency.USD;

  currencySymbol = ECurrencySymbol;

  currencyName = ECurrencyName;

  exchangeRate$!: Observable<RecentExchangeRateModel>;

  calculatingRate = false;

  form = new FormGroup({
    currencyFrom: new FormControl(),
    currencyTo: new FormControl(),
  });

  constructor(
    private http: ExchangeRateHttp,
    private service: ExchangeRateService,
  ) { }

  ngOnInit(): void {
    this.exchangeRate$ = interval(300000).pipe(
      startWith(0),
      map(() => ({ from: this.currencyFrom, to: this.currencyTo })),
      switchMap(({ from, to }) => this.http.getRecentExchangeRate({ from, to: 'USD,PEN' })),
      map(response => {
        const frequents = this.service.getFrequentExchangeRates();
        response.rates = response.rates.map(rate => {
          const isFrequent = frequents.find(frequent => frequent.currency === rate.currency) !== undefined;

          return { ...rate, isFrequent };
        });

        return response;
      }),
    );
  }

  getExchangeRate(source: string): void {
    this.calculatingRate = true;

    const isFrom = source === 'from';
    const fromKey = isFrom ? 'currencyFrom' : 'currencyTo';
    const toKey = isFrom ? 'currencyTo' : 'currencyFrom';
    const amount = this.form.controls[fromKey].value;

    this.calculateAndSetRate(fromKey, toKey, amount).pipe(
      finalize(() => this.calculatingRate = false)
    ).subscribe();
  }

  private calculateAndSetRate(fromKey: string, toKey: string, amount: string) {
    const fromCurrency = this[fromKey as keyof CurrencyExchangeComponent];
    const toCurrency = this[toKey as keyof CurrencyExchangeComponent];

    return this.service.calculateExchangeRate({ from: fromCurrency, to: toCurrency }, amount).pipe(
      filter(resp => resp.success),
      map(resp => resp.result),
      take(1),
      map(converted => this.form.get(toKey)?.setValue(converted))
    );
  }
}

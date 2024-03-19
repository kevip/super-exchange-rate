import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, Subscription, debounceTime, filter, finalize, interval, map, startWith, switchMap, take, tap } from 'rxjs';
import { ECurrency } from 'src/app/core/config/currency';
import { ECurrencyName } from 'src/app/core/config/currency-name';
import { ECurrencySymbol } from 'src/app/core/config/currency-symbol';
import { ESource } from 'src/app/core/config/source';
import { ETimer } from 'src/app/core/config/timer.enum';
import { ExchangeRateHttp } from 'src/app/core/http/exchange-rate.http';
import { RecentExchangeRateModel } from 'src/app/core/models/recent-exchange-rate/recent-exchange-rate.model';
import { ExchangeRateService } from 'src/app/core/services/exchange-rate.service';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss'],
})
export class CurrencyExchangeComponent implements OnInit, OnDestroy {

  private readonly DEFAULT_AMOUNT = 100;
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

  currentRate!: number;

  exchangeRate$!: Observable<RecentExchangeRateModel>;

  exchangeRatesub = new Subject<{ fromKey: string; toKey: string; amount: string }>();

  subs = new Subscription();

  calculatingRate = false;

  form = new FormGroup({
    currencyFrom: new FormControl(this.DEFAULT_AMOUNT),
    currencyTo: new FormControl(),
  });

  constructor(
    private http: ExchangeRateHttp,
    private service: ExchangeRateService,
  ) { }

  ngOnInit(): void {
    this.subscribeToRecentRates();
    this.subscribeToInputs();
    this.exchangeRatesub.next({
      fromKey: 'currencyFrom',
      toKey: 'currencyTo',
      amount: this.form.controls.currencyFrom.value as unknown as string,
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getExchangeRate(source: string): void {
    const isFrom = source === ESource.FROM;
    const fromKey = isFrom ? 'currencyFrom' : 'currencyTo';
    const toKey = isFrom ? 'currencyTo' : 'currencyFrom';
    const amount = this.form.controls[fromKey].value;
    this.exchangeRatesub.next({ fromKey, toKey, amount });
  }
  private subscribeToInputs(): void {
    this.subs.add(this.exchangeRatesub.pipe(
      debounceTime(ETimer.DEBOUNCE_TIME),
      tap(() => this.calculatingRate = true),
      switchMap(({ fromKey, toKey, amount }) => this.calculateAndSetRate(fromKey, toKey, amount)),
    ).subscribe());
  }

  private subscribeToRecentRates(): void {
    this.exchangeRate$ = interval(ETimer.REFRESH_EXCHANGE_RATE).pipe(
      startWith(0),
      map(() => ({ from: this.currencyFrom, to: this.currencyTo })),
      switchMap(({ from }) => this.http.getRecentExchangeRate({ from, to: 'USD,PEN' })),
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

  private calculateAndSetRate(fromKey: string, toKey: string, amount: string) {
    const fromCurrency = this[fromKey as keyof CurrencyExchangeComponent];
    const toCurrency = this[toKey as keyof CurrencyExchangeComponent];

    return this.service.calculateExchangeRate({ from: fromCurrency, to: toCurrency }, amount).pipe(
      filter(resp => resp.success),
      tap(resp => this.currentRate = resp.info.rate),
      map(resp => resp.result),
      take(1),
      map(converted => this.form.get(toKey)?.setValue(converted)),
      finalize(() => this.calculatingRate = false)
    );
  }
}

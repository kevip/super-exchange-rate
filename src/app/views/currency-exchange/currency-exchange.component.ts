import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, filter, interval, map, startWith, switchMap, take } from 'rxjs';
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
  currencyFrom = ECurrency.USD;
  /**
   * Default target currency
   */
  currencyTo = ECurrency.CLP;

  currencySymbol = ECurrencySymbol;

  currencyName = ECurrencyName;

  exchangeRate$!: Observable<RecentExchangeRateModel>;

  form = new FormGroup({
    currencyFrom: new FormControl(),
    currencyTo: new FormControl(),
  });

  constructor(
    private http: ExchangeRateHttp,
    private service: ExchangeRateService,
  ) { }

  ngOnInit(): void {
    this.exchangeRate$ = interval(1000000).pipe(
      startWith(0),
      map(() => ({ from: this.currencyFrom, to: this.currencyTo })),
      switchMap(({ from, to }) => this.http.getRecentExchangeRate({ from, to: 'USD,PEN' })),
    );
  }

  getExchangeRate(source: string): void {
    if (source === 'from') {
      const amountFrom = this.form.controls.currencyFrom.value;
      this.service.calculateExchangeRate({ from: this.currencyFrom, to: this.currencyTo }, amountFrom).pipe(
        filter(resp => resp.success),
        map(resp => resp.result),
        take(1),
      ).subscribe({
        next: converted => {
          this.form.controls.currencyTo.setValue(converted);
        }
      });
    } else if (source === 'to') {
      const amountTo = this.form.controls.currencyTo.value;
      this.service.calculateExchangeRate({ from: this.currencyTo, to: this.currencyFrom }, amountTo).pipe(
        filter(resp => resp.success),
        map(resp => resp.result),
        take(1),
      ).subscribe({
        next: converted => {
          this.form.controls.currencyFrom.setValue(converted);
        }
      });
    }
  }
}

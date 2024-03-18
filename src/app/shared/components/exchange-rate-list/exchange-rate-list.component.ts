import { Component, Input, OnInit } from '@angular/core';
import { TRecentExchangeRate } from 'src/app/core/models/recent-exchange-rate/recent-exchange-rate.model';
import { ExchangeRateService } from 'src/app/core/services/exchange-rate.service';
import { TListOptions } from '../../types/exchange-rate-list-options';
import { finalize, of, switchMap, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ERoutes } from 'src/app/core/config/routes';

@Component({
  selector: 'app-exchange-rate-list',
  templateUrl: './exchange-rate-list.component.html',
  styleUrls: ['./exchange-rate-list.component.scss'],
})
export class ExchangeRateListComponent implements OnInit {
  @Input() rates!: TRecentExchangeRate[];

  @Input() showOptions!: TListOptions;

  displayedColumns: string[] = ['currency', 'value'];

  loadingUpdate!: boolean;

  constructor(
    private service: ExchangeRateService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.showOptions) {
      this.displayedColumns.push('options');
    }
  }

  addFrequent(exchangeRate: TRecentExchangeRate): void {
    this.service.addFrequent(exchangeRate);
    window.location.reload();
  }

  removeFrequent(exchangeRate: TRecentExchangeRate): void {
    this.service.removeFrequent(exchangeRate.uuid);
  }

  transfer(exchangeRate: TRecentExchangeRate): void {
    const url = ERoutes.TRANSFER.replace(':uuid', exchangeRate.uuid);

    this.router.navigate([url]);
  }

  updateFrequent(exchangeRate: TRecentExchangeRate): void {
    of(null).pipe(
      tap(() => this.startLoading(exchangeRate)),
      switchMap(() => this.service.updateFrequent(exchangeRate.uuid).pipe(
      )),
      take(1),
      finalize(() => this.stopLoading(exchangeRate)),
    ).subscribe({
      next: (res) => {
      }
    });
  }
  private startLoading(exchangeRate: TRecentExchangeRate): void {
    const rates = this.service.getFrequentExchangeRates();
    this.service.saveFrequents([
      ...rates.map(rate => {
        if (rate.uuid === exchangeRate.uuid) {
          rate.loading = true;
        }
        return rate;
      }),
    ]);
  }

  private stopLoading(exchangeRate: TRecentExchangeRate): void {
    const rates = this.service.getFrequentExchangeRates();
    this.service.saveFrequents([
      ...rates.map(rate => {
        if (rate.uuid === exchangeRate.uuid) {
          rate.loading = false;
        }
        return rate;
      })
    ]);
  }
}

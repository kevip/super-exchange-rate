import { Component, Input } from '@angular/core';
import { RecentExchangeRateModel, TRecentExchangeRate } from '../../models/recent-exchange-rate/recent-exchange-rate.model';
import { ExchangeRateService } from '../../services/exchange-rate.service';

@Component({
  selector: 'app-exchange-rate-list',
  templateUrl: './exchange-rate-list.component.html',
  styleUrls: ['./exchange-rate-list.component.scss'],
})
export class ExchangeRateListComponent {
  @Input() rates!: RecentExchangeRateModel;

  displayedColumns: string[] = ['currency', 'value', 'options'];

  constructor(private service: ExchangeRateService) { }

  addFrequent(exchangeRate: TRecentExchangeRate): void {
    this.service.addFrequentExchangeRate(exchangeRate);
  }
}

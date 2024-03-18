import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TRecentExchangeRate } from 'src/app/core/models/recent-exchange-rate/recent-exchange-rate.model';
import { ExchangeRateService } from 'src/app/core/services/exchange-rate.service';
import { TListOptions } from '../../types/exchange-rate-list-options';

@Component({
  selector: 'app-exchange-rate-list',
  templateUrl: './exchange-rate-list.component.html',
  styleUrls: ['./exchange-rate-list.component.scss'],
})
export class ExchangeRateListComponent implements OnInit {
  @Input() rates!: TRecentExchangeRate[];

  @Input() showOptions!: TListOptions;

  displayedColumns: string[] = ['currency', 'value'];

  constructor(private service: ExchangeRateService) { }

  ngOnInit(): void {
    if(this.showOptions) {
      this.displayedColumns.push('options');
    }
  }

  addFrequent(exchangeRate: TRecentExchangeRate): void {
    this.service.addFrequent(exchangeRate);
  }
  removeFrequent(exchangeRate: TRecentExchangeRate): void {
    console.log('removing...')
    this.service.removeFrequent(exchangeRate.uuid);
  }
}

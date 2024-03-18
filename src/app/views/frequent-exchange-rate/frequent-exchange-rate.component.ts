import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { TRecentExchangeRate } from 'src/app/core/models/recent-exchange-rate/recent-exchange-rate.model';
import { ExchangeRateService } from 'src/app/core/services/exchange-rate.service';

@Component({
  selector: 'app-frequent-exchange-rate',
  templateUrl: './frequent-exchange-rate.component.html',
  styleUrls: ['./frequent-exchange-rate.component.scss']
})
export class FrequentExchangeRateComponent implements OnInit {

  list$!: Observable<TRecentExchangeRate[]>;

  constructor(private service: ExchangeRateService) { }

  ngOnInit(): void {
    this.list$ = this.service.frequentExchangeRate$;
  }
}

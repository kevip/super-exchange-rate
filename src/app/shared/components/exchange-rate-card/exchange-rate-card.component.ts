import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exchange-rate-card',
  templateUrl: './exchange-rate-card.component.html',
  styleUrls: ['./exchange-rate-card.component.scss']
})
export class ExchangeRateCardComponent {
  @Input() data: any;

}

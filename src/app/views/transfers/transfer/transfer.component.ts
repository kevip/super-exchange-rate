import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { timeout } from 'rxjs';

import { TRecentExchangeRate } from 'src/app/core/models/recent-exchange-rate/recent-exchange-rate.model';
import { AmountControl } from './controls/amount.control';
import { EmailControl } from './controls/email.control';
import { Control } from './controls/control';
import { TransferService } from 'src/app/core/services/transfer.service';
import { ECurrencyName } from 'src/app/core/config/currency-name';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  exchangeRateCard: any;

  frequent!: TRecentExchangeRate;

  isLoading = false;

  form!: FormGroup;

  amountControl = new AmountControl();

  emailControl = new EmailControl();

  sourceAccountControl = new Control('', [Validators.required]);

  targetAccountControl = new Control('', [Validators.required]);

  sourceAccounts = [
    { id: '123456', nombre: 'Cuenta Corriente 123456' },
    { id: '654321', nombre: 'Cuenta de Ahorro 654321' },
  ];

  constructor(private route: ActivatedRoute, private service: TransferService) {
    this.form = new FormGroup({
      sourceAccount: this.sourceAccountControl,
      targetAccount: this.targetAccountControl,
      amount: this.amountControl,
      email: this.emailControl,
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.frequent = data['frequent'];
      this.exchangeRateCard = {
        currencyFrom: ECurrencyName.CLP,
        currencyTo: ECurrencyName[this.frequent.currency as keyof typeof ECurrencyName],
        rate: this.frequent.value,
      };
    });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.isLoading = true;
      setTimeout(() => {
        const transfer = this.form.value;
        this.service.saveTransferOperation(transfer);
        this.isLoading = false;
      }, 2000);
    }
  }
}

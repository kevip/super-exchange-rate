import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/core/services/transfer.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {

  displayedColumns = ['amount', 'sourceAccount', 'targetAccount', 'exchangeRate'];

  transfers!: any[];

  constructor(private service: TransferService) { }

  ngOnInit(): void {
    this.transfers = this.service.getTransferOperations();
  }
}

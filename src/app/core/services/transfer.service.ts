import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private transferOperationsSub = new BehaviorSubject<any>(null);

  transferOperations$ = this.transferOperationsSub.asObservable();

  constructor() { }

  setTransferOperation(transfer: any): void {
    const transfers = this.getTransferOperations();

    this.transferOperationsSub.next([...transfers, transfer]);
  }

  transferOperation(): void {

  }

  getTransferOperations(): any {
    try {
      const json = window.localStorage.getItem('transfers');
      const transfers = json ? JSON.parse(json) : [];
      this.transferOperationsSub.next(transfers);

      return transfers;
    } catch (e) {
      return [];
    }
  }

  saveTransferOperation(transfer: any): void {
    const transfers = this.getTransferOperations();
    const json = JSON.stringify([...transfers, transfer]);

    this.setTransferOperation(transfer);
    window.localStorage.setItem('transfers', json);
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferComponent } from './transfer/transfer.component';
import { frequentDetailResolver } from 'src/app/core/resolvers/frequent-detail.resolver';
import { TransfersComponent } from './transfers/transfers.component';

const routes: Routes = [
  {
    path: 'detail/:uuid',
    component: TransferComponent,
    resolve: { frequent: frequentDetailResolver },
  },
  {
    path: 'historical',
    component: TransfersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferComponent } from './transfer/transfer.component';
import { frequentDetailResolver } from 'src/app/core/resolvers/frequent-detail.resolver';

const routes: Routes = [
  {
    path: ':uuid',
    component: TransferComponent,
    resolve: { frequent: frequentDetailResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrequentExchangeRateComponent } from './frequent-exchange-rate.component';
import { frequentExchangeRateResolver } from 'src/app/core/resolvers/frequent-exchange-rate.resolver';
import { EditFrequentComponent } from './edit-frequent/edit-frequent.component';
import { frequentDetailResolver } from 'src/app/core/resolvers/frequent-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: FrequentExchangeRateComponent,
    resolve: {
      frequents: frequentExchangeRateResolver,
    }
  },
  {
    path: 'edit-frequent/:uuid',
    component: EditFrequentComponent,
    resolve: {
      frequent: frequentDetailResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrequentExchangeRateRoutingModule { }

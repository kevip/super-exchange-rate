import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrequentExchangeRateComponent } from './frequent-exchange-rate.component';
import { frequentExchangeRateResolver } from 'src/app/core/resolvers/frequent-exchange-rate.resolver';

const routes: Routes = [
  {
    path: '',
    component: FrequentExchangeRateComponent,
    resolve: {
      frequents: frequentExchangeRateResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrequentExchangeRateRoutingModule { }

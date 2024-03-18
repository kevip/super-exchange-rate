import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'exchange-rate',
    loadChildren: () => import('./views/currency-exchange/currency-exchange.module').then(m => m.CurrencyExchangeModule),
  },
  {
    path: 'frequent-exchange-rate',
    loadChildren: () => import('./views/frequent-exchange-rate/frequent-exchange-rate.module').then(m => m.FrequentExchangeRateModule),
  },
  {
    path: 'transfer',
    loadChildren: () => import('./views/transfers/transfers.module').then(m => m.TransfersModule),
  },
  {
    path: '**',
    redirectTo: 'exchange-rate',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { ExchangeRateListComponent } from "./exchange-rate-list/exchange-rate-list.component";
import { CommonModule } from "@angular/common";
import { CdkColumnDef } from "@angular/cdk/table";
import { ExchangeRateService } from "src/app/core/services/exchange-rate.service";
import { ExchangeRateHttp } from "src/app/core/http/exchange-rate.http";

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatTableModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    ExchangeRateListComponent,
  ],
  exports: [
    ExchangeRateListComponent,
  ],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
  ],
  providers: [
    CdkColumnDef,
    ExchangeRateService,
    ExchangeRateHttp,
  ]
})
export class ExchangeRateListModule {

}

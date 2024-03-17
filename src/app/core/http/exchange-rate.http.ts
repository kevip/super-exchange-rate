import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EEndpoints } from '../config/endpoints';
import { IConvertRequest } from '../models/convert/convert.request.interface';
import { ConvertModel } from '../models/convert/convert.model';
import { IConvertResponse } from '../models/convert/convert.response.interface';
import { RecentExchangeRateModel } from '../models/recent-exchange-rate/recent-exchange-rate.model';
import { IRecentExchangeRateRequest } from '../models/recent-exchange-rate/recent-exchange-rate.request.interface';
import { IRecentExchangeRateResponse } from '../models/recent-exchange-rate/recent-exchange-rate.response.interface';

@Injectable()
export class ExchangeRateHttp {

  constructor(private http: HttpClient) { }

  getRecentExchangeRate(request: IRecentExchangeRateRequest): Observable<RecentExchangeRateModel> {
    const endpoint = `${environment.API_URL}/${EEndpoints.LATEST}?from=${request.from}&to=${request.to}`;
    const httpOptions = {
      headers: { 'X-RapidAPI-Key': '86cc087e83msh0c1d7482c3ac79ep1d36efjsn233b02e04e2e' },

    };

    return this.http.get<IRecentExchangeRateResponse>(endpoint, httpOptions)
      .pipe(map(response => new RecentExchangeRateModel(response)));
  }

  calculateExchangeRate(request: IConvertRequest): Observable<ConvertModel> {
    const endpoint = `${environment.API_URL}/${EEndpoints.CONVERT}?from=${request.from}&to=${request.to}&amount=${request.amount}`;
    const httpOptions = {
      headers: { 'X-RapidAPI-Key': '86cc087e83msh0c1d7482c3ac79ep1d36efjsn233b02e04e2e' },

    };

    return this.http.get<IConvertResponse>(endpoint, httpOptions)
      .pipe(map(response => new ConvertModel(response)));
  }
  getHistorical(): Observable<unknown> {
    const endpoint = `${environment.API_URL}/${EEndpoints.HISTORICAL_EXCHANGE_RATE}`;

    return this.http.get(endpoint).pipe(
      // map((resp: any[]) => resp.map(r => new (r)))
    );
  }
}

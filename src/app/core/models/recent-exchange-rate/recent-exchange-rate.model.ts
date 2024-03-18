import { ECurrency } from "../../config/currency";
import { IRates, IRecentExchangeRateResponse } from "./recent-exchange-rate.response.interface";
import { nanoid } from 'nanoid';

export type TRecentExchangeRate = {
  currency: string;
  value: number;
  uuid: string;
  loading?: boolean;
}
export class RecentExchangeRateModel {
  base: string;
  date: string;
  rates: TRecentExchangeRate[];
  success: boolean;
  timestamp: number;

  constructor(response: IRecentExchangeRateResponse) {
    this.base = response.base;
    this.date = response.date;
    this.rates = this.converRatesToArray(response.rates);
    this.success = response.success;
    this.timestamp = response.timestamp;
  }

  private converRatesToArray(rates: IRates): TRecentExchangeRate[] {

    return Object.entries(rates)
      .map(([currency, value]) => ({ currency, value, uuid: nanoid() }))
      .filter(rate => {

        return Object.keys(ECurrency).includes(rate.currency);
      });
  }
}

export interface IRecentExchangeRateResponse {
  timestamp: number
  base: string
  success: boolean
  date: string
  rates: IRates;
}

export interface IRates {
  [key: string]: number;
}

export interface IConvertResponse {
  success: boolean;
  query: IQuery;
  info: IInfo;
  date: string;
  result: number;
}

export interface IQuery {
  from: string;
  to: string;
  amount: number;
}

export interface IInfo {
  timestamp: number;
  rate: number;
}

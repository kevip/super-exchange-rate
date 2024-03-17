import { IConvertResponse, IInfo, IQuery } from "./convert.response.interface";

export class ConvertModel {
  success: boolean;
  query: IQuery;
  info: IInfo;
  date: string;
  result: number;

  constructor(response: IConvertResponse) {
    this.success = response.success;
    this.query = response.query;
    this.info = response.info;
    this.date = response.date;
    this.result = response.result;
  }

}

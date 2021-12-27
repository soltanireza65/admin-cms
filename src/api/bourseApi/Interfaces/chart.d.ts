export namespace IChart {
  export interface IPrice {
    day: number;
    //last time traded
    time: string;
    //price value
    value: number;
  }
  export interface IChartData {
    data: IPrice[];
    daily: IPrice[];
    weekly?: IPrice[];
    monthly?: IPrice[];
    annually?: IPrice[];
    ticker?: string;
    title?: string;
  }
}

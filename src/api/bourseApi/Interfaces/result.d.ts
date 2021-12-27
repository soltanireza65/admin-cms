export namespace IService {
  export interface IResult<T> {
    data?: T;
    status?: number;
  }
  export interface ITicker {
    ticker?: string;
    symbol?: string;
    name?: string;
    symbolFA?: string;
    nameFA?: string;
    industryIndex?: string;
    exchange?: string;
    type?: { code: number };
    company?: { key: number; type: string };
    status?: string;
    board?: number;
    market?: number;
    companyCode?: string;
    industry?: { tse: number; bourseview: number };
    industryIndex?: string;
    priceList?: IPriceList;
    lasttimeTraded?: string;
  }
  interface IPriceList {
    //اولین
    open: number;
    //بالاترین
    high: number;
    //کمترین
    low: number;
    //آخرین قیمت
    close: number;
    closePercent: number;
    differanceClose: number;
    //پایانی
    vwap: number;
    //درصد قیمت پایانی
    vwapPercent: number;
    differanceVwap: number;

    //قیمت دیروز
    vwapPrevious: number;
    //حجم معاملات
    volume: number;
    //ارزش معاملات
    value: number;
    //تعداد معاملات
    numOfTrades: number;
  }
}

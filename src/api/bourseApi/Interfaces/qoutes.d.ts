export namespace IQoutes {
  /**
     * date	"?date=[yyyymmdd,yyyyymmdd] optional=yes (last values if not passed) | ex1:[20180101,20180102] | ex2=[20180101,null] | ex3=[20180101T102413,20180101T12:15:00]"
       exchanges	"?exchanges={isin} optional=yes | list of exchanges:IRTSENO (Tehran Stock Exchange), IRIFBNO (Iran Fara Bourse), exchanges=IRIFBOTC (Iran Farabourse Over The Counter) | ex1=IRTSENO,IRIFBNO"
       expand	"?expand=ticker | expand a resource properties"
       filters on: close, volume, value	"?close=gt:0 | operators are supported for inequality(neq), greater-than(gt), greater-than-or-equal(gte), less-than(lt), and less-than-or-equal-to(lte), membership (in), non-membership(nin)"
       interval	"?interval={min} optional=yes | get intraday quotes | ex1: interval=60min  | ex2: interval=10min "
       items	"?items={code} optional=no | list of items: price (ohlc, vwap, vol, val), adjusted (adjusted prices), indinst (individual institutional vol, val), share (number of outstanding shares, float, market cap), nav (fund nav) | ex1: items=price"
       lastN	"?lastN = int | get last n of items | ex1: lastN=10 "
       out	"?out=summary | only available for ind-inst item | return summary (statistics: mean, std, count, ...) in a date range"
       tickerTypes	"?tickerTypes={type} optional=yes | ex1: tickerTypes=stock | ex2: tickerTypes=* (override default value)"
       tickers	"?tickers={isin} optional=yes | ex1: tickers=IRO1IKCO0001 | ex2: tickers=IRO1BMLT0001,IRO1IKCO0001"
       typeCodes	"?typeCodes={code} optional=yes | ex1: items=1100 | list of all tickerTypes: http://api.bourseview.com/v1/tickerTypes"
     */
  export interface IParams {
    date?: string;
    exchanges?: string | "IRTSENO" | "IRIFBNO" | "IRIFBOTC";
    expand?: string;
    //look at comment way for how to use it.
    filters?: string;
    interval?: string;
    items?: string | "price" | "share" | "indi";
    lastN?: number;
    tickersId?: string;
    out?: string;
    tickerTypes?: string;
    tickers?: string;
    typeCodes: string;
  }
  export interface IResult {
    tickers: IData[];
    hits: number;
    status: number;
  }
  export interface IData {
    ticker: ITickers.ITicker;
    industryIndex: string;
    lastTradeTime: Date;
    items: IItemsTickers[];
  }
  export interface IItemsTickers {
    item: string;
    days: IDays[];
  }
  export interface IDays {
    day: number;
    time: string;
    items: IItemDays[];
    state: string;
  }
  export interface IItemDays {
    item: string;
    values: IValueDays;
  }
  export interface IValueDays {
    //اولین
    open: number;
    //بالاترین
    high: number;
    //کمترین
    low: number;
    //آخرین قیمت
    close: number;
    //پایانی
    vwap: number;
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

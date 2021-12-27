export namespace ITickers {
	/**
     * exchanges	"marketplace where tickers are traded | ?exchanges={isin} optional=yes | ex1=IRTSENO,IRIFBNO | list of exchanges :IRTSENO (Tehran Stock Exchange), IRIFBNO (Iran Fara Bourse), exchanges=IRIFBOTC (Iran Farabourse Over The Counter), exchanges=IRIMENO (Iran Merchantile Exchange)"
       industries	"list of industry codes : http://api.bourseview.com/v1/industries"
       industryType	"tse or bourseview default is tse"
       status	"active or deleted status in corresponding exchange | default: active, to include deleted tickers use status=active,deleted or status=*"
       tickers	"?tickers={isin} optional=yes | ex1: tickers=IRO1IKCO0001 | ex2: tickers=IRO1BMLT0001,IRO1IKCO0001"
       typeCodes	"?typeCodes={code} optional=no | ex1: typeCodes=2000 to get all fixed incomes | list of all tickerTypes: http://api.bourseview.com/v1/tickerTypes"
     */
	export interface IParams {
		exchanges?: 'IRTSENO' | 'IRIFBNO' | 'IRIFBOTC' | 'IRIMENO';
		industries?: number;
		industryType?: string;
		status?: 'active' | 'deleted';
		tickers?: string;
		tickersId?: string;
		industiesCode?: string;
		text?: string;
		typeCodes?: number;
	}

	export interface ITicker {
		ticker: string;
		symbol: string;
		name: string;
		symbolFA: string;
		nameFA: string;
		industryIndex: string;
		exchange: string;
		type: { code: number };
		company: { key: number; type: string };
		status: string;
		board: number;
		market: number;
		companyCode: string;
		industry: { tse: number; bourseview: number };
		industryIndex: string;
	}
}

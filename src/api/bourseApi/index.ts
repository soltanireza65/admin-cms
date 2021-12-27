import { Http } from './apiCall';
import { IService } from './Interfaces/result';
import { ITickers } from './Interfaces/tickers';
import { IQoutes } from './Interfaces/qoutes';
import { IChart } from './Interfaces/chart';

const prefixUrl = `https://bourseapi.behsoud.com/api/v1`;
export const bourseApi = {
	getByText: async ({ text, typeCodes }: ITickers.IParams): Promise<IService.IResult<ITickers.ITicker[]>> => {
		let response: IService.IResult<ITickers.ITicker[]>;
		try {
			response = await Http.request('GET', `${prefixUrl}/byText`, { text, typeCodes });
		} catch (e) {
			if (e.status === 403) {
				await Http.request('GET', `${prefixUrl}/login`);
				return await bourseApi.getByText({ text });
			} else {
				response = {
					data: [],
					status: e.status
				};
			}
		}
		return response;
	},

	getAllTickers: async ({ typeCodes }: ITickers.IParams): Promise<IService.IResult<ITickers.ITicker[]>> => {
		let response: IService.IResult<ITickers.ITicker[]>;
		try {
			response = await Http.request('GET', `${prefixUrl}/getAllTickers`, { typeCodes });
		} catch (e) {
			if (e.status === 403) {
				await Http.request('GET', `${prefixUrl}/login`);
				return await bourseApi.getAllTickers({ typeCodes });
			} else {
				response = {
					data: [],
					status: e.status
				};
			}
		}
		return response;
	},
	getTeammateTickers: async (data?: ITickers.IParams): Promise<IService.IResult<IService.ITicker[]>> => {
		let response: IService.IResult<IService.ITicker[]>;

		try {
			response = await Http.request('GET', `${prefixUrl}/getTeammateTickers`, data);
		} catch (e) {
			if (e.status === 403) {
				await Http.request('GET', `${prefixUrl}/login`);
				return await bourseApi.getTeammateTickers(data);
			} else {
				response = {
					data: [],
					status: e.status
				};
			}
		}
		return response;
	},

	getChartData: async (data?: IQoutes.IParams): Promise<IService.IResult<IChart.IChartData>> => {
		let response: IService.IResult<IChart.IChartData>;

		try {
			response = await Http.request('GET', `${prefixUrl}/getChartData`, data);
		} catch (e) {
			if (e.status === 403) {
				await Http.request('GET', `${prefixUrl}/login`);
				return await bourseApi.getChartData(data);
			} else {
				response = {
					data: {
						daily: [],
						data: []
					},
					status: e.status
				};
			}
		}
		return response;
	}
};

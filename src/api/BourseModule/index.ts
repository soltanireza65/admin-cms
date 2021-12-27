import { Http } from '../Http/index';
const prefixUrl = `${process.env.REACT_APP_URL}/bourse/api/Bourse/`;

export const BourseDataApi = {
	getBubbleIndex: async ({
		bubbleIndexId,
		categoryID,
		count,
		page,
		fromCreatedDateTime,
		tillCreatedDateTime
	}: IBourseData.IFilter): Promise<IGlobalData.IServiceResult<IBourseData.IBubbleParams[]>> => {
		let response: IGlobalData.IServiceResult<IBourseData.IBubbleParams[]>;

		response = await Http.request('get', false, `${prefixUrl}/GetBubbleIndex`, {
			bubbleIndexId,
			categoryID,
			count,
			page,
			fromCreatedDateTime,
			tillCreatedDateTime
		});

		return response;
	},
	addBubbleIndex: async ({
		categoryID,
		categoryTitle,
		bubbleEdge,
		currentBazaar
	}: IBourseData.IBubbleParams): Promise<IGlobalData.IServiceResult<IBourseData.IBubbleParams>> => {
		let response: IGlobalData.IServiceResult<IBourseData.IBubbleParams>;

		response = await Http.request('post', true, `${prefixUrl}AddBubbleIndex`, null, {
			categoryID,
			categoryTitle,
			bubbleEdge,
			currentBazaar
		});

		return response;
	},
	deleteBubbleIndex: async ({
		id
	}: IBourseData.IBubbleParams): Promise<IGlobalData.IServiceResult<IBourseData.IBubbleParams>> => {
		let response: IGlobalData.IServiceResult<IBourseData.IBubbleParams>;

		let formData = new FormData();
		formData.append('id', id);
		response = await Http.request('delete', true, `${prefixUrl}DeleteBubbleIndex`, formData);

		return response;
	},
	getRiskIndex: async ({
		riskIndexId,
		tillCreatedDateTime,
		fromCreatedDateTime,
		page,
		count,
		categoryID,
		isDaily
	}: IBourseData.IFilter): Promise<IGlobalData.IServiceResult<IBourseData.IRiskParams[]>> => {
		let response: IGlobalData.IServiceResult<IBourseData.IRiskParams[]>;

		response = await Http.request('get', true, `${prefixUrl}GetRiskIndex`, {
			riskIndexId,
			tillCreatedDateTime,
			fromCreatedDateTime,
			page,
			count,
			categoryID,
			isDaily
		});

		return response;
	},
	addRiskIndex: async ({
		categoryID,
		categoryTitle,
		riskIndexNumber,
		isDaily
	}: IBourseData.IRiskParams): Promise<IGlobalData.IServiceResult<IBourseData.IRiskParams>> => {
		let response: IGlobalData.IServiceResult<IBourseData.IRiskParams>;

		response = await Http.request('post', true, `${prefixUrl}AddRiskIndex`, null, {
			categoryID,
			categoryTitle,
			riskIndexNumber,
			isDaily
		});

		return response;
	},
	deleteRiskIndex: async ({
		id
	}: IBourseData.IBazarPredication): Promise<IGlobalData.IServiceResult<IBourseData.IRiskParams>> => {
		let response: IGlobalData.IServiceResult<IBourseData.IRiskParams>;

		let formData = new FormData();
		formData.append('id', id);
		response = await Http.request('delete', true, `${prefixUrl}DeleteRiskIndex`, null, formData);

		return response;
	}
};

import { Http } from '../Http/index';
const prefixUrl = `${process.env.REACT_APP_URL}/news/api/news`;
export const NewsApi = {
	manageNews: async (
		data?: INewsInterface.IBodyNews
	): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO[]>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO[]>;

		response = await Http.request('GET', true, `${prefixUrl}/managenews`, data);

		return response;
	},
	getPublishedNews: async (
		data?: INewsInterface.IBodyNews
	): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO[]>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO[]>;

		response = await Http.request('GET', false, `${prefixUrl}/GetPublishedNews`, data);

		return response;
	},
	getNewsById: async ({
		id
	}: INewsInterface.IBodyNews): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		response = await Http.request('GET', false, `${prefixUrl}/GetNewsById/${id}`);

		return response;
	},
	getRelatedNewsById: async ({
		id,
		count
	}: INewsInterface.IBodyNews): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		try {
			response = await Http.request('GET', false, `${prefixUrl}/GetRelatedNewsById:id/:count`, { id, count });
		} catch {
			response = {
				data: null,
				message: 'مشکل در برقراری ارتباط با سرور رخ داده است.',
				status: 2
			};
		}
		return response;
	},
	getLocationNews: async ({
		categoryId,
		locationCode
	}: INewsInterface.IBodyNews): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO[]>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO[]>;

		try {
			response = await Http.request('GET', false, `${prefixUrl}/GetLocationNews`, {
				categoryId,
				locationCode
			});
		} catch {
			response = {
				data: [],
				message: 'مشکل در برقراری ارتباط با سرور رخ داده است.',
				status: 2
			};
		}
		return response;
	},
	getLocationByNewsId: async ({
		id
	}: INewsInterface.IBodyNews): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		response = await Http.request('GET', true, `${prefixUrl}/GetNewsLocationsByNewsId/${id}`);

		return response;
	},
	increaseNewsVisitCount: async ({
		id
	}: INewsInterface.IBodyNews): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		response = await Http.request('put', false, `${prefixUrl}/IncreaseNewsVisitCount`, null, { id });

		return response;
	},
	increaseNewsShareCount: async ({
		id
	}: INewsInterface.IBodyNews): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		response = await Http.request('put', false, `${prefixUrl}/IncreaseNewsShareCount`, null, { id });

		return response;
	},
	toggleLikeNews: async ({
		id,
		toggleLike
	}: INewsInterface.IBodyNews): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		response = await Http.request('put', false, `${prefixUrl}/ToggleLikeNews`, null, {
			id,
			toggleLike
		});

		return response;
	},
	toggleDisLikeNews: async ({
		id,
		toggleLike
	}: INewsInterface.IBodyNews): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		response = await Http.request('put', false, `${prefixUrl}/ToggleDisLikeNews`, null, {
			id,
			toggleLike
		});

		return response;
	},
	createNews: async (
		data?: INewsInterface.INewsDTO
	): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		await Http.request('post', true, `${prefixUrl}/AddNews`, null, data)
			.then(x => {
				response = x;
			})
			.catch(x => {
				response = {
					data: {},
					status: 5,
					message: 'خطایی در هنگام ارسال اطلاعات رخ داده است.',
					errors: {
						data: x?.data?.errors,

						stautsCode: x.status
					}
				};
			});

		return response;
	},
	editNews: async (data?: INewsInterface.INewsDTO): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		response = await Http.request('put', true, `${prefixUrl}/EditNews`, null, data);

		return response;
	},
	publishNews: async ({
		id
	}: INewsInterface.INewsDTO): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;
		let formData = new FormData();
		formData.append('id', id);
		response = await Http.request('put', true, `${prefixUrl}/PublishNews`, null, formData);

		return response;
	},
	deleteNews: async ({
		id
	}: INewsInterface.INewsDTO): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;
		let formData = new FormData();
		formData.append('id', id);
		response = await Http.request('put', true, `${prefixUrl}/DeleteNews`, null, formData);

		return response;
	},
	suspendNews: async ({
		id
	}: INewsInterface.INewsDTO): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;
		let formData = new FormData();
		formData.append('id', id);
		response = await Http.request('put', true, `${prefixUrl}/SuspendNews`, null, formData);

		return response;
	},
	publishNewsInTheFuture: async ({
		newsId,
		startPublishDateTimeString
	}: INewsInterface.INewsDTO): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		response = await Http.request('put', true, `${prefixUrl}/PublishNewsInTheFuture`, null, {
			newsId,
			startPublishDateTimeString
		});

		return response;
	},
	addLocationToNews: async ({
		categoryId,
		locationCode,
		MediaFiles,
		newsId
	}: INewsInterface.IBodyNews): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		response = await Http.request('put', true, `${prefixUrl}/AddLocationToNews`, null, {
			categoryId,
			locationCode,
			MediaFiles,
			newsId
		});

		return response;
	},
	deleteLocationFromNews: async ({
		categoryId,
		locationCode,
		newsId
	}: INewsInterface.IBodyNews): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		response = await Http.request('delete', true, `${prefixUrl}/DeleteLocationFromNews`, null, {
			categoryId,
			locationCode,
			newsId
		});

		return response;
	},
	changeNewsLocationStatus: async ({
		id,
		status
	}: INewsInterface.IBodyNews): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		response = await Http.request('put', true, `${prefixUrl}/ChangeNewsLocationStatus`, null, {
			id,
			status
		});

		return response;
	},
	getNewsLocationsByNewsId: async ({
		id
	}: INewsInterface.IBodyNews): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		response = await Http.request('get', true, `${prefixUrl}/GetNewsLocationsByNewsId/:id`, id);

		return response;
	},
	AddNewsToLatestNews: async ({
		categoryId,
		locationCode,
		newsId,
		priority
	}: INewsInterface.IBodyNews): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		response = await Http.request('put', true, `${prefixUrl}/AddNewsToLatestNews`, null, {
			categoryId,
			locationCode,
			newsId,
			priority
		});

		return response;
	},

	deleteNewsFromLatestNews: async ({
		categoryId,
		locationCode,
		newsId
	}: INewsInterface.IBodyNews): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		response = await Http.request('delete', true, `${prefixUrl}/DeleteNewsFromLatestNews`, null, {
			categoryId,
			locationCode,
			newsId
		});

		return response;
	},
	changeNewsPriorityInLatestNews: async ({
		categoryId,
		locationCode,
		newsId,
		priority
	}: INewsInterface.IBodyNews): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		response = await Http.request('put', true, `${prefixUrl}/ChangeNewsPriorityInLatestNews`, null, {
			categoryId,
			locationCode,
			newsId,
			priority
		});

		return response;
	},
	getcat: async ({ id }: INewsInterface.IBodyNews): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO>;

		response = await Http.request('put', false, `${prefixUrl}/getcat/${id}`);

		return response;
	},
	getBulkNews: async ({
		contentId
	}: INewsInterface.IBodyNews): Promise<IGlobalData.IServiceResult<INewsInterface.INewsDTO[]>> => {
		let response: IGlobalData.IServiceResult<INewsInterface.INewsDTO[]>;

		response = await Http.request('get', true, `${process.env.REACT_APP_URL}/news/api/NewsAdmin/GetBulkNews`, {
			id: contentId
		});

		return response;
	}
};

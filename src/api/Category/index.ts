import { Http } from '../Http/index';
const prefixUrl = `${process.env.REACT_APP_URL}/category/api/Category`;

export const CategoryApi = {
	addCategory: async ( data?: ICategory.ICategoryData ): Promise<IGlobalData.IServiceResult<ICategory.ICategoryData>> => {
		let response: IGlobalData.IServiceResult<ICategory.ICategoryData>;

		response = await Http.request('post', true, `${prefixUrl}/AddCategory`, null, data);

		return response;
	},
	editCategory: async (
		data?: ICategory.ICategoryData
	): Promise<IGlobalData.IServiceResult<ICategory.ICategoryData>> => {
		let response: IGlobalData.IServiceResult<ICategory.ICategoryData>;

		response = await Http.request('put', true, `${prefixUrl}/EditCategory`, null, data);

		return response;
	},
	deleteCategory: async (data: FormData): Promise<IGlobalData.IServiceResult<ICategory.ICategoryData>> => {
		let response: IGlobalData.IServiceResult<ICategory.ICategoryData>;

		response = await Http.request('delete', true, `${prefixUrl}/DeleteCategory`, null, data);

		return response;
	},
	getAllCategories: async (
		data?: ICategory.ICategoryData
	): Promise<IGlobalData.IServiceResult<ICategory.ICategoryData[]>> => {
		let response: IGlobalData.IServiceResult<ICategory.ICategoryData[]>;

		response = await Http.request('get', false, `${prefixUrl}/GetCategories`, data);

		return response;
	},
	getCategoryById: async ({
		id
	}: ICategory.ICategoryData): Promise<IGlobalData.IServiceResult<ICategory.ICategoryData>> => {
		let response: IGlobalData.IServiceResult<ICategory.ICategoryData>;

		response = await Http.request('get', false, `${prefixUrl}/GetCategoryById/${id}`);

		return response;
	},
	addLocation: async (data?: IGlobalData.ILocation): Promise<IGlobalData.IServiceResult<IGlobalData.ILocation>> => {
		let response: IGlobalData.IServiceResult<IGlobalData.ILocation>;

		response = await Http.request('put', true, `${prefixUrl}/AddLocationToCategory`, null, data);

		return response;
	},
	editLocation: async (data?: IGlobalData.ILocation): Promise<IGlobalData.IServiceResult<IGlobalData.ILocation>> => {
		let response: IGlobalData.IServiceResult<IGlobalData.ILocation>;

		response = await Http.request('put', true, `${prefixUrl}/EditLocation`, null, data);

		return response;
	},
	deleteLocationFromCategory: async ({
		categoryId,
		locationCode,
		locationModuleType
	}: IGlobalData.ILocation): Promise<IGlobalData.IServiceResult<IGlobalData.ILocation>> => {
		let response: IGlobalData.IServiceResult<IGlobalData.ILocation>;

		response = await Http.request('delete', true, `${prefixUrl}/DeleteLocationFromCategory`, null, {
			categoryId,
			locationCode,
			locationModuleType
		});

		return response;
	},
	getParentCategories: async ({
		parentId
	}: ICategory.ICategoryData): Promise<IGlobalData.IServiceResult<ICategory.ICategoryData[]>> => {
		let response: IGlobalData.IServiceResult<ICategory.ICategoryData[]>;

		response = await Http.request('get', true, `${prefixUrl}/GetCategoryParents`, null, parentId);

		return response;
	},
	changeCategoryStatus: async ({
		categoryId,
		status
	}: ICategory.ICategoryData): Promise<IGlobalData.IServiceResult<ICategory.ICategoryData[]>> => {
		let response: IGlobalData.IServiceResult<ICategory.ICategoryData[]>;

		response = await Http.request('put', true, `${prefixUrl}/ChangeCategoryStatus`, null, { categoryId, status });

		return response;
	}
};

import { Http } from '../Http/index';
import { ITags } from 'api/Interfaces/tags';
const prefixUrl = `${process.env.REACT_APP_URL}/tag/api/Tag`;
const adminPrefixUrl = `${process.env.REACT_APP_URL}/tag/api/TagAdmin`;

export const TagsApi = {
	getTags: async (data?: ITags.ITagsParams): Promise<IGlobalData.IServiceResult<ITags.ITagsDTO[]>> => {
		let response: IGlobalData.IServiceResult<ITags.ITagsDTO[]>;

		response = await Http.request('GET', false, `${prefixUrl}/GetTags`, data);

		return response;
	},
	manageTags: async (data?: ITags.ITagsParams): Promise<IGlobalData.IServiceResult<ITags.ITagsDTO[]>> => {
		let response: IGlobalData.IServiceResult<ITags.ITagsDTO[]>;

		response = await Http.request('GET', true, `${adminPrefixUrl}/ManageTags`, data);

		return response;
	},
	getTagByTitle: async ({ title }: ITags.ITagsParams): Promise<IGlobalData.IServiceResult<ITags.ITagsDTO[]>> => {
		let response: IGlobalData.IServiceResult<ITags.ITagsDTO[]>;

		response = await Http.request('GET', false, `${prefixUrl}/GetTagByTitle/${title}`);

		return response;
	},
	getSuggestTagsByTitle: async ({
		title
	}: ITags.ITagsParams): Promise<IGlobalData.IServiceResult<ITags.ITagsDTO[]>> => {
		let response: IGlobalData.IServiceResult<ITags.ITagsDTO[]>;

		response = await Http.request('GET', false, `${prefixUrl}/GetSuggestTagsByTitle/${title}`);

		return response;
	},
	addtag: async ({
		title,
		label,
		description
	}: ITags.ITagsParams): Promise<IGlobalData.IServiceResult<ITags.ITagsDTO>> => {
		let response: IGlobalData.IServiceResult<ITags.ITagsDTO>;

		response = await Http.request('post', true, `${adminPrefixUrl}/AddTag`, null, { title, label, description });

		return response;
	},
	editTag: async ({
		id,
		label,
		description
	}: ITags.ITagsDTO): Promise<IGlobalData.IServiceResult<ITags.ITagsDTO>> => {
		let response: IGlobalData.IServiceResult<ITags.ITagsDTO>;

		response = await Http.request('put', true, `${adminPrefixUrl}/EditTag`, null, { id, label, description });

		return response;
	}
};

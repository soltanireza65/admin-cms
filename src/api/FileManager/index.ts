import { Http } from '../Http/index';
const prefixFileManagerUrl = `${process.env.REACT_APP_FILE_MANAGER}/api/Manage`;

export const FileManagerApi = {
	getMediaFiles: async (
		data?: IFileManager.IFileParams
	): Promise<IGlobalData.IServiceResult<IFileManager.IFile[]>> => {
		let response: IGlobalData.IServiceResult<IFileManager.IFile[]>;

		response = await Http.request('get', true, `${prefixFileManagerUrl}/GetMediaFiles`, data);

		return response;
	},
	getMediaFileByMediaFileId: async ({
		id
	}: IFileManager.IFileParams): Promise<IGlobalData.IServiceResult<IFileManager.IFile>> => {
		let response: IGlobalData.IServiceResult<IFileManager.IFile>;

		response = await Http.request('get', false, `${prefixFileManagerUrl}/GetMediaFileByMediaFileId/${id}`);

		return response;
	},
	getMediaFileById: async ({
		id
	}: IFileManager.IFileParams): Promise<IGlobalData.IServiceResult<IFileManager.IFile>> => {
		let response: IGlobalData.IServiceResult<IFileManager.IFile>;

		response = await Http.request('get', false, `${prefixFileManagerUrl}/GetMediaFileById/${id}`);

		return response;
	},
	editMediaFile: async ({
		caption,
		status = 2,
		id
	}: IFileManager.IFileBody): Promise<IGlobalData.IServiceResult<IFileManager.IFile>> => {
		let response: IGlobalData.IServiceResult<IFileManager.IFile>;

		response = await Http.request('put', true, `${prefixFileManagerUrl}/EditMediaFile`, null, {
			caption,
			status,
			id
		});

		return response;
	},
	deleteMediaFile: async (data: FormData): Promise<IGlobalData.IServiceResult<IFileManager.IFile>> => {
		let response: IGlobalData.IServiceResult<IFileManager.IFile>;

		response = await Http.request('delete', true, `${prefixFileManagerUrl}/DeleteMediaFile`, null, data);

		return response;
	}
};

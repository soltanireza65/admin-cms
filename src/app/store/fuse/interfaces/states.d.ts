export interface IUploadStates {
	fileProgress: IFile[];
	fileManuallyProgress?: number;
	uploadDialog: {
		type: string;
		parentId: string;
		moduleOwner?: string;
		status?: number;
		props: {
			open: boolean;
		};
		data: any;
	};
	updateData: number;
}
export interface IFileDetail {
	caption: string;
	status: 2;
	moduleOwner: 'FileManager' | 'Advertise';
	extention?: string;
}
export interface IFile extends IFileDetail {
	id: number;
	uploadStarted: boolean;
	progress?: number;
	isUploaded?: boolean;
	hasError?: boolean;
	file?: Blob;
	errorMessage?: string;
	files?: ISubFilesPayload[];
}

export interface ISubFilesPayload {
	id: number;
	caption: string;
	files?: File[];
}

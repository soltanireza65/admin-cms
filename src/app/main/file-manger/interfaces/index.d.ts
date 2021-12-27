export interface IProps {
	src?: string;
	progress: number;
	completed: boolean;
}
export interface IUploadDialogProps {
	file: File[];
	caption: string;
	parentId?: string;
	moduleOwner: string;
	status: number;
}
export interface IFileProps extends IFileManager.IFile {
	checked?: boolean;
	captionLoading?: boolean;
	isVideo?: boolean;
	mediaCropParam?: string;
	order?: number;
	mediaFileType?: number;
}

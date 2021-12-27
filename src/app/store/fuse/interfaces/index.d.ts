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

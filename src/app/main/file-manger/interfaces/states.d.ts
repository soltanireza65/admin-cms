import { IFileProps } from '.';
enum ModuleType {
	album = 0,
	cateogry = 1,
	selectLocation = 2
}
export interface IState {
	entities: IFileProps[];
	mediaType: IFileManagerApp.mediaType;
	loading: boolean;
	dialogState: boolean;
	moduleType: ModuleType;
	limitLoadMoreButton: boolean;
}

export interface IDeleteState {
	id: string;
	deleteDialog?: any;
	title: string;
	loading?: boolean;
}
export interface IFileManagerDialog {
	fileManagerDialog: {
		moduleOwner: IFileManager.ModuleOwner;
		props: {
			open: boolean;
		};
	};
}

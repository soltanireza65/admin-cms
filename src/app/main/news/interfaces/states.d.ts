import { IFileProps } from 'app/main/file-manger/interfaces/index';
interface IResult {
	saveMessage?: string;
	cancelMessage?: string;
	pendingMessage?: string;
}
export interface INewsListState extends INewsInterface.IBodyNews {
	status?: number;
	entities?: INewsInterface.INewsDTO[];
	newsCreated?: INewsInterface.INewsDTO;
	columnSorted?: string;
	currentNews?: INewsInterface.INewsDTO;
	editorLoading: boolean;
	errorList?: {
		keys?: string[];
		messages?: string[];
	};
	datePublishDialog?: {
		title: string;
		id: string;
		newsCode: number;
		props: {
			open: boolean;
		};
	};
	message?: string;
	searchText?: string;
	orderDescending?: boolean;
	loading: boolean;
}
export interface IAlbumData {
	item: IFileProps;
	mainItem?: boolean;
}
export interface IAlbumStates {
	imagesEntities: IAlbumData[];
	videoEntities: IAlbumData[];
	audioEntities: IAlbumData[];
	documentEntities: IAlbumData[];
}

export interface LocationItem extends IGlobalData.ILocation {
	categoryTitle?: string;
	locationTitle?: string;
	titr?: string;
	mediaFiles2?: IFileManager.IFile[];
	MediaFiles?: IGlobalData.IMedaiFilesSummery[];
}
export interface ICategoryForm {
	entities: LocationItem[];
	loading: boolean;
	image?: IFileManager.IFile;
	openDialog: {
		currentNews: INewsInterface.INewsDTO;

		props: {
			open: boolean;
		};
	};
}

export interface ILocationNewsProps extends INewsInterface.IBodyNews, IResult {
	categoryTitle?: string;
	locationTitle?: string;
	mediaFiles2?: IFileManager.IFile[];
	MediaFiles?: IGlobalData.IMedaiFilesSummery[];
}

export interface IStatusState {
	id: string;
	titr: string;

	titleStatus?: string;
	status?: number;
	statusDialog?: {
		props?: {
			open?: boolean;
		};
	};
	loading?: boolean;
	hasError?: boolean;
}

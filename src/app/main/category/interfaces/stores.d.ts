export interface CategoriesState {
	entities: ICategory.ICategoryData[];
	loading: boolean;
	loadingOne: boolean;
	hasError: boolean;
	searchText: string;
	categoryDialog: any;
	selectedcategory: ICategory.ICategoryData;
}
export interface LocationsStates {
	entities: IGlobalData.ILocation[];
	loading: boolean;
	hasError: boolean;
	locationDialog: any;
	categoryDetail: ICategory.ICategoryData;
}
export interface IDialogDeleteProps {
	type: 'category' | 'location';
	id: string;
	title: string;
	title2?: string;
}
export interface IDeleteState {
	type: 'category' | 'location';
	id: string;
	error?: string;
	deleteDialog?: any;
	title: string;
	title2?: string;
	loading?: boolean;
	hasError?: boolean;
	locationCode?: string;
	locationModuleType?: number;
}
export interface IStateFavorite {
	entities: ICategory.ICategoryData[];
	loading: boolean;
	dialogState: {
		props: {
			open: boolean;
		};
	};
}

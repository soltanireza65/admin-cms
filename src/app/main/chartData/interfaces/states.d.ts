export interface IStates {
	entities: IData[];
	loading: boolean;
}
export interface ICategoriesList {
	categoryID: string;
	categoryTitle: string;
}
export interface IRiskStates {
	entities: ICategoriesList[];
	loading: boolean;
	dialog: {
		loading: boolean;
		categoryID?: string;
		categoryTitle?: string;
		props: {
			open: boolean;
		};
		listData?: IRiskChartData[];
	};
}
export interface IData extends ICategoriesList {
	currentBazaar?: 0;
	bubbleEdge?: number;
}
export interface IBaseChartData {
	id?: string;
	createdDateTime?: string;
	persianCreatedDateTime?: string;
}
export interface IRiskChartData extends IBaseChartData, ICategoriesList {
	riskIndexNumber: number;
}
export interface IChartData extends IBaseChartData {
	currentBazaar?: number;
	bubbleEdge?: number;
}

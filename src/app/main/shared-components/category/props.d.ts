export interface IBaseProps {
	handleChange?: any;
	handleChangeText?: any;
	multiSelect: boolean;
	showLabel: boolean;
}
export interface ICategoryProps extends IBaseProps {
	categroyId?: string;
	options?: ICategory.ICategoryData[];
	isEdditingMode?: boolean;
	selectedCategory?: ICategory.ICategoryData;
}
export interface ILocationProps extends IBaseProps {
	disabled?: boolean;
	selectedLocation?: any;
	options?: IGlobalData.ILocation[];
	categroyId: string;
	showLoading: boolean;
}

export interface INewsOfLocation {
	categoryId?: string;
	locationCode?: string;
	index?: number;
	currentNews?: INewsInterface.INewsDTO;
	onIndexChange?: any;
}
export interface ISelectLocationProps {
	addLocation?: any;
	currentNews?: INewsInterface.INewsDTO;
}

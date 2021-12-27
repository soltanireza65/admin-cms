export interface IPaginationActions {
	onChangePage: Function;
	page: number;
}
export interface INewsListProps {
	columns: Array;
	data: Array;
	onRowClick: Function;
}
export interface IMultiSelectActionsProps {
	selectedNews: INewsInterface.INewsDTO[] = {
		id,
		titr,
		categoryId,
		locationCode,
		newsId,
		priority
	};
}

export interface INewsFormProps extends INewsInterface.INewsDTO {
	handleChange?: any;
	required?: boolean;
	isEdtingMode?: boolean;
}

export interface INewFilterDialog extends INewsInterface.IBodyNews {
	handleChange?: any;
	required?: boolean;
}

export interface IFilterForm extends INewsInterface.INewsDTO {
	open?: boolean;
	handleClose?: any;
}

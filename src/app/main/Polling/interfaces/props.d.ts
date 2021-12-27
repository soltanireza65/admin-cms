export interface IPollingDialog {
	content: string;
	parentId?: string;
	contentId?: string;
	id?: string;
}

export interface IFilterForm extends PollingAPIInterface.IFilterBody {
	open?: boolean;
	handleClose?: any;
}

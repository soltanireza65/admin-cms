export interface ICommentDialog {
	content: string;
	parentId?: string;
	contentId?: string;
	id?: string;
}

export interface IFilterForm extends CommentAPIInterface.IFilterBody {
	open?: boolean;
	handleClose?: any;
}

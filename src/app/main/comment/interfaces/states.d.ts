export interface IState {
	entities: CommentAPIInterface.IComment[];
	loading: boolean;
	status: 0 | 1 | 2 | 3;
	commentDialog: {
		currentComment: CommentAPIInterface.IComment;
		loadingOne: boolean;
		type: string;
		props: {
			open: boolean;
		};
	};
	deleteDialog: {
		currentComment: CommentAPIInterface.IComment;
		loadingOne: boolean;
		props: {
			open: boolean;
		};
	};
}

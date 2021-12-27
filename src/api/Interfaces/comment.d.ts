namespace CommentAPIInterface {
	enum commentStatus {
		Disable = 1,
		Approve = 2,
		Suspend = 3
	}
	interface IBody {
		contentId?: string;
		moduleType?: number;
		content?: string;
		fullName?: string;
		email?: string;
		status?: 1 | 2 | 3;

		showEmail?: boolean;
		captchaText?: string;
		captchaToken?: string;
		captchaUserInputText?: string;
		parentId?: string;
		id?: string;
	}
	interface IFilterBody {
		Count?: number;
		Page?: number;
		TotalPage?: number;
		Id?: string;
		ModuleType?: number;
		ContentId?: string;
		status?: 0 | 1 | 2 | 3;
		UserIp?: string;
		UserId?: string;
		FromCreatedDateTime?: dateTime;
		TillCreatedDateTime?: dateTime;
	}
	interface IComment {
		id: string;
		contentId: string;
		moduleType: number;
		content: string;
		contentParentTitle?: string;
		fullName: string;
		email: string;
		showEmail: boolean;
		status: 1 | 2 | 3;
		parentId: string;
		createdDateTime: string;
		persianCreatedDateTime: string;
		agreeCount: number;
		disAgreeCount: number;
		childs: IComment[];
		isAdminReply: boolean;
	}
}

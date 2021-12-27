namespace PollingInterface {
	interface IPolling {
		id?: string;
		title?: string;
		status?: number;
		categoryId?: string;
		contentId?: string;
		moduleType?: number;
		persianCreatedDateTime?: string;
		persianLastModifiedDateTime?: string;
		options?: IOption[];
	}

	interface IGetPollings {
		status?: number;
		count?: number;
		page?: number;
		totalPage?: number;
	}
	interface IOption {
		id?: string;
		title: string;
		votes?: IVote[];
		voteCount?: number;
	}

	interface IVote {
		agree: number;
		userId: string;
		userIp: string;
		createdDateTime: Date;
	}
	interface IVotes {
		agree: number;
		userId: string;
		userIp: string;
		createdDateTime: Date;
	}
	interface IPollingList {
		id: string;
		categoryId: string;
		categoryTitle: string;
		groupCreatedDateTimeTicks: number;
		createdDateTime: Date;
		votes: IVotes[];
	}
	interface IPollingFavorites {
		id: string;
		persianCreatedDateTime: string;
		createdDateTime: string;
		categoryId: string;
		agreeCount: number;
		disAgreeCount: number;
		totalCount: number;
	}
	interface IBody {
		fromDateTime: Date;
		tillDateTime: Date;
		categoriesId: string[];
		count: number;
	}
	interface IAddPolling {
		title: string;
		moduleType: number;
		contentId: string;
		options: string[];
	}
	interface IEditPolling {
		id: string;
		title: string;
		moduleType: number;
		contentId: string;
	}
	interface IDeletePolling {
		id: string;
		title?: string;
	}
	interface IEditAddOptions {
		pollingId: string;
		optionsTitle?: string[];
		optionsId?: string[];
	}
}

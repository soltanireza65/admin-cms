namespace INewsInterface {
	interface IBodyNews {
		id?: string;
		categoryId?: string;
		locationCode?: string;
		newsCode?: number;
		newsId?: string;
		status?: number;
		titr?: string;
		defaultCategoriesID?: string[];
		tags?: string[];
		toggleLike?: boolean;
		authorUserID?: string;
		fromStartPublishDateTime?: string;
		tillStartPublishDateTime?: string;
		orderByFieldName?: string;
		orderByDescending?: boolean;
		includeLockedForPublicView?: boolean;
		count?: number;
		page?: number;
		totalPage?: number;
		MediaFiles?: IGlobalData.IMedaiFilesSummery[];
		priority?: number;
		contentId?: string[];
	}
	interface INewsDTO {
		id?: string;
		SeoTitr?: string;
		Id?: string;
		newsId?: string;
		shortId?: string;
		rotitr?: string;
		newsType?: number;
		titr?: string;
		lead?: string;
		content?: string;
		newsCode?: number;
		mediaFiles?: IGlobalData.IMedaiFiles[];
		createdDateTime?: string;
		lastModifiedDateTime?: string;
		startPublishDateTimeString?: string;
		lastModifiedUserID?: string;
		authorUserID?: string;
		status?: number;
		writerFullName?: string;
		source?: string;
		defaultCategoryID?: string;
		defaultCategoryTitle?: string;
		shortContent?: string;
		tags?: string[];
		linkUrl?: string;
		relatedNewsId?: string[];
		persianCreatedDateTime?: string;
		persianLastModifiedDateTime?: string;
		persianStartPublishDateTime?: string;
		lastModifiedUserFullName?: string;
		authorUserFullName?: string;
		likeCount?: number;
		disLikeCount?: number;
		shareCount?: number;
		visitedCount?: number;
		isLockedForPublicView?: boolean;
		locations?: IGlobalData.ILocation[];
	}
}

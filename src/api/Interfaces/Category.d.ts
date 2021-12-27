namespace ICategory {
	interface ICategoryData {
		id?: string;
		title?: string;
		label?: string;
		value?: string;
		englishTitle?: string;
		description?: string;
		status?: number;
		Flated?: boolean;
		mediaFiles?: IGlobalData.IMedaiFiles[];
		parentId?: string;
		locations?: IGlobalData.ILocation[];
		categoryId?: string;
		categoryCode?: number;
		count?: number;
		page?: number;
		totalPage?: number;
		childs?: ICategoryData[];
		additionalData?: string;
		isMainPageCategory?: boolean;
		moduleType?: number;
	}
}

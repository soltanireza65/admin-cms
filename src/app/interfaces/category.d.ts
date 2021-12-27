namespace ICategoryApp {
	interface Props {
		type?: string;
		data?: any;
		title: string;
		englishTitle: string;
		description?: string;
		mediaFiles?: IGlobalData.IMedaiFiles[];
		parentId?: string;
	}
}

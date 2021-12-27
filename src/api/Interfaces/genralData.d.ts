namespace IGlobalData {
	interface IServiceResult<T> {
		data?: T;
		message?: string;
		status?: number;
		errors?: {
			data: any;
			stautsCode: number;
		};
	}
	enum LocationModuleType {
		News = 1,
		Advertise = 2,
		Menu = 3,
		Bourse = 4,
		Shakhes = 5,
		Namad = 6,
		Shopping = 7,
		Newspaper = 8,
		Polling = 9,
		QA = 10,
		Page = 11,
		Tag = 12,
		Report = 13,
		Link = 14,
		Newsletter = 15,
		Category = 16
	}
	enum MediaType {
		mainPhoto = 1,
		photoGalley = 2,
		mainVideo = 3,
		videoGallery = 4,
		mainAudio = 5,
		audioGallery = 6,
		document = 7,
		writerPhoto = 8
	}
	enum FileType {
		Document = 1,
		Audio = 2,
		Image = 3,
		Video = 4
	}
	interface IFilterBase {
		categoryId?: string;
		locationCode?: string;
		status?: number;
		page?: number;
		count?: number;
	}
	export interface IMedaiFilesSummery {
		mediaId?: string;
		mediaCropParam?: string;
		mediaFileType?: MediaType;
		attachments?: IMedaiFilesSummery[];
		order?: number;
	}
	export interface IMedaiFiles extends IFileManager.IFile {
		mediaId?: string;
		mediaCropParam?: string;
		mediaFileType?: MediaType;
		attachments?: IMedaiFiles[];
		order?: number;
	}
	export interface ILocation {
		newsId?: string;
		categoryId?: string;
		locationCode?: string;
		categoryTitle?: string;
		publishDateTimeTicks?: number;
		index?: number;
		locationWidth?: number;
		locationHeight?: number;
		locationModuleType?: LocationModuleType;
		mediaFiles?: IGlobalData.IMedaiFiles[];
		priority?: number;
		viewCount?: number;
		title?: string;
	}
}

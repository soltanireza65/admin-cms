namespace IFileManager {
	enum Status {
		private = 1,
		public = 2
	}
	enum ModuleOwner {
		News = 'News',
		Advertise = 'Advertise',
		Menu = 'Menu',
		Category = 'Category'
	}
	interface IFileBody {
		id?: string;
		file?: File;
		caption?: string;
		attachments?: File[];
		moduleOwner?: ModuleOwner;
		status?: Status;
	}
	interface IResultUpload {
		fileName?: string;
		filePath?: string;
		mediaFileId?: string;
	}
	interface IFile {
		caption?: string;
		fileName?: string;
		extension?: string;
		mediaFileId?: string;
		filePath?: string;
		applicationId?: string;
		contentType?: string;
		fileType?: number;
		fileSize?: number;
		createdDateTime?: string;
		lastModifiedDateTime?: string;
		ownerUserId?: string;
		lastModifiedUserID?: string;
		moduleOwner?: string;
		status?: number;
		fileChildren?: IFileChild[];
		attachments?: IFile[];
		id?: string;
		shortId?: string;
		url?: string;
		isVideo?: boolean;
	}
	interface IFileChild {
		tag?: string;
		param?: string;
		caption?: string;
		fileName?: string;
		extension?: string;
		mediaFileId?: string;
		filePath?: string;
		applicationId?: string;
		contentType?: string;
		fileType?: number;
		fileSize?: number;
		createdDateTime?: string;
		lastModifiedDateTime?: string;
		ownerUserId?: string;
		lastModifiedUserID?: string;
		moduleOwner?: string;
		status?: number;
		fileChildren?: IFileChild;
		attachments?: IFile;
		id?: string;
		shortId?: string;
	}
	interface IFileParams {
		id?: string;
		applicationId?: string;
		FileType?: number;
		count?: number;
		page?: number;
		nextPage?: boolean;
		prevPage?: boolean;
		caption?: string;
		ownerUserId?: string;
		moduleOwner?: string;
		fromCreatedDateTime?: string;
		tillCreatedDateTime?: string;
	}
}

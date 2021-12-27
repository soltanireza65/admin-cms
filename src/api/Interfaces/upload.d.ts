namespace IUpload {
	interface IUploadData {
		file: File;
		caption: string;
	}
	interface IResult {
		successUploadedCount: number;
		fileNames: string;
	}
}

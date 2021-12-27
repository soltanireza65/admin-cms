// import axios from 'axios'
import _ from '@lodash';
import { IFile, ISubFilesPayload } from 'app/store/fuse/interfaces/states';
import Axios from 'axios';
import { getWithExpiry } from './localStorageHelper';
interface FileData {
	id: number;
	file: File;
	title: string;
	idparent: number;
}
export class FileUtils {
	fileToUpload: FileData[];
	constructor() {
		this.fileToUpload = [];
	}
	addFiles = (files: File[]) => {
		let tempFiles: IFile[] = [];
		for (let i = 0; i < files.length; i++) {
			let id = i + 1;

			if (this.fileToUpload.length > 0) {
				const tempid = _.sortBy(this.fileToUpload, [item => item.id]);
				id = tempid[tempid.length - 1].id + i + 1;
			}
			const isExsited = this.fileToUpload.findIndex(x => x.title === files[i].name);
			if (isExsited === -1) {
				this.fileToUpload.push({
					id,
					file: files[i],
					title: this.getFileName(files[i].name),
					idparent: 0
				});
				tempFiles.push({
					id,
					caption: this.getFileName(files[i].name),
					extention: this.getExtention(files[i].name),
					//it's solve way for skip problem on delete file
					uploadStarted: false,
					progress: 0,
					status: 2,
					moduleOwner: 'FileManager'
				});
			}
		}

		return tempFiles;
	};
	addSubFiles = (existingFiles: ISubFilesPayload[], files: File[], id: number) => {
		let tempFiles: ISubFilesPayload[] = existingFiles;
		if (this.fileToUpload.length > 0) {
			const tempid = _.sortBy(this.fileToUpload, [item => item.id]);
			for (let i = 0; i < files.length; i++) {
				let idChild = i + 1;

				idChild = tempid[tempid.length - 1].id + i + 1;
				const isExsited = this.fileToUpload.findIndex(x => x.title === files[i].name);

				if (isExsited === -1) {
					this.fileToUpload.push({
						id: idChild,
						file: files[i],
						title: this.getFileName(files[i].name),
						idparent: id
					});
					tempFiles.push({
						id: idChild,
						caption: this.getFileName(files[i].name)
					});
				}
			}

			return tempFiles;
		} else {
			return null;
		}
	};
	deleteFile = (existingFiles: any, id: number) => {
		this.fileToUpload = this.fileToUpload.filter(x => x.id !== id);
		existingFiles = existingFiles.filter(x => x.id !== id);
		return existingFiles;
	};
	deleteSubFile = (existingFiles: any, id: number) => {
		this.fileToUpload = this.fileToUpload.filter(x => x.id !== id);
		existingFiles = existingFiles.filter(x => x.id !== id);
		return existingFiles;
	};
	getExtention = (title: string) => {
		const titleArray = title.split('.');
		return titleArray.length > 0 ? titleArray[1] : null;
	};
	getFileName = (title: string) => {
		const titleArray = title.split('.');
		return titleArray[0];
	};
}

export const uploadFile = async (
	file: IFile,
	handleUpdateProgress
): Promise<IGlobalData.IServiceResult<IGlobalData.IMedaiFiles>> => {
	const formPayload = new FormData();
	const token = getWithExpiry('access_token');

	formPayload.append('File', file.file);
	formPayload.append('Caption', file.caption);
	formPayload.append('ModuleOwner', file.moduleOwner);
	formPayload.append('Status', `${file.status}`);
	formPayload.append('Attachments', file.file, file.caption);
	try {
		const request = await Axios.post(`${process.env.REACT_APP_UPLOAD}/api/Upload/upload`, formPayload, {
			headers: {
				Authorization: `Bearer ${token}`
			},
			onUploadProgress: progress => {
				const { loaded, total } = progress;
				console.log(progress);
				const percentageProgress = Math.floor((loaded / total) * 100);
				handleUpdateProgress(percentageProgress);
			}
		});
		let response: IGlobalData.IServiceResult<IGlobalData.IMedaiFiles>;
		const data = request.data;
		response = data;

		return response;
	} catch (e) {
		return {
			status: 0
		};
	}
};

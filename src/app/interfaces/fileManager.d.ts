import { IFileProps } from 'app/main/file-manger/interfaces/index';
import { Crop } from 'react-image-crop';
namespace IFileManagerApp {
	interface IAlbumData {
		item: IFileProps;
		mainItem?: boolean;
	}
	interface IAlbumStates {
		imagesEntities: IAlbumData[];
		videoEntities: IAlbumData[];
		audioEntities: IAlbumData[];
		documentEntities: IAlbumData[];
		dialogCrop: {
			id: string;
			url: string;
			cropData?: Crop;
			locationWidth?: number;
			locationHeight?: number;
			props: {
				open: boolean;
			};
		};
	}

	enum mediaType {
		photo = 3,
		video = 4,
		audio = 2,
		document = 1,
		all = 0
	}
	interface IAlbumProps {
		mediaType: mediaTye;
	}
}

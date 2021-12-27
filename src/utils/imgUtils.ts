import axios from 'axios';
import { Crop } from 'react-image-crop';
interface ImageProxyUrl {
	url: string;
}
export const UrlImageGenerate = async (mediaId: string): Promise<string> => {
	const baseUrl = `${process.env.REACT_APP_IMG_PROXY}/api/v1/geturl?enlarge=false&gravity=no&height=600&resize=fit&width=600&mediaId=${mediaId}`;

	let response: ImageProxyUrl;
	return new Promise((resolve, reject) => {
		axios({
			method: 'get',
			url: baseUrl
		})
			.then(x => {
				if (x.status === 200) {
					const data = x.data.data;
					response = data;

					return resolve(response.url);
				} else {
					return reject(x);
				}
			})
			.catch(e => {
				return reject(e);
			});
	});
};
/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 */
export const getCroppedImg = (image: HTMLImageElement, crop: Crop, fileName: string) => {
	if (!image) return '';
	const canvas = document.createElement('canvas');
	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;
	canvas.width = crop.width;
	canvas.height = crop.height;
	const ctx = canvas.getContext('2d');

	ctx.drawImage(
		image,
		crop.x * scaleX,
		crop.y * scaleY,
		crop.width * scaleX,
		crop.height * scaleY,
		0,
		0,
		crop.width,
		crop.height
	);

	// As Base64 string

	const base64Image = canvas.toDataURL();
	return base64Image;
	// As a blob
	// return new Promise((resolve, reject) => {
	// 	canvas.toBlob(
	// 		(blob: any) => {
	// 			if (!blob) return;
	// 			blob.name = fileName;
	// 			resolve(URL.createObjectURL(blob));
	// 		},
	// 		'image/png',
	// 		1
	// 	);
	// });
};

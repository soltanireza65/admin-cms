import DeleteIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CheckBox from '@material-ui/core/Checkbox';
import HtmlTooltip from '../shared-components/HtmlTooltip';
import { CardStyle, GridCardStyle } from './styles/documents';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import _ from '@lodash';
import { setSelectedFiles, editMediaFile } from './store/fileManagerSlice';
import { openDeleteDialog } from './store/deleteSlice';
import { IFileProps } from './interfaces/index';
import { UrlImageGenerate } from 'utils/imgUtils';
import InputBase from '@material-ui/core/InputBase';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ValidationTextField from '../shared-components/ValidationTextField';
import { red } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import { addFile } from 'app/store/fuse/albumSlice';
import { setImage as setNewsImage } from 'app/main/news/store/locationsFormSlice';
import { IFileManagerApp } from 'app/interfaces/fileManager';
import { Img } from 'react-image';
import Loader from 'components/Loader';
import { SRLWrapper } from 'simple-react-lightbox';
import Lightbox from 'components/Lightbox';
import Light from 'react-image-lightbox';

import { getWithExpiry } from 'utils/localStorageHelper';
import Skeleton from 'react-loading-skeleton';
import SaveIcon from '@material-ui/icons/Save';
import CheckIcon from '@material-ui/icons/Check';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Axios from 'axios';
import { setImage as setAdvertiseImage } from 'app/main/advertis/store/advertiesSlice';

interface IProps extends IFileProps {
	mediaType: IFileManagerApp.mediaType;
	moduleType: number;
}
export default ({
	id,
	caption,
	checked,
	extension,
	mediaFileId,
	filePath,
	isVideo,
	captionLoading,
	attachments,
	fileType,
	mediaType,
	moduleType
}: IProps) => {
	const dispatch = useDispatch();
	const [imgSrc, setImgSrc] = useState<string>(null);
	const [lightboxImgSrc, setLightboxImgSrc] = useState<string>(null);
	const [isFocused, setIsFocused] = React.useState<boolean>(false);

	const [captionValue, setCaptionValue] = useState<string>(caption);
	const [isLighboxOpen, setIsLighboxOpen] = useState(false);

	const handleSelectedFile = (checkState: boolean) => {
		dispatch(setSelectedFiles(id, checkState));
		switch (moduleType) {
			case 0:
				dispatch(
					addFile(
						{
							id,
							extension,
							mediaFileId,
							filePath,
							attachments,
							fileType,
							isVideo,
							caption,
							url: imgSrc
						},
						mediaType,
						checkState
					)
				);
				break;
			case 5:
				dispatch(
					setAdvertiseImage({
						id,
						extension,
						mediaFileId,
						filePath,
						attachments,
						fileType,
						caption,
						url: imgSrc
					})
				);
				break;
			default:
				dispatch(
					setNewsImage({
						id,
						extension,
						mediaFileId,
						filePath,
						attachments,
						fileType,
						caption,
						url: imgSrc
					})
				);
		}
	};

	if (!id || !extension) {
		return;
	}
	const ImgUrlGenerate = async mediaFileId => {
		const url = await UrlImageGenerate(mediaFileId);

		if (url) setImgSrc(url);
		else setImgSrc('assets/image/empty.png');
	};

	const handleLightbox = async mediaId => {
		setIsLighboxOpen(true);
		// const baseUrl = `${process.env.REACT_APP_IMG_PROXY}/api/v1/geturl?enlarge=false&gravity=no&height=600&resize=fit&width=600&mediaId=${mediaId}`;
		const baseUrl = `${process.env.REACT_APP_IMG_PROXY}/api/v1/geturl`;

		const { data, status } = await Axios.get(baseUrl, {
			params: {
				// enlarge: false,
				// gravity: 'no',
				height: 500,
				// resize: 'fit',
				mediaId: mediaId
			}
		});
		if (status === 200) {
			console.log('data.data.url: ', data.data.url);

			setLightboxImgSrc(data.data.url);
		}

		// axios({
		// 	method: 'get',
		// 	url: baseUrl
		// })
		// 	.then(x => {
		// 		if (x.status === 200) {
		// 			const data = x.data.data;
		// 			response = data;

		// 			return resolve(response.url);
		// 		} else {
		// 			return reject(x);
		// 		}
		// 	})
		// 	.catch(e => {
		// 		return reject(e);
		// 	});
		// getFillSize Image
		// setLightboxImgSrc('');
		//
	};

	useEffect(() => {
		const basePath = 'assets/images/fileType/png/';
		switch (extension.toLowerCase()) {
			case '.mp4':
				setImgSrc(`${basePath}mpg.png`);
				break;
			case '.mp3':
				setImgSrc(`${basePath}mp3.png`);
				break;
			case '.png':
			case '.jpg':
			case '.jpeg':
			case '.bmp':
			case '.gif':
				ImgUrlGenerate(mediaFileId);
				// TODO setLightboxImgSrc()
				break;
			default:
				setImgSrc(`${basePath}doc.png`);
				// TODO setLightboxImgSrc()
				break;
		}
	}, [id]);

	const validationCaption = () => {
		if (isFocused) {
			if (captionValue.length > 3) {
				dispatch(editMediaFile({ id, caption: captionValue }));
			} else {
				setCaptionValue(caption);
			}
			setIsFocused(false);
		}
	};
	const deleteFile = () => {
		dispatch(openDeleteDialog({ id, title: caption }));
	};
	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			validationCaption();
		}
	};

	return (
		<div className="bg-gray-50 rounded overflow-hidden">
			{isVideo ? (
				<video
					className="w-full rounded"
					style={{ height: '140px' }}
					preload="none"
					width="320"
					height="320"
					controls
				>
					<source src={`http://minio.behsoud.com${filePath}`} type="video/mp4" />
				</video>
			) : imgSrc ? (
				<>
					<Img
						onClick={() => handleLightbox(mediaFileId)}
						className="w-full rounded object-cover cursor-pointer"
						style={{ height: '140px' }}
						src={imgSrc}
						alt="upload-image-name"
						loader={<div className="w-full h-full rounded bg-gray-400" style={{ height: '140px' }}></div>}
					/>
					{isLighboxOpen ? (
						<Light
							mainSrc={lightboxImgSrc}
							mainSrcThumbnail={imgSrc}
							onCloseRequest={() => {
								setIsLighboxOpen(false);
								setLightboxImgSrc('');
							}}
							imageTitle={<p>{captionValue}</p>}
						/>
					) : (
						''
					)}
				</>
			) : (
				<div className="w-full h-full rounded bg-gray-400" style={{ height: '140px' }}></div>
			)}

			{isFocused && (
				<input
					onChange={x => setCaptionValue(x.target.value)}
					className="text-16 text-gray-600 text-center mt-10 w-full min-h-40"
					type="text"
					value={captionValue}
					onKeyDown={handleKeyDown}
				/>
			)}
			{!isFocused && (
				<h2 onClick={x => setIsFocused(true)} className="min-h-40 text-16 text-gray-600 text-center mt-10">
					{captionValue.length > 25 ? captionValue.substr(0, 20).concat('...') : captionValue}
				</h2>
			)}
			<div className="card-icon flex flex-row justify-between align-bottom">
				<div className="icon-check">
					<CheckBox
						className="text-select text-black"
						onChange={x => handleSelectedFile(x.target.checked)}
						checked={checked ? checked : false}
					/>
				</div>
				{isFocused ? (
					<div className="icon-submit">
						<IconButton onClick={validationCaption}>
							<CheckIcon className="text-green" />
						</IconButton>
					</div>
				) : (
					<div className="icon-edit">
						<IconButton onClick={() => setIsFocused(!isFocused)}>
							<EditIcon className="text-black" />
						</IconButton>
					</div>
				)}
				<div className="icon-delete">
					<IconButton onClick={deleteFile}>
						<DeleteOutlineIcon className="text-black" />
					</IconButton>
				</div>
			</div>
		</div>
	);
};

import React, { useState, useEffect } from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import CropFree from '@material-ui/icons/CropFree';
import Close from '@material-ui/icons/CloseOutlined';
import DeleteForeverOutlined from '@material-ui/icons/DeleteForeverOutlined';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { UrlImageGenerate } from 'utils/imgUtils';
import { useDispatch } from 'react-redux';
import { setMainItem } from 'app/store/fuse/albumSlice';
import { addFile } from 'app/store/fuse/albumSlice';
import clsx from 'clsx';
import { IFileManagerApp } from 'app/interfaces/fileManager';
import { Img } from 'react-image';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-around',
			overflow: 'hidden',
			backgroundColor: theme.palette.background.paper
		},
		titleBar: {
			// background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
		},
		gridList: {
			flexWrap: 'nowrap',
			// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
			transform: 'translateZ(0)'
		},
		icon: {
			color: 'rgba(255, 255, 255, 0.54)'
		},
		mainItemCSS: {
			transform: 'translateY(0%) !important',
			width: '500px'
		},
		tile: {
			width: '200px'
		},
		rootMainItem: {
			'list-style-type': 'none !important',
			'text-align': '-webkit-center'
		}
	})
);
interface IProps extends IFileManagerApp.IAlbumData {
	mediaType: IFileManagerApp.mediaType;
}
export default ({ item, mainItem, mediaType }: IProps) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [imgSrc, setImgSrc] = useState(null);
	const ImgUrlGenerate = async mediaFileId => {
		const url = await UrlImageGenerate(mediaFileId);

		if (url) setImgSrc(url);
		else setImgSrc('assets/image/350x250.png');
	};

	useEffect(() => {
		const basePath = 'assets/images/fileType/png/';

		switch (item.extension.toLowerCase()) {
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
				ImgUrlGenerate(item.mediaFileId);
				break;
			default:
				setImgSrc(`${basePath}doc.png`);
				break;
		}
	});
	const handleOnSetMainItem = () => {
		dispatch(setMainItem(item.id, mediaType));
	};

	return (
		<GridListTile
			className="mx-10 bg-gray-200 rounded"
			classes={{
				root: mainItem && classes.rootMainItem,
				tile: mainItem ? classes.mainItemCSS : classes.tile,
				imgFullWidth: mainItem ? classes.mainItemCSS : classes.tile
			}}
			cols={mainItem ? 2 : 1}
			rows={mainItem ? 2 : 1}
		>
			{item && item.isVideo ? (
				<video
					preload="none"
					className={clsx(mainItem && classes.mainItemCSS)}
					width="320"
					height="320"
					controls
				>
					<source src={`${process.env.REACT_APP_VIDEO_URL}${item.filePath}`} type="video/mp4" />
				</video>
			) : imgSrc ? (
				<Img
					width={32}
					height={32}
					className="w-full object-cover"
					style={{
						height: !mainItem && '140px'
					}}
					src={imgSrc}
					alt="upload-image-name"
					loader={<div className="w-full h-full rounded bg-gray-400" style={{ height: '140px' }}></div>}
				/>
			) : (
				<div className="w-full h-full rounded bg-gray-400" style={{ height: '140px' }}></div>
			)}
			{mainItem && mainItem == true && (
				<GridListTileBar
					actionIcon={
						<div>
							{
								// 	<IconButton aria-label={`info about ${item.caption}`} className={classes.icon}>
								// 	<CropFree />
								// </IconButton>
							}
							<IconButton
								aria-label={`info about ${item.caption}`}
								className={classes.icon}
								onClick={() => {
									dispatch(setMainItem('0', mediaType));
								}}
							>
								<Close />
							</IconButton>
						</div>
					}
				/>
			)}
			{!mainItem && (
				<div className="flex flex-col mx-10">
					<div>
						<p className="block mt-10">{item.caption}</p>
					</div>
					<div className="flex justify-end">
						<Tooltip title="انتخاب تصویر اصلی">
							<IconButton>
								<StarBorderIcon className="text-black" onClick={handleOnSetMainItem} />
							</IconButton>
						</Tooltip>

						<IconButton
							aria-label={`info about ${item.caption}`}
							className={classes.icon}
							onClick={() => {
								dispatch(
									addFile(
										{
											...item,
											fileType: mediaType == 3 ? 1 : mediaType == 4 ? 3 : mediaType == 2 ? 5 : 0
										},
										mediaType,
										false
									)
								);
							}}
						>
							<DeleteForeverOutlined className="text-black" />
						</IconButton>
					</div>
				</div>
				// <GridListTileBar
				// 	style={{ backgroundColor: '#e7e7e7', color: 'black' }}
				// 	title={<p className="block">{item.caption}</p>}
				// 	// title={<p>${}</p>}
				// 	titlePosition="top"
				// 	actionIcon={
				// <div>
				// 	<IconButton>
				// 		<StarBorderIcon className="text-black" onClick={handleOnSetMainItem} />
				// 	</IconButton>
				// 	<IconButton
				// 		aria-label={`info about ${item.caption}`}
				// 		className={classes.icon}
				// 		onClick={() => {
				// 			dispatch(
				// 				addFile(
				// 					{
				// 						...item,
				// 						fileType:
				// 							mediaType == 3 ? 1 : mediaType == 4 ? 3 : mediaType == 2 ? 5 : 0
				// 					},
				// 					mediaType,
				// 					false
				// 				)
				// 			);
				// 		}}
				// 	>
				// 		<DeleteForeverOutlined className="text-black" />
				// 	</IconButton>
				// </div>
				// 	}
				// 	actionPosition="right"
				// 	className={classes.titleBar}
				// />
			)}
		</GridListTile>
	);
};

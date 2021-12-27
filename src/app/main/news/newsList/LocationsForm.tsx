import React, { useState, useEffect, useCallback, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import Transition from '../../shared-components/Transition';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setDialogCategoryState } from '../store/locationsFormSlice';
import SelectLocationPriority from '../../shared-components/category/selectLocation';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CropFree from '@material-ui/icons/CropFree';
import FileManagerDialog from 'app/main/file-manger/FileManagerDialog';
import { setDialogState } from 'app/main/file-manger/store/fileManagerSlice';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getLocationsByNewsId } from '../store/locationsFormSlice';
import LocationData from './LocationData';
import { dialogCropState } from 'app/store/fuse/albumSlice';
import CropDialog from 'app/main/shared-components/crop/CropDialog';
import { getCroppedImg } from 'utils/imgUtils';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		direction: 'rtl',
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 500,
		'box-shadow':
			'0px 2px 12px 0px rgb(238 8 8 / 20%), 0px 1px 1px 0px rgb(62 187 244 / 14%), 0px 1px 3px 0px rgb(87 255 93 / 12%)'
	},
	image: {
		width: '100%',
		height: 200
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%'
	},
	imgElemnt: {
		'list-style-type': 'none !important',
		height: '100%'
	},
	cropImage: {
		color: 'white'
	},
	listLocations: {
		marginTop: '10px'
	}
}));

export default function LocationsForm() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const LocationsForm = useSelector(({ newsApp }: any) => newsApp.locationsForm);
	const cropData = useSelector(({ fuse }: any) => fuse.album.dialogCrop.cropData);
	const [croppedImage, setCroppedImage] = useState(null);
	const imgRef = useRef(null);

	React.useEffect(() => {
		if (LocationsForm.openDialog.currentNews)
			dispatch(getLocationsByNewsId({ id: LocationsForm.openDialog.currentNews.id }));
	}, [LocationsForm.openDialog]);
	const { t } = useTranslation('newsApp');
	const handleClose = () => {
		dispatch(setDialogCategoryState(false, null));
	};

	useEffect(() => {
		setCroppedImage('');
	}, [LocationsForm.image]);

	useEffect(() => {
		if (cropData) {
			const croppedImage = getCroppedImg(imgRef.current, cropData, 'newFile.jpeg');
			setCroppedImage(croppedImage);
		}
	}, [dispatch, cropData]);
	const handleOpenDialog = () => {
		dispatch(setDialogState(true, 3, 2));
	};
	const handleCropOpen = () => {
		dispatch(dialogCropState(LocationsForm?.image?.id, LocationsForm?.image?.url, true));
	};
	return (
		<div>
			<Dialog
				open={LocationsForm.openDialog.props.open}
				TransitionComponent={Transition}
				keepMounted
				style={{
					direction: 'rtl',
					maxHeight: '600px !important'
				}}
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
				maxWidth="md"
			>
				<DialogTitle id="alert-dialog-slide-title">
					{t('locations_dialog_title')}
					{' -> '}
					{LocationsForm.openDialog.currentNews && LocationsForm.openDialog.currentNews.newsCode}
					{' - '}
					{LocationsForm.openDialog.currentNews && LocationsForm.openDialog.currentNews.titr}
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={3}>
						<Grid item xs={4}>
							<GridListTile className={classes.imgElemnt} key={1}>
								<ButtonBase className={classes.image} onClick={handleOpenDialog}>
									<img
										className={classes.img}
										alt=""
										src={
											croppedImage ||
											(LocationsForm.image ? LocationsForm.image.url : 'assets/images/empty.jpg')
										}
										crossOrigin="anonymous"
									/>
									<img
										className={classes.img}
										alt=""
										ref={imgRef}
										style={{ display: 'none' }}
										src={LocationsForm.image ? LocationsForm.image.url : 'assets/images/empty.jpg'}
										crossOrigin="anonymous"
									/>
								</ButtonBase>
								<GridListTileBar
									title=""
									titlePosition="bottom"
									actionIcon={
										<IconButton className={classes.cropImage}>
											<CropFree onClick={handleCropOpen} />
										</IconButton>
									}
									actionPosition="right"
								/>
							</GridListTile>
						</Grid>
						<Grid item xs={8}>
							<Paper>
								<SelectLocationPriority />
							</Paper>
						</Grid>

						<Grid item xs={12} className="">
							<DialogTitle id="alert-dialog-slide-title">{t('locations_list')}</DialogTitle>

							<Grid item xs={12} className={classes.listLocations}>
								{LocationsForm.loading ? (
									<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
										<Typography className="text-20 mb-16" color="textSecondary">
											لطفا منتظر بمانید ...
										</Typography>
										<LinearProgress className="w-xs" color="secondary" />
									</div>
								) : (
									LocationsForm.entities &&
									LocationsForm.entities.length > 0 &&
									LocationsForm.entities.map((item: IGlobalData.ILocation, index) => {
										return (
											<div>
												<LocationData
													key={index}
													{...item}
													newsId={
														LocationsForm.openDialog &&
														LocationsForm.openDialog.currentNews &&
														LocationsForm.openDialog.currentNews.id
													}
													mediaFiles2={item.mediaFiles}
												/>
											</div>
										);
									})
								)}
							</Grid>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						{t('save_button')}
					</Button>
					<Button onClick={handleClose} color="primary">
						{t('cancel_button')}
					</Button>
				</DialogActions>
			</Dialog>
			<FileManagerDialog />
			<CropDialog />
		</div>
	);
}

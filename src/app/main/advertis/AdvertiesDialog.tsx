import { useForm } from '@fuse/hooks';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { UploadIcon } from '../shared-components/upload/styleDesign';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FuseUtils from '@fuse/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '@fuse/hooks';
import ValidationTextField from '../shared-components/ValidationTextField';
import Grid from '@material-ui/core/Grid';
import Category from 'app/main/shared-components/category/category';
import { CategoryApi } from 'api/Category';
import { uploadFile } from 'utils/fileUtils';
import { IFile } from 'app/store/fuse/interfaces/states';
import LocationItem from './LocationItem';
import { DialogTitle, LinearProgress, makeStyles, Theme } from '@material-ui/core';
import Transition from '../shared-components/Transition';
import {
	dialogOpenState,
	addLocations,
	editAdverties,
	removeLocation,
	addAdverties,
	addBulkLocations,
	setImage,
	setImageLoading
} from './store/advertiesSlice';
import _ from '@lodash';
import { getCroppedImg, UrlImageGenerate } from 'utils/imgUtils';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import { CropFree } from '@material-ui/icons';
import ButtonBase from '@material-ui/core/ButtonBase';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { setDialogState } from '../file-manger/store/fileManagerSlice';
import { dialogCropState } from 'app/store/fuse/albumSlice';
import FileManagerDialog from '../file-manger/FileManagerDialog';
import CropDialog from 'app/main/shared-components/crop/CropDialog';
import Skeleton from '@material-ui/lab/Skeleton';
import { selectNavigationIds } from 'app/store/fuse/navigationSlice';

const initialValues: AdvertiesInterface.IAdvertiesBody = {
	id: '',
	title: '',
	createdDateTime: '',
	linkUrl: '',
	locations: [],
	urlFile: '',
	mediaFile: {},
	status: 2
};
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		direction: 'rtl',
		flexGrow: 1
	},
	progressBar: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2)
		}
	},
	image: {
		width: '100%',
		height: 180
	},
	img: {
		marginBottom: 'auto',
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
	}
}));

export default () => {
	// States
	const [imgSrc, setImgSrc] = useState('assets/images/placeholder.jpg');
	const [files, setFiles] = useState<any>(null);
	// const [categoriesList, setCategoriesList] = useState<ICategory.ICategoryData[]>();
	const [selectedCategory, setSelectedCategory] = useState<ICategory.ICategoryData>();
	const [locationDisabled, setLocationDisabled] = useState<boolean>(true);
	const [locationList, setLocationList] = useState<IGlobalData.ILocation[]>();
	const [selectedLocation, setSelectedLocation] = useState<IGlobalData.ILocation>();
	const [showLoadingLocation, setShowLoadingLocation] = useState(true);
	const [progressValue, setPorgressValue] = useState<number>(0);

	const dispatch = useDispatch();
	const classes = useStyles();
	const adverties = useSelector(({ advertiesApp }: any) => advertiesApp.adverties);
	const categories = useSelector(({ fuse }: any) => fuse?.category?.entities);
	//  use form for manage state in form
	const { form, handleChange, resetForm, setForm } = useForm<AdvertiesInterface.IAdvertiesBody>(initialValues);
	const cropData = useSelector(({ fuse }: any) => fuse.album.dialogCrop.cropData);
	const [croppedImage, setCroppedImage] = useState(null);
	const imgRef = React.useRef(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setCroppedImage('');
	}, [adverties.dialogAdverties.image]);

	useEffect(() => {
		if (cropData) {
			const croppedImage = getCroppedImg(imgRef.current, cropData, 'newFile.jpeg');
			setCroppedImage(croppedImage);
		}
	}, [dispatch, cropData]);
	//  initialForm
	const initDialog = useCallback(() => {
		console.log({ ...adverties.dialogAdverties });
		/**
		 * Dialog type: 'edit'
		 */
		if (adverties.dialogAdverties.type === 'edit' && adverties.dialogAdverties.props.currentAdvertiesItem) {
			let url = '';
			(async () => {
				setImageLoading();
				try {
					url = await UrlImageGenerate(
						adverties?.dialogAdverties?.props?.currentAdvertiesItem.mediaFile?.mediaFileId
					);
				} catch (e) {
					dispatch(setImage(null));
				}
				dispatch(setImage({ ...adverties?.dialogAdverties?.props?.currentAdvertiesItem.mediaFile, url }));
			})();
			let locationsList: IGlobalData.ILocation[] = [];
			console.log(categories);
			adverties.dialogAdverties.props.currentAdvertiesItem.locations?.map((item: IGlobalData.ILocation) => {
				const category: ICategory.ICategoryData = categories?.find(
					(x: ICategory.ICategoryData) => x.id == item.categoryId || x.categoryId == item.categoryId
				);
				if (category) {
					category?.locations?.find(x => {
						if (x.locationCode == item.locationCode) {
							locationsList.push({
								categoryId: category.id,
								categoryTitle: category.title,
								locationCode: item.locationCode,
								title: x.title
							});
						}
					});
				}
			});
			dispatch(addBulkLocations(locationsList));
			setForm({ ...adverties.dialogAdverties.props.currentAdvertiesItem, urlFile: url });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (adverties.dialogAdverties.type === 'new') {
			setForm({
				...initialValues,
				id: FuseUtils.generateGUID()
			});
			// setLocationList([]);
		}
	}, [adverties.dialogAdverties.props.currentAdvertiesItem, adverties.dialogAdverties.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (adverties.dialogAdverties.props.open) {
			initDialog();
		}
	}, [adverties.dialogAdverties.props.open, initDialog]);

	const { t } = useTranslation('advertiesApp');

	const clearForm = () => {
		setPorgressValue(0);
		setFiles(null);
		resetForm();
		setImgSrc('assets/images/placeholder.jpg');
	};
	function handleCloseDialog() {
		dispatch(dialogOpenState(null, false, 'new'));
		dispatch(setImage(null));
		clearForm();
	}

	const handleOpenDialog = () => {
		dispatch(setDialogState(true, 3, 5));
	};
	const handleCropOpen = () => {
		dispatch(dialogCropState(adverties.dialogAdverties.image?.id, adverties.dialogAdverties.image?.url, true));
	};

	//category

	const handleChangeCategory = async (event, value) => {
		let id = value.value;
		setSelectedCategory(value ? value : null);
		const ev = {
			target: {
				name: 'defaultCategoryID',
				value: value && value.value,
				categoryData: value
			}
		};
		handleChange(ev);
		if (!id) setLocationList([]);
		const { data } = await CategoryApi.getCategoryById({ id: id });
		console.log('data', data);
		if (data.locations.length === 0) {
			setLocationList([]);
			setShowLoadingLocation(false);
		}
		setLocationList(data.locations);
		console.log('data.locations: ', data.locations);
		console.log('locationList: ', locationList);

		// setShowLoadingLocation(false);
		setLocationDisabled(false);
		setSelectedLocation({
			// title:"",
			// value
		});
	};

	const handleChangeLocation = value => {
		setSelectedLocation(value && value.target ? JSON.parse(value.target.value) : null);
	};

	const handleUpdateProgress = (value: number) => {
		setPorgressValue(value);
	};
	const uploadCurrentFile = async (file: IFile) => {
		return await uploadFile(file, handleUpdateProgress);
	};

	const handleIdCateogryChange = useDebounce(async (id: string) => {
		setShowLoadingLocation(true);
		if (!id) {
			setLocationList([]);
			return null;
		}
		const request = await CategoryApi.getCategoryById({ id: id });
		const { data } = await request;

		if (data.locations.length === 0) {
			setLocationList([]);
			setShowLoadingLocation(false);
			return;
		}
		setLocationList(data.locations);
		setShowLoadingLocation(false);
		return;
	}, 200);

	const handleAddSelectedLocaion = () => {
		dispatch(
			addLocations({
				locationCode: selectedLocation.locationCode,
				categoryId: selectedCategory.value,
				categoryTitle: selectedCategory.title,
				title: selectedLocation.title
			})
		);
	};
	const deleteLocation = index => {
		dispatch(removeLocation({ index }));
	};

	//handle submit
	async function handleSubmit(ev) {
		ev.preventDefault();
		const { fileType, mediaFileId } = adverties.dialogAdverties.image;
		const mediaCropParam = `${cropData?.width},${cropData?.height},${cropData?.x},${cropData?.y}`;
		form.mediaFile = {
			mediaId: mediaFileId,
			mediaCropParam,
			mediaFileType: fileType
		};

		form.locations = adverties?.dialogAdverties?.locations.map(location => ({
			categoryId: location.categoryId,
			locationCode: location.locationCode
		}));
		setLoading(true);
		if (adverties?.dialogAdverties?.type === 'new') {
			await dispatch(addAdverties({ ...form }));
			handleCloseDialog();
		} else {
			await dispatch(editAdverties({ ...form }));
			handleCloseDialog();
		}
		setLoading(false);
	}

	return (
		<>
			<Dialog
				open={adverties.dialogAdverties.props.open}
				TransitionComponent={Transition}
				// keepMounted
				style={{
					direction: 'rtl',
					maxHeight: '600px !important'
				}}
				onClose={handleCloseDialog}
				maxWidth="md"
				fullWidth
			>
				<AppBar position="static" className="">
					<Toolbar className="flex w-full">
						<Typography variant="subtitle1" color="inherit">
							{adverties.dialogAdverties.type === 'edit' &&
								adverties.dialogAdverties.props.currentAdvertiesItem?.title}
							{adverties.dialogAdverties.type === 'new' && t('new_advertise')}
						</Typography>
					</Toolbar>
				</AppBar>
				<DialogContent>
					<Grid container>
						<Grid item xs={12} className="mt-20">
							<ValidationTextField
								className="mt-8 mb-16"
								label={t('title')}
								autoFocus
								name="title"
								id="title"
								value={form.title}
								required={true}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<ValidationTextField
								className="mt-8 mb-16"
								label={t('linkUrl')}
								autoFocus
								name="linkUrl"
								id="linkUrl"
								value={form.linkUrl}
								required={true}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
						</Grid>
						<Grid container className="justify-between mt-24">
							<Grid item xs={5}>
								<GridListTile className={classes.imgElemnt} key={1}>
									<ButtonBase className={classes.image} onClick={handleOpenDialog}>
										{adverties.dialogAdverties.imageLoading ? (
											<Skeleton variant="rect" width="100%" height="100%" />
										) : (
											<>
												<img
													className={classes.img}
													alt=""
													src={
														croppedImage ||
														adverties.dialogAdverties.image?.url ||
														'assets/images/empty.jpg'
													}
													crossOrigin="anonymous"
												/>
												<img
													className={classes.img}
													alt=""
													ref={imgRef}
													style={{ display: 'none' }}
													src={
														adverties.dialogAdverties.image
															? adverties.dialogAdverties.image.url
															: 'assets/images/empty.jpg'
													}
													crossOrigin="anonymous"
												/>
											</>
										)}
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
							<Grid container xs={6}>
								<Grid item xs={12} className="mb-12">
									<Category
										handleChange={handleChangeCategory}
										showLabel={true}
										multiSelect={false}
										categroyId={selectedCategory && selectedCategory.id}
										selectedCategory={selectedCategory}
										// isEdditingMode={isEdditingMode}
									/>
								</Grid>
								<Grid item xs={12} className="mb-12">
									<FormControl fullWidth variant="outlined">
										<InputLabel>{t('d_location')}</InputLabel>
										<Select
											value={selectedLocation && selectedLocation}
											label={t('d_location')}
											disabled={locationDisabled}
											onChange={evt => {
												handleChangeLocation(evt);
											}}
										>
											{locationList &&
												locationList.length > 0 &&
												locationList.map((location, index) => {
													return (
														<MenuItem value={JSON.stringify(location)}>
															{location.title}
														</MenuItem>
													);
												})}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<Button
										onClick={() => {
											handleAddSelectedLocaion();
										}}
										fullWidth
										color="primary"
										variant="contained"
									>
										{t('d_add_location')}
									</Button>
								</Grid>
							</Grid>
						</Grid>
						<Grid container className="my-24">
							<DialogTitle id="alert-dialog-slide-title">{t('t_locations_list')}</DialogTitle>
							<Grid item xs={12} className="md:px-96">
								{adverties?.dialogAdverties?.locations?.length ? (
									adverties?.dialogAdverties?.locations?.map((item: any, index) => (
										<LocationItem
											key={index}
											location={item}
											index={index}
											deleteLocation={deleteLocation}
										/>
									))
								) : (
									<div className="flex flex-1 items-center justify-center h-full">
										<Typography color="textSecondary" variant="subtitle1">
											{t('t_no_locations')}
										</Typography>
									</div>
								)}
							</Grid>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions className="px-20">
					<Button
						variant="outlined"
						disabled={progressValue > 0 || loading}
						className="flex flex-1 mr-2"
						onClick={handleSubmit}
						color="primary"
					>
						{t('d_save')}
					</Button>
					<Button
						onClick={handleCloseDialog}
						variant="outlined"
						color="secondary"
						className="flex flex-1 mr-2"
					>
						{t('d_return')}
					</Button>
				</DialogActions>
				{loading && (
					<div className="mt-2 mb-12 px-20">
						<LinearProgress color="secondary" />
					</div>
				)}
				<FileManagerDialog />
				<CropDialog />
			</Dialog>
		</>
	);
};

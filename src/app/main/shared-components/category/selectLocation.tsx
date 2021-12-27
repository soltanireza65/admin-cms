import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Category from './category';
import Location from './location';
import Button from '@material-ui/core/Button';
import LocationIndex from './newsOfLocation';
import { useDebounce } from '@fuse/hooks';
import { CategoryApi } from 'api/Category/index';
import { LocationItem } from 'app/main/news/interfaces/states';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from '@lodash';
import { addLocationToNews } from 'app/main/news/store/newsSlice';
import { FormControl, FormHelperText, MenuItem, Select, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel';

export default () => {
	const dispatch = useDispatch();
	const locationsFormData = useSelector(({ newsApp }: any) => newsApp.locationsForm);
	const cropDialog = useSelector(({ fuse }: any) => fuse.album.dialogCrop);
	const [index, setIndex] = useState<number>(1);
	const { t } = useTranslation('shareCategory');
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState<ICategory.ICategoryData>();
	const [locationList, setLocationList] = useState<IGlobalData.ILocation[]>();
	const [selectedLocation, setSelectedLocation] = useState<IGlobalData.ILocation>();
	const [locationDisabled, setLocationDisabled] = useState<boolean>(true);
	const [selectedNews, setSelectedNews] = useState<INewsInterface.INewsDTO>(null);

	// Handlers
	const handleChangeCategory = (evt, value) => {
		setSelectedCategory(value && value);
		setLocationDisabled(false);
		console.log('selectedCategory: ', selectedCategory);
	};
	const handleChangeLocation = evt => {
		setSelectedLocation(evt ? JSON.parse(evt.target.value) : null);
		console.log('selectedLocation: ', selectedLocation);
	};
	const handleAddLocationToNews = () => {
		if (!selectedCategory || !selectedLocation || !selectedNews || !index) {
			return;
		}
		let image = locationsFormData.image && locationsFormData.image;
		let formdata: LocationItem = {
			categoryId: selectedCategory.value,
			locationCode: selectedLocation.locationCode,
			newsId: selectedNews.id,
			titr: selectedNews.titr,
			priority: index,
			categoryTitle: selectedCategory.label,
			locationTitle: selectedLocation.title
		};
		if (image) {
			image = _.omit(image, 'url');
			const mediaCropParam = `${cropDialog.cropData?.width},${cropDialog.cropData?.height},${cropDialog.cropData?.x},${cropDialog.cropData?.y}`;
			formdata.MediaFiles = [
				{
					mediaId: image.mediaFileId,
					mediaCropParam,
					mediaFileType: 1
				}
			];

			formdata.mediaFiles2 = [
				{
					mediaFileId: image.mediaFileId
				}
			];
		}
		dispatch(addLocationToNews({ ...formdata }));
	};
	const onIndexChang = (index: number) => {
		setIndex(index);
	};
	// setSelectedNews
	useEffect(() => {
		setSelectedNews(locationsFormData.openDialog.currentNews);
	}, [locationsFormData]);

	// GetCategories
	useEffect(() => {
		const getCategories = async () => {
			let catArray = [];
			const { data } = await CategoryApi.getAllCategories();
			data.forEach(item => {
				catArray.push({
					title: item.title,
					value: item.id
				});
			});
			setCategories(catArray);
		};
		getCategories();
	}, []);

	// GetLocations
	useEffect(() => {
		if (selectedCategory) {
			const getLocations = async (catID: string) => {
				if (!catID) setLocationList([]);
				const { data } = await CategoryApi.getCategoryById({ id: catID });
				if (data.locations.length === 0) {
					setLocationList([]);
				}
				setLocationList(data.locations);
				console.log('locationList: ', locationList);
			};
			getLocations(selectedCategory.value);
		}
	}, [selectedCategory]);

	return (
		<Grid item xs={12}>
			<Paper style={{ padding: '10px' }}>
				<Grid container xs={12} spacing={2}>
					<Grid item xs={12}>
						{/* categories */}
						<Autocomplete
							id="categories"
							getOptionLabel={option => option.title}
							noOptionsText="یافت نشد ..."
							options={categories}
							value={selectedCategory && selectedCategory}
							onChange={handleChangeCategory}
							disableClearable
							renderInput={params => (
								<TextField {...params} variant="outlined" label="سرویس :" placeholder="سرویس " />
							)}
						/>
					</Grid>

					<Grid item xs={12}>
						{/* Location */}
						<FormControl fullWidth variant="outlined">
							<InputLabel>جایگاه</InputLabel>
							<Select
								value={selectedLocation && selectedLocation}
								label="جایگاه"
								disabled={locationDisabled}
								onChange={evt => {
									handleChangeLocation(evt);
								}}
							>
								{locationList &&
									locationList.length > 0 &&
									locationList.map((location, index) => {
										return <MenuItem value={JSON.stringify(location)}>{location.title}</MenuItem>;
									})}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						{selectedCategory && selectedLocation && selectedNews && selectedNews.status == 3 && (
							<LocationIndex
								categoryId={selectedCategory && selectedCategory.value}
								locationCode={selectedLocation && selectedLocation.locationCode}
								currentNews={selectedNews}
								index={index}
								onIndexChange={onIndexChang}
							/>
						)}
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							color="primary"
							className="w-full"
							disabled={!selectedCategory || !selectedLocation}
							onClick={handleAddLocationToNews}
						>
							{t('add_to_locations')}
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

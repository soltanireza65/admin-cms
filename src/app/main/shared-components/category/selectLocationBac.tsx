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
import { MenuItem, Select, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default () => {
	const dispatch = useDispatch();
	const [selectedCategory, setSelectedCategory] = useState<ICategory.ICategoryData>();
	const locationsFormData = useSelector(({ newsApp }: any) => newsApp.locationsForm);
	const [age, setAge] = React.useState('');
	const handleChange = event => {
		setAge(event.target.value);
	};
	const cropDialog = useSelector(({ fuse }: any) => fuse.album.dialogCrop);
	const [categoriesList, setCategoriesList] = useState<ICategory.ICategoryData[]>();
	const [locationList, setLocationList] = useState<IGlobalData.ILocation[]>();
	const [selectedNews, setSelectedNews] = useState<INewsInterface.INewsDTO>(null);
	const [selectedLocation, setSelectedLocation] = useState<IGlobalData.ILocation>();

	const [showLoadingLocation, setShowLoadingLocation] = useState(true);
	const [locationDisabled, setLocationDisabled] = useState<boolean>(true);

	const [index, setIndex] = useState<number>(1);
	const { t } = useTranslation('shareCategory');

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

	// setSelectedNews
	useEffect(() => {
		setSelectedNews(locationsFormData.openDialog.currentNews);
	}, [locationsFormData]);

	const handleChangeCategory = (evt, value) => {
		setSelectedCategory(value && value.value);
		console.log('selectedCategory.locations: ', selectedCategory.locations);
	};

	const handleChangeLocation = value => {
		setSelectedLocation(value && value.target ? value.target.value : null);
	};

	const onIndexChang = (index: number) => {
		setIndex(index);
	};
	const mapOptions = useCallback((data: ICategory.ICategoryData[]) => {
		return data.map(item => ({
			value: item.id,
			label: item.title
		}));
	}, []);
	const handleChangeText = async (inputValue, callBack) => {
		if (!inputValue) {
			return callBack([]);
		}
		try {
			const request = await CategoryApi.getAllCategories({ title: inputValue });
			let { data } = await request;

			data = mapOptions(data);
			callBack(data);
		} catch {
			callBack([]);
		}
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

			formdata.MediaFiles = [
				{
					mediaId: image.mediaFileId,
					mediaCropParam: cropDialog?.cropData,
					mediaFileType: 1
				}
			];
		}
		dispatch(addLocationToNews({ ...formdata }));
	};

	const getLocations = async (catID: string) => {
		// categroyId
		if (!catID) setLocationList([]);
		const { data } = await CategoryApi.getCategoryById({ id: catID });
		if (data.locations.length === 0) {
			setLocationList([]);
			setShowLoadingLocation(false);
		}
		setLocationList(data.locations);
		setLocationDisabled(false);
	};

	const [categories, setCategories] = useState([]);
	const [selected, setSelected] = useState<ICategory.ICategoryData>({
		title: '',
		value: ''
	});
	const SetValue = () => {
		if (selectedCategory) {
			setSelected({
				title: selectedCategory.title,
				value: selectedCategory.value
			});
		}
	};

	useEffect(() => {
		SetValue();
	}, []);

	useEffect(() => {
		SetValue();
	}, [selectedCategory]);

	useEffect(() => {
		// selectedCategory && selectedCategory.value
	}, []);
	if (categoriesList && selectedCategory) {
		getLocations(selectedCategory.value);
	}

	return (
		<Grid item xs={12}>
			<Paper style={{ padding: '10px' }}>
				<Grid container xs={12} spacing={2}>
					<Grid item xs={12}>
						{/* TODO CATEGORY */}
						{/* <Category
							handleChangeText={handleChangeText}
							handleChange={handleChangeCategory}
							options={categoriesList}
							showLabel={true}
							multiSelect={false}
						/> */}
						<Autocomplete
							// multiple
							id="categories"
							getOptionLabel={option => option.title}
							noOptionsText="یافت نشد ..."
							// defaultValue={selectedCategory}
							options={categories}
							value={selectedCategory && selectedCategory}
							onChange={handleChangeCategory}
							disableClearable
							renderInput={params => (
								<TextField
									{...params}
									variant="outlined"
									label="سرویس پیش فرض خبر:"
									placeholder="سرویس پیش فرض خبر"
								/>
							)}
						/>
					</Grid>

					<Grid item xs={12}>
						{/* <Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={age}
							onChange={handleChange}
						>
							{selectedCategory &&
								selectedCategory.locations.map((location, index) => {
									return <MenuItem value={10}>test</MenuItem>;
								})}
						</Select> */}
						{/* <Location
							handleChange={handleChangeLocation}
							handleChangeText={handleIdCateogryChange}
							options={locationList}
							showLabel={true}
							showLoading={showLoadingLocation}
							multiSelect={false}
							categroyId={selectedCategory && selectedCategory.value}
						/> */}
						{/* {selectedCategory && (
							<Autocomplete
								id="locations"
								className="h-5"
								options={selectedCategory.locations}
								// value={selectedLocation}
								fullWidth
								// onChange={handleChangeLocation}
								getOptionLabel={option => option.title}
								// getOptionLabel={option => option.titr}
								// onChange={handleOnChnage}
								renderInput={params => <TextField variant="outlined" />}
							/>
						)} */}
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

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import { ILocationProps } from './props';
import { CategoryApi } from 'api/Category';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default ({
	handleChange,
	multiSelect,
	showLabel,
	handleChangeText,
	options,
	categroyId,
	showLoading,
	selectedLocation,
	disabled
}: ILocationProps) => {
	const { t } = useTranslation('shareCategory');
	const [locationList, setLocationList] = useState<IGlobalData.ILocation[]>();
	const [selected, setSelected] = useState<ICategory.ICategoryData>(null);

	const [showLoadingLocation, setShowLoadingLocation] = useState(true);
	const [locationDisabled, setLocationDisabled] = useState<boolean>(true);

	const [open, setOpen] = React.useState(false);
	const loading = open && options.length === 0 && showLoading;

	React.useEffect(() => {
		if (loading) {
			handleChangeText(categroyId);
		}
	}, [loading]);
	React.useMemo(() => {
		handleChangeText(categroyId);
	}, []);

	const getLocations = async (catID: string) => {
		// categroyId
		if (!catID) setLocationList([]);
		const { data } = await CategoryApi.getCategoryById({ id: catID });
		console.log('data', data);
		if (data.locations.length === 0) {
			setLocationList([]);
			setShowLoadingLocation(false);
		}
		setLocationList(data.locations);
		setLocationDisabled(false);
	};

	useEffect(() => {
		getLocations(categroyId);
	}, [categroyId]);

	const handleOnChnage = (event, value) => {
		if (!multiSelect) {
			const ev = {
				target: {
					name: 'Location',
					value: value
				}
			};
			handleChange(ev);
		} else {
			if (value) {
				handleChange(value);
			}
		}
	};
	return (
		<Autocomplete
			id="locations"
			className="h-5"
			options={options}
			value={selectedLocation}
			disableClearable
			// getOptionLabel={option => option.titr}
			style={{ width: 300 }}
			// onChange={handleOnChnage}
			renderInput={params => <TextField {...params} label="Combo box" variant="outlined" />}
		/>
		// <Autocomplete
		// 	className="h-5"
		// 	id="locationselect"
		// 	options={options}
		// 	disabled={disabled && disabled}
		// 	disableClearable
		// 	// inputValue={}
		// 	// open={open}
		// 	value={selectedLocation}
		// 	inputValue={selectedLocation && selectedLocation.title }
		// 	// onOpen={() => {
		// 	// 	setOpen(true);
		// 	// }}
		// 	// onClose={() => {
		// 	// 	setOpen(false);
		// 	// }}
		// 	// multiple={multiSelect}
		// 	noOptionsText={t('no_Options')}
		// 	// loading={loading}
		// 	// loadingText={t('loading_text')}
		// 	getOptionLabel={({ title }: ICategory.ICategoryData) => title}
		// 	// disableCloseOnSelect={multiSelect}
		// 	onChange={handleOnChnage}
		// 	// onInputChange={(event, value) => {
		// 	// 	handleChangeText(value);
		// 	// }}
		// 	// limitTags={1}
		// 	renderOption={(option, { selected }) => (
		// 		<React.Fragment>
		// 			{multiSelect && (
		// 				<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
		// 			)}
		// 			{option.title}
		// 		</React.Fragment>
		// 	)}
		// 	renderInput={params => (
		// 		<TextField
		// 			{...params}
		// 			label={showLabel && t('location_title')}
		// 			className="h-5"
		// 			variant="outlined"
		// 			InputProps={{
		// 				...params.InputProps,
		// 				endAdornment: (
		// 					<React.Fragment>
		// 						{loading ? <CircularProgress color="inherit" size={20} /> : null}
		// 						{params.InputProps.endAdornment}
		// 					</React.Fragment>
		// 				)
		// 			}}
		// 		/>
		// 	)}
		// />
	);
};

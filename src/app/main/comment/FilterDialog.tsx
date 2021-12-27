import React, { useState, useEffect } from 'react';

import { Dialog } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';

import { TextField, Button } from '@material-ui/core';
import { DialogActions, DialogContent, Typography } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { FilterList } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import MobileDetect from 'mobile-detect';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useForm } from '@fuse/hooks';
import DatePicker from '../shared-components/datePicker/DatePicker';
import moment from 'moment-jalaali';
import { AuthService } from 'api/Http/authService';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import { getComments } from './store/commentSlice';
import _ from '@lodash';
import { IFilterForm } from './interfaces/props';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDebounce } from '@fuse/hooks';
import { NewsApi } from 'api/News/index';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		maxHeight: '80%'
	}
}));

const opetionsModuleType = [
	{ titleEn: 'News', index: 1 },
	{ titleEn: 'Advertise', index: 2 },
	{ titleEn: 'Menu', index: 3 },
	{ titleEn: 'Bourse', index: 4 },
	{ titleEn: 'Shakhes', index: 5 },
	{ titleEn: 'Namad', index: 6 },
	{ titleEn: 'Shopping', index: 7 },
	{ titleEn: 'Newspaper', index: 8 },
	{ titleEn: 'Polling', index: 9 },
	{ titleEn: 'QA', index: 10 },
	{ titleEn: 'Page', index: 11 },
	{ titleEn: 'Tag', index: 12 },
	{ titleEn: 'Report', index: 13 },
	{ titleEn: 'Link', index: 14 },
	{ titleEn: 'Newsletter', index: 15 },
	{ titleEn: 'Category', index: 16 }
];

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = Boolean(md.mobile());
const initialValues: CommentAPIInterface.IFilterBody = {};
moment.loadPersian({ dialect: 'persian-modern' });
export default ({ open, handleClose }: IFilterForm) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const { form, handleChange, setForm } = useForm<CommentAPIInterface.IFilterBody>(initialValues);
	const [isLocked, setIsLocked] = useState<boolean>(false);
	const [justOwnNews, setJustOwnNews] = useState<boolean>(false);
	const [firstDate, setFirstDate] = useState(null);
	const [secondDate, setSecondDate] = useState(null);

	const [options, setOptions] = React.useState<INewsInterface.INewsDTO[]>([]);
	const [selectedNews, setSelectedNews] = useState<INewsInterface.INewsDTO>(null);
	const [typeSearch, setTypeSearch] = useState<number>();
	const handleChangeItems = e => {
		setTypeSearch(e.target.value);
	};
	const { t } = useTranslation('commentsApp');
	const handleClearSearch = () => {
		setForm(initialValues);
		dispatch(getComments({}));
	};
	const handleOnChangeLockedState = ev => {
		handleChange(ev);
		setIsLocked(!isLocked);
	};
	const handleOwnNewsState = () => {
		setJustOwnNews(!justOwnNews);
	};
	const handleFirstDateChange = date => {
		setFirstDate(date);
	};

	const handleSecondDateChange = date => {
		setSecondDate(date);
	};
	const handleSetFirstDateNull = () => {
		setFirstDate(null);
	};
	const handleSetSecondDateNull = () => {
		setSecondDate(null);
	};
	const handleSubmit = async () => {
		let form2 = form;
		if (firstDate) form.FromCreatedDateTime = firstDate.toISOString();
		if (secondDate) form.TillCreatedDateTime = secondDate.toISOString();

		if (selectedNews) {
			form.ContentId = selectedNews.id;
		}

		if (typeSearch > 0) form.ModuleType = typeSearch;
		for (const [key, value] of Object.entries(form)) {
			if (value === null || value.length == 0 || value === undefined) {
				form2 = _.omit(form, key);
			}
		}

		dispatch(getComments({ ...form2 }));
		handleClose();
	};

	const handleChangeText = useDebounce(async (text: any) => {
		if (text.length < 3) {
			return null;
		}
		const request = await NewsApi.manageNews({ titr: text });
		const { status, data } = await request;

		if (data.length === 0) {
			setOptions([]);
		}
		setOptions(Object.keys(data).map(key => data[key]) as INewsInterface.INewsDTO[]);
	}, 200);
	const handleChangeNews = (item: any) => {
		if (item && item.id) {
			setSelectedNews(item);
		} else {
			setSelectedNews(null);
		}
	};
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="sm"
			aria-labelledby="form-dialog-title"
			fullScreen={isMobile}
			fullWidth={!isMobile}
			className={classes.root}
		>
			<DialogTitle>{t('filter_title')}</DialogTitle>
			<Divider />
			<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
				<Autocomplete
					classes={{
						root: 'w-full'
					}}
					id="checkboxes-tags-demo"
					options={options}
					noOptionsText={t('suggestion_no_Options')}
					onChange={(event: any, newValue: string | null) => {
						handleChangeNews(newValue);
					}}
					onInputChange={(event, value) => {
						handleChangeText(value);
					}}
					getOptionLabel={(option: INewsInterface.INewsDTO) => `${option.titr}-${option.newsCode}`}
					renderOption={(option, { selected }) => (
						<>
							{option.titr}-{option.newsCode}
						</>
					)}
					renderInput={params => <TextField {...params} variant="outlined" label={t('suggestion_t_title')} />}
				/>
				<div className="mt-8">
					<FormControl className="w-full m-15">
						<Select
							className="h-25"
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							name="newsType"
							value={typeSearch}
							onChange={handleChangeItems}
						>
							<MenuItem value={0}>{t('all')}</MenuItem>
							{opetionsModuleType.map((item, index) => (
								<MenuItem value={opetionsModuleType[index].index}>{t(item.titleEn)}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className="mt-8">
					<Typography variant="subtitle1" gutterBottom>
						{t('filter_first_date')}
					</Typography>
					<DatePicker
						onChange={handleFirstDateChange}
						selectedDate={firstDate}
						setNull={handleSetFirstDateNull}
					/>
				</div>
				<div className="mt-8">
					<Typography variant="subtitle1" gutterBottom>
						{t('filter_second_date')}
					</Typography>
					<DatePicker
						onChange={handleSecondDateChange}
						selectedDate={secondDate}
						setNull={handleSetSecondDateNull}
					/>
				</div>
			</DialogContent>
			<Divider />
			<DialogActions>
				<div className="flex mb-2 w-full justify-content-center">
					<Button onClick={handleClose} variant="outlined" size="small" className="flex flex-1 ml-2">
						{t('cancel_button')}
					</Button>
					<Button
						onClick={handleSubmit}
						size="small"
						variant="outlined"
						color="primary"
						className="flex flex-1 mr-2"
					>
						{t('filter_submit_button')}
					</Button>
				</div>
			</DialogActions>
		</Dialog>
	);
};

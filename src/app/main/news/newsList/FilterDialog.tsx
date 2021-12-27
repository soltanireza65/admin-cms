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
import { IFilterForm } from '../interfaces/props';
import { useTranslation } from 'react-i18next';
import DefaultCategory from '../../shared-components/category/DefaultCategory';
import TagSuggestions from '../../shared-components/tags/TagTextBoxt';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useForm } from '@fuse/hooks';
import { INewFilterDialog } from '../interfaces/props';
import { manageNews } from '../store/newsSlice';
import IOSSwitch from '../../shared-components/IosSwitch';
import DatePicker from '../../shared-components/datePicker/DatePicker';
import moment from 'moment-jalaali';
import { AuthService } from 'api/Http/authService';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import HtmlTooltip from '../../shared-components/HtmlTooltip';
import _ from '@lodash';
import { CircularProgress, AppBar, Toolbar } from '@material-ui/core';

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = Boolean(md.mobile());
const initialValues: INewFilterDialog = {};
moment.loadPersian({ dialect: 'persian-modern' });
export default ({ open, handleClose }: IFilterForm) => {
	const dispatch = useDispatch();
	const { form, handleChange, setForm } = useForm<INewFilterDialog>(initialValues);
	const [isLocked, setIsLocked] = useState<boolean>(false);
	const [justOwnNews, setJustOwnNews] = useState<boolean>(false);
	const [firstDate, setFirstDate] = useState(null);
	const [secondDate, setSecondDate] = useState(null);

	const { t } = useTranslation('newsApp');
	const handleClearSearch = () => {
		setForm(initialValues);
		dispatch(manageNews({}));
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
		if (firstDate) form.fromStartPublishDateTime = firstDate.toISOString();
		if (secondDate) form.tillStartPublishDateTime = secondDate.toISOString();
		if (justOwnNews) {
			const authService = new AuthService();

			await authService.getUser().then(x => {
				form.authorUserID = x.profile.sub;
			});
		}

		for (const [key, value] of Object.entries(form)) {
			if (value === null || value.length == 0 || value === undefined) {
				form2 = _.omit(form, key);
			}
		}

		dispatch(manageNews({ ...form2 }));
		handleClose();
	};
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="sm"
			aria-labelledby="form-dialog-title"
			fullScreen={isMobile}
			fullWidth={!isMobile}
		>
			<AppBar position="static">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{t('filter_title')}
					</Typography>
				</Toolbar>
			</AppBar>
			<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
				<TextField
					className="mb-8 rtl"
					placeholder={t('filter_id')}
					id="id"
					name="id"
					value={form.id}
					onChange={handleChange}
					variant="outlined"
					fullWidth
				/>
				<TextField
					className="mb-8 rtl"
					placeholder={t('filter_by_news_code')}
					id="newsCode"
					name="newsCode"
					value={form.newsCode}
					onChange={handleChange}
					variant="outlined"
					fullWidth
				/>
				<TextField
					className="mb-8 rtl"
					placeholder={t('filter_titr')}
					id="titr"
					name="titr"
					value={form.titr}
					onChange={handleChange}
					variant="outlined"
					fullWidth
				/>

				<DefaultCategory handleChange={handleChange} multiSelect={false} showLabel={false} />
				<div className="mt-8">
					<Typography variant="subtitle1" gutterBottom>
						انتخاب برچسب ها:
					</Typography>
					<TagSuggestions handleChange={handleChange} />
				</div>
				<div className="mt-8">
					<FormControlLabel
						control={
							<IOSSwitch
								value={isLocked}
								checked={isLocked}
								onChange={handleOnChangeLockedState}
								name="isLockedForPublicView"
							/>
						}
						label={t('setting_isLock')}
					/>
				</div>

				<div className="mt-8">
					<FormControlLabel
						control={
							<IOSSwitch
								value={justOwnNews}
								checked={justOwnNews}
								onChange={handleOwnNewsState}
								name="justOnwNews"
							/>
						}
						label={t('filter_just_owned')}
					/>
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
				<Button onClick={handleSubmit} variant="outlined" color="primary" className="flex flex-1 ml-2">
					{t('filter_submit_button')}
				</Button>
				<Button onClick={handleClose} variant="outlined" color="secondary" className="flex flex-1 mr-2">
					{t('cancel_button')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

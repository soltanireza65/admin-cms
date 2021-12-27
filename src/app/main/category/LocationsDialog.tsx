import { useForm } from '@fuse/hooks';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import AppInputField from 'components/AppInputField';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import HtmlTooltip from '../shared-components/HtmlTooltip';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import FuseUtils from '@fuse/utils';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';

import { closeNewLocationDialog, createLocation, editLocation } from './store/locationSlice';
const initialValues: IGlobalData.ILocation = {
	locationModuleType: 1,
	categoryId: '0',
	locationCode: '',
	locationHeight: 0,
	locationWidth: 0,
	title: '',
	viewCount: 0
};

const moduleTypes = [
	{
		title: 'خبر',
		value: 1
	},
	{
		title: 'تبلغیات',
		value: 2
	},
	{
		title: 'منو',
		value: 3
	}
];
function LocationsDialog(props) {
	const dispatch = useDispatch();
	const locationDialog = useSelector(({ categoryApp }: any) => categoryApp.location.locationDialog);
	const { form, handleChange, resetForm, setForm } = useForm<IGlobalData.ILocation>(initialValues);
	const [selectedType, setSelectedType] = useState(1);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (locationDialog.type === 'edit' && locationDialog.data) {
			setForm({ ...locationDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (locationDialog.type === 'new') {
			setForm({
				...initialValues,
				...locationDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [locationDialog.data, locationDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (locationDialog.props.open) {
			initDialog();
		}
	}, [locationDialog.props.open, initDialog]);
	function handlemoduleTypesChange(ev) {
		setSelectedType(ev.target.value);
	}

	const { t } = useTranslation('categoryApp');

	function handleCloseDialog() {
		dispatch(closeNewLocationDialog({}));
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		form.locationModuleType = selectedType;

		form.categoryId = locationDialog.id;

		if (locationDialog.type == 'new') {
			dispatch(createLocation({ ...form }));
		} else {
			dispatch(editLocation({ ...form }));
		}
		resetForm();
		handleCloseDialog();
	}

	return (
		<div className="p-24">
			<Modal
				{...locationDialog.props}
				onClose={handleCloseDialog}
				aria-labelledby="form-dialog-title"
				aria-describedby="simple-modal-description"
				className="w-1/3 mx-auto"
			>
				<div className="main my-auto md:mt-76 flex flex-col bg-white justify-between items-stretch rounded overflow-hidden">
					<AppBar position="static" className="">
						<Toolbar className="flex w-full">
							<Typography variant="subtitle1" color="inherit">
								{t('l_d_dialog_form_title')}
							</Typography>
						</Toolbar>
					</AppBar>

					<div className="content flex-col justify-between px-20">
						<form noValidate onSubmit={handleSubmit} className="flex flex-col">
							<AppInputField
								label={t('l_d_dialog_title')}
								placeholder="عنوان"
								autoFocus
								id="title"
								name="title"
								type="text"
								value={form.title}
								onChange={handleChange}
								required
							/>
							<AppInputField
								label={t('l_d_dialog_locationcode')}
								name="locationCode"
								type="text"
								value={form.locationCode}
								placeholder="کد جایگاه"
								onChange={handleChange}
								required
							/>
							<AppInputField
								label={t('l_d_viewcount')}
								id="viewCount"
								name="viewCount"
								type="number"
								value={form.viewCount}
								onChange={handleChange}
								required
								fullWidth
							/>
							<AppInputField
								label={t('l_d_locationheight')}
								id="locationHeight"
								name="locationHeight"
								type="number"
								value={form.locationHeight}
								onChange={handleChange}
								fullWidth
							/>
							<AppInputField
								label={t('l_d_locationwidth')}
								id="locationWidth"
								name="locationWidth"
								type="number"
								value={form.locationWidth}
								onChange={handleChange}
								fullWidth
							/>

							<Select
								labelId=""
								id=""
								className=""
								variant="outlined"
								fullWidth
								value={selectedType}
								onChange={handlemoduleTypesChange}
							>
								{moduleTypes.map(({ title, value }, index) => (
									<MenuItem key={index} value={value}>
										{title}
									</MenuItem>
								))}
							</Select>

							<div className="actions flex justify-between w-full px-16 my-12">
								<div className="px-16">
									<Button variant="contained" color="primary" type="submit">
										{t('l_d_button_submit')}
									</Button>
								</div>
								<div className="px-16">
									<Button variant="contained" color="secondary" type="submit">
										{t('d_button_cancel')}
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default LocationsDialog;

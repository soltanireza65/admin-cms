import React, { useEffect, useState } from 'react';
import {
	AppBar,
	Dialog,
	DialogActions,
	DialogContent,
	TextField,
	Toolbar,
	Typography,
	makeStyles,
	Button,
	CircularProgress
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeEditModal, editProfile } from './store/usersSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const useStyle = makeStyles(theme => ({
	root: {
		[theme.breakpoints.up(560)]: {
			minWidth: 400
		}
	}
}));

interface FormValues {
	fullName: string;
}

const initialValues: FormValues = {
	fullName: ''
};

function EditdDialog() {
	const { open, data, loading, error } = useSelector((store: any) => store.usersApp.users.editModal);
	const dispatch = useDispatch();
	const styles = useStyle();
	const { t } = useTranslation('usersApp');
	const common = useTranslation('common');

	const handleCloseModal = () => {
		resetForm();
		dispatch(closeEditModal());
	};

	useEffect(() => {
		setValues({ fullName: data.fullName }, false);
	}, [data]);

	const onSubmit = async (values: FormValues) => {
		dispatch(editProfile({ user: { ...values, userId: data.userId }, prevUsername: data.fullName }));
	};

	const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm, setValues } = useFormik({
		initialValues,
		onSubmit,
		validationSchema: Yup.object({
			fullName: Yup.string().required(common.t('field_required', { field: t('fullname') }))
		})
	});

	return (
		<>
			<Dialog
				open={open}
				onClose={handleCloseModal}
				classes={{
					root: 'max-h-150 h-100 min-w-full',
					paper: 'rounded-8 '
				}}
				maxWidth="sm"
			>
				<AppBar position="static">
					<Toolbar className="flex w-full">
						<Typography variant="subtitle1" color="inherit">
							{t('edit_user')} {data.username}
						</Typography>
					</Toolbar>
				</AppBar>

				<DialogContent classes={{ root: `pb-0 md:px-32 sm:p-24 sm:pb-0 p-10 ${styles.root}` }}>
					<form onSubmit={handleSubmit} className="flex flex-col" autoComplete="off">
						<div className="w-full mb-12">
							<div className="mx-10">
								<label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
									{t('fullname')}
								</label>
								<TextField
									value={values.fullName}
									variant="outlined"
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder={t('fullname')}
									fullWidth
									name="fullName"
									error={touched.fullName && !!errors.fullName}
									helperText={touched.fullName ? errors.fullName : ''}
								/>
							</div>
						</div>
						<div className="mt-12 mr-10 text-md text-red-400">{error}</div>
						<div className="my-6">
							{loading ? (
								<div className="text-center w-full">
									<CircularProgress />
								</div>
							) : (
								<DialogActions className="justify-between p-8">
									<div className="flex justify-between w-full my-8">
										<Button
											variant="outlined"
											className="w-1/3 flex flex-1 mx-2"
											type="submit"
											color="primary"
										>
											{t('save')}
										</Button>
										<Button
											variant="outlined"
											className="w-1/3 flex flex-1 mx-2"
											color="secondary"
											onClick={handleCloseModal}
										>
											{t('cancel')}
										</Button>
									</div>
								</DialogActions>
							)}
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default EditdDialog;

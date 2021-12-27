import React, { useEffect, useState } from 'react';
import { changePassword, changeRole, editProfile, createUser } from './UserFunctions';

import Button from '@material-ui/core/Button';
import { AppBar, Dialog, DialogActions, DialogContent, TextField, Toolbar, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeAddModal } from './store/usersSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';

const initialValues: BaseApiNameSpace.IUserForm = {
	fullName: '',
	mobile: '',
	password: '',
	email: '',
	confirmPassword: ''
};

function AddUserDialog() {
	const dispatch = useDispatch();
	const { open } = useSelector((store: any) => store.usersApp.users.addUserModal);
	const { t } = useTranslation('usersApp');
	const common = useTranslation('common');
	const handleCloseModal = () => {
		resetForm();
		dispatch(closeAddModal());
	};

	const handle = async (values: BaseApiNameSpace.IUserForm) => {
		setFormState({ error: '', loading: true });
		const { data, message } = await createUser(values);

		if (data) {
			handleCloseModal();
			setFormState({ error: '', loading: false });
		} else {
			setFormState({ error: message, loading: false });
		}
	};

	const [formState, setFormState] = useState({ error: '', loading: false });

	const { values, handleSubmit, handleChange, errors, touched, handleBlur, resetForm } = useFormik({
		initialValues,
		onSubmit: handle,
		validationSchema: Yup.object({
			fullName: Yup.string().required(common.t('field_required', { field: t('fullname') })),
			mobile: Yup.string()
				.max(11, common.t('field_max_length', { field: t('phone'), value: 11 }))
				.required(common.t('field_required', { field: t('phone') }))
				.min(10, common.t('field_min_length', { field: t('phone'), value: 10 })),
			password: Yup.string()
				.min(8, common.t('field_min_length', { field: t('password'), value: 8 }))
				.required(common.t('field_required', { field: t('password') })),
			email: Yup.string()
				.email(common.t('email_invalid'))
				.required(common.t('field_required', { field: t('email') })),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref('password'), null], common.t('wrong_field', { field: t('repeat_password') }))
				.required(common.t('field_required', { field: t('repeat_password') }))
		}),
		validateOnBlur: true
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
				fullWidth
			>
				<AppBar position="static">
					<Toolbar className="flex w-full">
						<Typography variant="subtitle1" color="inherit">
							{t('create_user')}
						</Typography>
					</Toolbar>
				</AppBar>

				<DialogContent classes={{ root: 'pt-16 pb-0 md:px-32 sm:p-24 sm:pb-0 p-10' }}>
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
						<div className="w-full mb-12">
							<div className="mx-10">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="grid-city"
								>
									{t('email')}
								</label>
								<TextField
									value={values.email}
									variant="outlined"
									placeholder={t('email')}
									onChange={handleChange}
									onBlur={handleBlur}
									fullWidth
									name="email"
									error={touched.email && !!errors.email}
									helperText={touched.email ? errors.email : ''}
								/>
							</div>
						</div>

						<div className="flex flex-wrap -mx-3 mb-12">
							<div className="w-full px-3">
								<div className="mx-10">
									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="grid-last-name"
									>
										{t('phone')}
									</label>

									<TextField
										value={values.mobile}
										variant="outlined"
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder={t('phone')}
										fullWidth
										name="mobile"
										error={touched.mobile && !!errors.mobile}
										helperText={touched.mobile ? errors.mobile : ''}
									/>
								</div>
							</div>
						</div>

						<div className="flex flex-wrap -mx-3 mb-12">
							<div className="w-full px-3 mx-10">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="grid-password"
								>
									{t('password')}
								</label>
								<TextField
									value={values.password}
									variant="outlined"
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder={t('password')}
									fullWidth
									name="password"
									type="password"
									error={touched.password && !!errors.password}
									helperText={touched.password ? errors.password : ''}
								/>
							</div>
						</div>
						<div className="flex flex-wrap -mx-3 mb-15">
							<div className="w-full px-3 mx-10">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="grid-password"
								>
									{t('repeat_password')}
								</label>
								<TextField
									value={values.confirmPassword}
									variant="outlined"
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder={t('repeat_password')}
									fullWidth
									name="confirmPassword"
									type="password"
									error={touched.confirmPassword && !!errors.confirmPassword}
									helperText={touched.confirmPassword ? errors.confirmPassword : ''}
								/>
							</div>
						</div>
						<div className="mt-12 mr-10 text-md text-red-400">{formState.error}</div>
						<div className="mt-12 mb-5">
							{formState.loading ? (
								<div className="text-center w-full">
									<CircularProgress />
								</div>
							) : (
								<DialogActions className="justify-between p-8">
									<div className="flex justify-between w-full mb-8">
										<Button
											variant="outlined"
											className="w-1/3 flex flex-1 mx-2"
											type="submit"
											color="primary"
										>
											{t('create')}
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

export default AddUserDialog;

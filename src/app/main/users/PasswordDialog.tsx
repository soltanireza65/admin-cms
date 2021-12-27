import React, { useState } from 'react';
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
import { closePasswordModal } from './store/usersSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { changePassword } from './UserFunctions';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useTranslation } from 'react-i18next';

const useStyle = makeStyles(theme => ({
	root: {
		[theme.breakpoints.up(560)]: {
			minWidth: 400
		}
	}
}));

interface FormValues {
	password: string;
	confirmPassword: string;
}

const initialValues: FormValues = {
	password: '',
	confirmPassword: ''
};

function PasswordDialog() {
	const { open, data } = useSelector((store: any) => store.usersApp.users.passwordModal);
	const dispatch = useDispatch();
	const styles = useStyle();

	const { t } = useTranslation('usersApp');
	const common = useTranslation('common');

	const handleCloseModal = () => {
		resetForm();
		setFormState({ loading: false, error: '' });
		dispatch(closePasswordModal());
	};

	const [formState, setFormState] = useState({ loading: false, error: '' });

	const onSuccessSubmit = () => {
		setFormState({ loading: false, error: '' });
		dispatch(
			showMessage({
				message: `گذرواژه کاربر ${data.username} با موفقیت تغییر یافت`,

				variant: 'success'
			})
		);
		handleCloseModal();
	};

	const onFailSubmit = (error: string) => {
		setFormState({ loading: false, error });
	};

	const onSubmit = async (values: FormValues) => {
		setFormState({ loading: true, error: '' });
		const { status, errors } = await changePassword({ ...values, userId: data.userId });
		if (status == 1) {
			onSuccessSubmit();
		} else {
			onFailSubmit(errors.data.errors.Password[0]);
		}
	};

	const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
		initialValues,
		onSubmit,
		validationSchema: Yup.object({
			password: Yup.string()
				.min(8, common.t('field_min_length', { field: t('password'), value: 8 }))
				.required(common.t('field_required', { field: t('password') })),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref('password'), null], common.t('wrong_field', { field: t('repeat_password') }))
				.required(common.t('field_required', { field: t('repeat_password') }))
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
							{t('edit_user_password', { user: data.username })}
						</Typography>
					</Toolbar>
				</AppBar>

				<DialogContent classes={{ root: `pb-0 md:px-32 sm:p-24 sm:pb-0 p-10 ${styles.root}` }}>
					<form onSubmit={handleSubmit} className="flex flex-col" autoComplete="off">
						<div className="w-full mb-12">
							<div className="mx-10">
								<label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
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
									error={touched.password && !!errors.password}
									helperText={touched.password ? errors.password : ''}
									type="password"
								/>
							</div>
						</div>
						<div className="w-full mb-12">
							<div className="mx-10">
								<label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
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
									error={touched.confirmPassword && !!errors.confirmPassword}
									helperText={touched.confirmPassword ? errors.confirmPassword : ''}
									type="password"
								/>
							</div>
						</div>
						<div className="mt-12 mr-10 text-md text-red-400">{formState.error}</div>
						<div className="my-6">
							{formState.loading ? (
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

export default PasswordDialog;

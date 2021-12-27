import { useDebounce, useForm } from '@fuse/hooks';
import _ from '@lodash';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useMemo, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ITagFormProps } from './interfaces/props';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import reducer from './store';
import withReducer from 'app/store/withReducer';
import { closeTagDialog, addTag, editTag } from './store/tagsSlice';
import { CircularProgress, LinearProgress } from '@material-ui/core';
import { AppBar, DialogContent, Toolbar, Typography } from '@material-ui/core';

const initialValues: ITagFormProps = {
	label: '',
	title: '',
	description: ''
};
const requiredValues = ['title'];
const Tag = () => {
	const dispatch = useDispatch();
	const tagDialog = useSelector(({ tagApp }: any) => tagApp.tags.tagDialog);
	const loading = useSelector(({ tagApp }: any) => tagApp.tags.submitLoading);

	const { form, handleChange, setForm } = useForm<ITagFormProps>(initialValues);
	const [errors, setErrors] = useState<ITagFormProps>(initialValues);

	useEffect(() => {
		if (tagDialog.data) {
			const { title, label, description } = tagDialog.data;
			setForm({ title, label, description });
		} else {
			setForm(initialValues);
		}
	}, [tagDialog]);
	const { t } = useTranslation('tagApp');
	const handleCloseDialog = () => {
		dispatch(closeTagDialog({}));
		setErrors(initialValues);
	};

	const isFormValid = () => {
		const errors: any = {};
		for (let value of requiredValues) {
			if (form[value]) delete errors[value];
			else errors[value] = 'required';
		}
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (isFormValid()) {
			if (tagDialog.type === 'new') {
				dispatch(addTag({ ...form, callback: tagDialog.data?.callback }));
			} else {
				dispatch(editTag({ ...form, id: tagDialog.data.id }));
			}
		}
	};

	const getErrorMessage = (field: string, errorType: string) => {
		if (errorType === 'required') {
			return `${field} الزامی است`;
		}
		return '';
	};

	return (
		<Dialog
			{...tagDialog.props}
			onClose={handleCloseDialog}
			classes={{
				paper: 'rounded-8 w-1/3'
			}}
		>
			<AppBar position="static">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{tagDialog.type === 'new' ? t('add_tag') : t('edit_tag')}
					</Typography>
				</Toolbar>
			</AppBar>
			<DialogContent className="px-20 py-10">
				<form onSubmit={handleSubmit}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.title}
						label={t('d_title')}
						autoFocus
						id="title"
						name="title"
						value={form.title}
						onChange={handleChange}
						variant="outlined"
						fullWidth
						disabled={tagDialog.type === 'edit'}
						helperText={getErrorMessage(t('d_title'), errors.title)}
					/>

					<TextField
						className="mt-8 mb-16"
						id="label"
						name="label"
						error={!!errors.label}
						onChange={handleChange}
						label={t('d_label')}
						type="text"
						value={form.label}
						variant="outlined"
						fullWidth
						helperText={getErrorMessage(t('d_label'), errors.label)}
					/>

					<TextField
						className="mt-8 mb-16"
						id="description"
						name="description"
						error={!!errors.description}
						onChange={handleChange}
						label={t('d_description')}
						type="textarea"
						value={form.description}
						variant="outlined"
						fullWidth
						multiline
						helperText={getErrorMessage(t('d_description'), errors.description)}
					/>
					<DialogActions className="justify-between py-8 px-0">
						<Button
							variant="outlined"
							color="primary"
							type="submit"
							className="flex flex-1 mr-2"
							disabled={loading}
						>
							{t('d_save')}
						</Button>
						<Button
							variant="outlined"
							color="secondary"
							onClick={handleCloseDialog}
							className="flex flex-1 mr-2"
						>
							{t('d_cancel')}
						</Button>
					</DialogActions>
					{loading && (
						<div className="mt-2 mb-12">
							<LinearProgress color="secondary" />
						</div>
					)}
				</form>
			</DialogContent>
		</Dialog>
	);
};
export default withReducer('tagApp', reducer)(Tag);

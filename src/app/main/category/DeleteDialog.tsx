import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Transition from '../shared-components/Transition';
import { useSelector, useDispatch } from 'react-redux';
import { IDeleteState } from './interfaces/stores';
import { closeDeleteDialog, deleteLocation, deleteCategory } from './store/deleteSlice';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { AppBar, Toolbar, Typography, DialogActions, CircularProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
	fabProgress: {
		color: green[500]
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#000'
	}
}));
export default () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const deleteDialogStore = useSelector(({ categoryApp }: any) => categoryApp.deleteStore);
	const {
		title,
		title2,
		id,
		type,
		loading,
		locationCode,
		locationModuleType,
		error
	}: IDeleteState = deleteDialogStore;
	const handleClose = () => {
		dispatch(closeDeleteDialog({}));
	};
	const handleSubmit = () => {
		type === 'category' && dispatch(deleteCategory({ id, title }));
		type === 'location' && dispatch(deleteLocation({ title, categoryId: id, locationCode, locationModuleType }));
	};
	const { t } = useTranslation('categoryApp');

	return (
		<Dialog
			{...deleteDialogStore.deleteDialog.props}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
			className="rtl"
		>
			<AppBar position="static">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{t('c_d_delete_category')}
					</Typography>
				</Toolbar>
			</AppBar>
			<DialogContent className="px-20 py-10">
				<div className="text-18 my-40">
					{type === 'category' && (
						<div>
							{t('m_question')}
							<span style={{ color: '#f44336', fontWeight: 'bold' }}> {t('m_delete')} </span>
							{t('m_category_delete', { title })}
						</div>
					)}
					{type === 'location' && (
						<div>
							{t('m_question')}
							<span style={{ color: '#f44336', fontWeight: 'bold' }}> {t('m_delete')} </span>
							{t('l_d_delete_category', { title })}
						</div>
					)}
				</div>
				<div className="text-red-500 text-md mb-10">{error}</div>
				{loading ? (
					<div className="text-center mb-8">
						<CircularProgress />
					</div>
				) : (
					<DialogActions>
						<Button
							onClick={handleClose}
							variant="outlined"
							color="primary"
							disabled={loading}
							className="flex flex-1 ml-2"
						>
							{t('d_button_cancel')}
						</Button>
						<Button
							onClick={handleSubmit}
							variant="outlined"
							disabled={loading}
							style={{
								color: '#f44336',
								border: '1px solid currentColor'
							}}
							className="flex flex-1 mr-2"
						>
							{t('m_delete')}
						</Button>
					</DialogActions>
				)}
			</DialogContent>
		</Dialog>
	);
};

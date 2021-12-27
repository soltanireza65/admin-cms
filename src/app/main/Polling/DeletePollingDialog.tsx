import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, IconButton, LinearProgress } from '@material-ui/core';
import { closeDeletePollingDialog, deletePolling, setDeleteDialogOpen } from './store/pollingSlice';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const DeletePollingDialog = () => {
	const { pollingId, isOpen, loading } = useSelector(({ pollingApp }: any) => pollingApp.polling.deletePollingDialog);

	const { t } = useTranslation('PollingApp');

	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deletePolling({ id: pollingId }));
	};

	return (
		<Dialog
			// open={isOpen}
			open={isOpen}
			onClose={() => {
				// dispatch(setDeleteDialogOpen(false))
				dispatch(closeDeletePollingDialog());
			}}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			className="px-20 py-10"
		>
			<AppBar position="static">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{t('delete_poll')}
					</Typography>
				</Toolbar>
			</AppBar>
			<DialogContent>
				<DialogContentText id="alert-dialog-description" className="my-40 mx-32">
					{t('confirm')}?
				</DialogContentText>
				<DialogActions>
					<Button
						onClick={handleDelete}
						color="primary"
						className="flex flex-1 ml-2"
						variant="outlined"
						disabled={loading}
					>
						{t('yes')}
					</Button>
					<Button
						onClick={() => {
							dispatch(closeDeletePollingDialog());
						}}
						color="secondary"
						autoFocus
						className="flex flex-1 mr-2"
						variant="outlined"
					>
						{t('no')}
					</Button>
				</DialogActions>
				{loading && (
					<div className="mt-2 mb-12">
						<LinearProgress color="secondary" />
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default DeletePollingDialog;

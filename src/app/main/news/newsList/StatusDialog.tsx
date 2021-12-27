import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Transition from '../../shared-components/Transition';
import { useSelector, useDispatch } from 'react-redux';
import { IStatusState } from '../interfaces/states';
import { deleteNews, closeDeleteDialog } from '../store/statusSlice';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { DialogActions, CircularProgress, AppBar, Typography, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2)
		}
	},
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
	const statusDialog = useSelector(({ newsApp }: any) => newsApp.statusDialog);
	const { titr, id, loading, status, titleStatus }: IStatusState = statusDialog;
	const handleClose = () => {
		dispatch(closeDeleteDialog({}));
	};
	const handleSubmit = () => {
		dispatch(deleteNews({ titr, id }));
	};
	return (
		<Dialog
			{...statusDialog.statusDialog.props}
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
						تغییر وضعیت
					</Typography>
				</Toolbar>
			</AppBar>
			<DialogContent className="px-20 py-10">
				<div className="text-18 my-40">
					{
						<div>
							آیا از تغییر وضعیت خبر " {titr} " به
							<span style={{ color: '#f44336', fontWeight: 'bold' }}> {titleStatus} </span>
							مطمئن هستید؟
						</div>
					}
				</div>
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
							بازگشت
						</Button>
						<Button
							onClick={handleSubmit}
							variant="outlined"
							disabled={loading}
							className="flex flex-1 mr-2"
							style={{
								color: '#f44336',
								border: '1px solid currentColor'
							}}
						>
							حذف
						</Button>
					</DialogActions>
				)}
			</DialogContent>
		</Dialog>
	);
};

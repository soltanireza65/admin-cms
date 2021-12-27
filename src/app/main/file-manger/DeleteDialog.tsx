import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Transition from '../shared-components/Transition';
import { useSelector, useDispatch } from 'react-redux';
import { IDeleteState } from './interfaces/states';
import { deleteMediaFile, closeDeleteDialog, openDeleteDialog } from './store/deleteSlice';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

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
	const deleteDialogStore = useSelector(({ fuse }: any) => fuse.fileManagerApp.deleteStore);
	const { title, id, loading }: IDeleteState = deleteDialogStore;
	const handleClose = () => {
		dispatch(closeDeleteDialog({}));
	};
	const handleSubmit = () => {
		dispatch(deleteMediaFile({ id, caption: title }));
	};
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
			<DialogContent>
				<div className="text-18 mb-10 mt-5">
					<div>
						آیا از<span style={{ color: '#f44336', fontWeight: 'bold' }}>حذف</span> فایل "{title}" مطمئن
						هستید؟
					</div>
				</div>
				<div className="flex mb-2 justify-content-center">
					<Button
						onClick={handleClose}
						variant="contained"
						color="primary"
						disabled={loading}
						size="small"
						className="flex flex-1 ml-2"
					>
						بازگشت
					</Button>
					<Button
						onClick={handleSubmit}
						size="small"
						variant="contained"
						disabled={loading}
						style={{
							backgroundColor: '#f44336'
						}}
						className="flex flex-1 mr-2"
					>
						حذف
					</Button>
					{loading && (
						<div className={classes.root}>
							<LinearProgress color="secondary" />
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

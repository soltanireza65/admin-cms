import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Transition from '../shared-components/Transition';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment, openStateDeleteDialog } from './store/commentSlice';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { AppBar, Toolbar, Typography, CircularProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

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
	const commentsDialog = useSelector(({ commentsApp }: any) => commentsApp.comment.deleteDialog);
	const { currentComment } = commentsDialog;
	const { t } = useTranslation('commentsApp');
	const handleClose = () => {
		dispatch(openStateDeleteDialog(null, false));
	};
	const handleSubmit = () => {
		dispatch(deleteComment({ id: currentComment.id, content: currentComment?.content }));
	};
	return (
		<Dialog
			{...commentsDialog?.props}
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
						{t('delete_comment')}
					</Typography>
				</Toolbar>
			</AppBar>
			<DialogContent className="px-20 py-10">
				<div className="text-18 my-40">
					<div>
						{t('question')}
						<span style={{ color: '#f44336', fontWeight: 'bold' }}> {t('deleting')} </span>
						{t('comment')} "{currentComment?.content}"{t('confrim')} ?
					</div>
				</div>
				{commentsDialog?.loadingOne ? (
					<div className="text-center mb-8">
						<CircularProgress />
					</div>
				) : (
					<div className="flex mb-2 justify-content-center">
						<Button
							onClick={handleClose}
							variant="outlined"
							color="primary"
							disabled={commentsDialog?.loadingOne}
							size="small"
							className="flex flex-1 mx-2"
						>
							{t('cancel_button')}
						</Button>
						<Button
							onClick={handleSubmit}
							size="small"
							variant="outlined"
							disabled={commentsDialog?.loadingOne}
							style={{
								color: '#f44336',
								border: '1px solid currentColor'
							}}
							className="flex flex-1 mx-2"
						>
							{t('delete_button')}
						</Button>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

import { useForm } from '@fuse/hooks';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import HtmlTooltip from '../shared-components/HtmlTooltip';
import { useDispatch, useSelector } from 'react-redux';
import { adminReplayComment, openStateCommentDialog, editComment } from './store/commentSlice';
import { ICommentDialog } from './interfaces/props';
const initialValues: CommentAPIInterface.IBody = {
	content: '',
	parentId: '',
	contentId: '',
	moduleType: 1,
	fullName: 'ادمین',
	email: '',
	showEmail: false,
	status: 1
};
function CategoryDialog() {
	const dispatch = useDispatch();
	const { form, handleChange, resetForm, setForm } = useForm<CommentAPIInterface.IBody>(initialValues);
	const commentsDialog = useSelector(({ commentsApp }: any) => commentsApp.comment.commentDialog);

	const [contentRequired, setContentRequired] = useState<boolean>(false);
	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (commentsDialog?.currentComment) {
			if (commentsDialog.type === 'replay') {
				form.parentId = commentsDialog.currentComment.id;
			}
			if (commentsDialog.type === 'edit') {
				setForm({ ...commentsDialog.currentComment });
			}
			form.contentId = commentsDialog.currentComment.contentId;
		}
	}, [commentsDialog.currentComment, commentsDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (commentsDialog.props.open) {
			initDialog();
		}
	}, [commentsDialog.props.open, initDialog]);
	const { t } = useTranslation('commentsApp');

	const handleChangeText = e => {
		handleChange(e);
		if (form.content?.length > 0) {
			setContentRequired(false);
		}
	};
	const handleSubmit = () => {
		if (form.content?.length > 0) {
			if (commentsDialog.type === 'edit') dispatch(editComment({ ...form }));

			if (commentsDialog.type === 'replay') dispatch(adminReplayComment({ ...form }));
		} else {
			setContentRequired(true);
		}
	};
	const handleCloseDialog = () => {
		dispatch(openStateCommentDialog(null, false, ''));
	};
	return (
		<div className="p-24">
			<Dialog
				{...commentsDialog.props}
				aria-labelledby="form-dialog-title"
				onClose={handleCloseDialog}
				classes={{
					root: 'max-h-150 h-100',
					paper: 'rounded-8 '
				}}
			>
				<AppBar position="static">
					<Toolbar className="flex w-full">
						<Typography variant="subtitle1" color="inherit">
							{t('c_dialog_form_title')}
						</Typography>
					</Toolbar>
				</AppBar>

				<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
					{commentsDialog.type == 'replay' && (
						<TextField
							className="mt-8 mb-16"
							label={t('dialog_comment')}
							name="comment"
							value={commentsDialog?.currentComment?.content}
							variant="outlined"
							fullWidth
							multiline
							required
							InputProps={{
								readOnly: true
							}}
						/>
					)}
					<TextField
						className="mt-8 mb-16"
						label={commentsDialog.type == 'replay' ? t('dialog_content') : t('dialog_comment')}
						name="content"
						value={form.content}
						error={contentRequired}
						helperText={t('error_text')}
						onChange={handleChangeText}
						variant="outlined"
						fullWidth
						multiline
						required
						InputProps={{
							readOnly: false
						}}
					/>
				</DialogContent>

				<DialogActions className="justify-between p-8">
					<div className="flex justify-between w-full px-16">
						<Button
							variant="outlined"
							className="w-1/3 flex flex-1 mr-2"
							color="primary"
							onClick={handleSubmit}
							disabled={commentsDialog?.loadingOne}
						>
							{t('save_button')}
						</Button>
						<Button
							variant="outlined"
							className="w-1/3 flex flex-1 mr-2"
							color="secondary"
							onClick={handleCloseDialog}
							disabled={commentsDialog?.loadingOne}
						>
							{t('cancel_button')}
						</Button>
					</div>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default CategoryDialog;

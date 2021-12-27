import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import FileManagerContainer from './FileManagerContainer';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { useTranslation } from 'react-i18next';
import { setDialogState, getMediaFiles } from './store/fileManagerSlice';
import { useDispatch, useSelector } from 'react-redux';

export default () => {
	const dispatch = useDispatch();

	const dialogState = useSelector(({ fuse }: any) => fuse.fileManagerApp.fileManager.dialogState);
	const fileManager = useSelector(({ fuse }: any) => fuse.fileManagerApp.fileManager);
	useEffect(() => {
		dispatch(getMediaFiles({ FileType: fileManager.mediaType }));
	}, [fileManager.mediaType]);
	const handleClose = () => {
		dispatch(setDialogState(false, 0, 0));
	};
	return (
		<Dialog open={dialogState} fullScreen onClose={handleClose}>
			<FileManagerContainer />
		</Dialog>
	);
};

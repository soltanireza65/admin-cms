import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import FileManagerContainer from './FileManagerContainer';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { useTranslation } from 'react-i18next';
import { setDialogState, getMediaFiles } from './store/fileManagerSlice';
import { useDispatch, useSelector } from 'react-redux';
import FileDialogComponent from './FileManagerDialog';
import { IFileManagerApp } from 'app/interfaces/fileManager';
interface IProps {
	mediaType: IFileManagerApp.mediaType;
}
export default ({ mediaType }: IProps) => {
	const dispatch = useDispatch();
	const handleOpen = () => {
		dispatch(setDialogState(true, mediaType, 0));
	};

	const { t } = useTranslation('fileManagerApp');
	return (
		<div className="p-24">
			<Tooltip title={t('open_album')}>
				<Fab
					color="secondary"
					aria-label={t('open_album')}
					onClick={handleOpen}
					className="reletive bottom-0 rtl:left-0 ltr:right-0 mx-16 -mb-28 z-999"
				>
					<Icon>add</Icon>
				</Fab>
			</Tooltip>
			<FileDialogComponent />
		</div>
	);
};

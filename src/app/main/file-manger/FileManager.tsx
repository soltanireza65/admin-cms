import React, { useEffect } from 'react';
import FileManagerContainer from './FileManagerContainer';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import { getMediaFiles } from './store/fileManagerSlice';
import { useDispatch, useSelector } from 'react-redux';
import DeleteDialog from './DeleteDialog';
const FileManager = () => {
	const dispatch = useDispatch();
	const fileManager = useSelector(({ fuse }: any) => fuse.fileManagerApp.fileManager);
	useEffect(() => {
		dispatch(getMediaFiles({ FileType: fileManager.mediaType, count: 15 }));
	}, [fileManager.mediaType]);

	return (
		<>
			<FileManagerContainer></FileManagerContainer>
			<DeleteDialog />
		</>
	);
};

export default FileManager;

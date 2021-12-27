import React, { useState, useEffect } from 'react';
import {
	DialogStyled,
	BrowseButton,
	FilesSection,
	SideBarBrowser,
	UploadIcon,
	ButtonAddSubFile,
	ActionsButtons
} from './styleDesign';
import LinerProgressBox from './LinerProgressBox';
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeNewDialog, uploadFile, setUploadFile } from 'app/store/fuse/uploadSlice';
import FileItem from './FileItem';
import _ from '@lodash';
import styles from './Uploader.module.css';

export default () => {
	const dispatch = useDispatch();

	const upload = useSelector(({ fuse }: any) => fuse.upload);

	const [totalProgress, setTotalProgress] = useState(0);
	const fileuploader = React.useRef(null);
	function handleCloseDialog() {
		dispatch(closeNewDialog({}));
	}
	useEffect(() => {
		if (upload.fileProgress.length === 0) {
			return;
		}
		let tempP = 0;
		upload.fileProgress.map(item => (tempP += item.progress));
		setTotalProgress(Math.floor(tempP / upload.fileProgress.length));
	}, [upload.fileProgress]);
	const startUpload = () => {
		const fileToUpload = upload.fileProgress.filter(file => file.progress === 0);
		fileToUpload.forEach(item => {
			dispatch(uploadFile(item));
		});
	};
	const handleAttachFIle = e => {
		dispatch(setUploadFile(e.target.files));
		e.target.value = ''; // to clear the current file
	};
	return (
		<>
			<Modal {...upload.uploadDialog.props} onClose={handleCloseDialog}>
				<DialogStyled>
					<SideBarBrowser>
						{/* <UploadIcon>
							<img src="assets/images/upload.svg" />
						</UploadIcon>
						<p>فایل(ها) را اینجا بکشید</p>
						<span>یا</span> */}
						<BrowseButton style={{ cursor: 'pointer' }} onClick={() => fileuploader.current.click()}>
							<UploadIcon>
								<img src="assets/images/upload.svg" />
							</UploadIcon>
							<input
								id="file"
								ref={fileuploader}
								type="file"
								multiple
								style={{ display: 'none' }}
								onChange={handleAttachFIle}
							/>
						</BrowseButton>
						<ActionsButtons>
							{totalProgress > 0 ? (
								<LinerProgressBox
									style={{ backgroundColor: 'red' }}
									variant="determinate"
									value={totalProgress}
								/>
							) : (
								<div className={styles.uploadButton} onClick={startUpload}>
									بارگذاری
								</div>
							)}
							<div className={styles.cancelButton} onClick={handleCloseDialog}>
								لغو
							</div>
						</ActionsButtons>
					</SideBarBrowser>
					<FilesSection>
						{upload &&
							upload.fileProgress &&
							upload.fileProgress.length > 0 &&
							upload.fileProgress.map((item, index) => <FileItem key={index} {...item} />)}
					</FilesSection>
					{/* <ActionsButtons>
						{totalProgress > 0 ? (
							<LinerProgressBox variant="determinate" value={totalProgress} />
						) : (
							<ButtonAddSubFile onClick={startUpload}>بارگذاری</ButtonAddSubFile>
						)}
						<ButtonAddSubFile onClick={handleCloseDialog}>لغو</ButtonAddSubFile>
					</ActionsButtons> */}
				</DialogStyled>
			</Modal>
		</>
	);
};

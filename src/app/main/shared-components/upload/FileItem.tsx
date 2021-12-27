import React, { useState } from 'react';
import { FileItemDiv, UploadIcon, FileItem, SubDiv, ButtonAddSubFile } from './styleDesign';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ArrowUp from '@material-ui/icons/KeyboardArrowUp';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { IFile } from 'app/store/fuse/interfaces/states';
import _ from '@lodash';
import { deleteUploadFile, deleteSubUploadFile, setSubUploadFile } from 'app/store/fuse/uploadSlice';
import { useDispatch } from 'react-redux';
import LinerProgressBox from './LinerProgressBox';

export default ({ id, caption, files, progress }: IFile) => {
	const dispatch = useDispatch();
	const [expanded, setExpanded] = useState<boolean>(false);

	const fileUploader = React.useRef(null);
	const handleExpanded = () => {
		setExpanded(!expanded);
	};
	const deleteParentFile = (id: number) => {
		dispatch(deleteUploadFile(id));
	};
	const deleteSubFile = (idparent: number, id: number) => {
		dispatch(deleteSubUploadFile(idparent, id));
	};
	const handleAttachFIle = e => {
		dispatch(setSubUploadFile({ id, files: e.target.files, caption }));
		e.target.value = ''; // to clear the current file
	};
	return (
		<>
			<FileItem>
				<FileItemDiv>
					<img src="assets/images/document.svg" />
					<label>{caption}</label>
					<br />
					<LinerProgressBox variant="determinate" value={progress} />
				</FileItemDiv>
				<CardActions>
					<IconButton onClick={x => deleteParentFile(id)}>
						<DeleteForever />
					</IconButton>
					<IconButton onClick={handleExpanded}>{expanded == true ? <ArrowUp /> : <ArrowDown />}</IconButton>
				</CardActions>
			</FileItem>
			{expanded && (
				<CardContent>
					<SubDiv>
						<input
							type="file"
							id="file"
							ref={fileUploader}
							multiple
							style={{ display: 'none' }}
							onChange={handleAttachFIle}
						/>

						<ButtonAddSubFile
							onClick={() => {
								fileUploader.current.click();
							}}
						>
							افزودن فایل جدید
						</ButtonAddSubFile>
						{files &&
							files.length > 0 &&
							files.map((item, index) => {
								return (
									<FileItem key={index}>
										<FileItemDiv>
											<img src="assets/images/document.svg" />
											<label>{item.caption} </label>
										</FileItemDiv>
										<CardActions>
											<IconButton onClick={x => deleteSubFile(id, item.id)}>
												<DeleteForever />
											</IconButton>
										</CardActions>
									</FileItem>
								);
							})}
					</SubDiv>
				</CardContent>
			)}
		</>
	);
};

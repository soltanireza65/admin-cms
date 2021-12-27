import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import { useDispatch, useSelector } from 'react-redux';
import Transition from '../Transition';

import { addCropData, dialogCropState } from 'app/store/fuse/albumSlice';
const CropDialog = () => {
	const dispatch = useDispatch();
	const imgRef = useRef(null);
	const [crop, setCrop] = useState<Crop>({ unit: 'px', width: 30, height: 20 });
	const [completedCrop, setCompletedCrop] = useState<Crop>(null);
	const cropDialog = useSelector(({ fuse }: any) => fuse.album.dialogCrop);
	const onLoad = useCallback(img => {
		imgRef.current = img;
	}, []);
	// const locationsFormImage = useSelector(({ newsApp }: any) => newsApp.locationsForm.image);

	// useEffect(() => {
	// 	setCrop({ unit: 'px', width: 30, height: 30, aspect: cropDialog.locationWidth / cropDialog.locationHeight });
	// }, [locationsFormImage]);

	const handleClose = () => {
		dispatch(dialogCropState('', '', false));
	};
	const handleSubmit = () => {
		dispatch(addCropData(completedCrop, cropDialog.id));
		handleClose();
	};
	return (
		<Dialog
			{...cropDialog.props}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
			className="rtl"
		>
			<DialogContent>
				<ReactCrop
					src={cropDialog?.url}
					onImageLoaded={onLoad}
					crop={crop}
					onChange={c => setCrop(c)}
					onComplete={c => setCompletedCrop(c)}
				/>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleClose}
					variant="contained"
					color="primary"
					size="small"
					className="flex flex-1 ml-2"
				>
					بازگشت
				</Button>
				<Button
					onClick={handleSubmit}
					size="small"
					variant="contained"
					style={{
						backgroundColor: '#f44336'
					}}
					className="flex flex-1 mr-2"
				>
					ذخیره
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CropDialog;

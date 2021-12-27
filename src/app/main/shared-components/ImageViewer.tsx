import React from 'react';
import Modal from '@material-ui/core/Modal';

export default (src: string, open: boolean) => {
	const [openModal, setOpen] = React.useState(open);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Modal
			open={openModal}
			onClose={handleClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
		>
			{<img src={src}></img>}
		</Modal>
	);
};

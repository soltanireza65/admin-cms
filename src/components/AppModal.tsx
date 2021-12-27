import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

const AppModal = ({ children }) => {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<Tooltip title="title">
				<Fab
					color="secondary"
					aria-label="title"
					onClick={() => setOpen(true)}
					className="absolute bottom-0 ltr:left-0 rtl:right-0 mx-16 -mb-28 z-999"
				>
					<Icon>add</Icon>
				</Fab>
			</Tooltip>

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div className="flex justify-center bg-white items-center my-auto">{children}</div>
			</Modal>
		</div>
	);
};
export default AppModal;

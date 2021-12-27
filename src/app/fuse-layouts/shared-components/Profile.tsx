import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setDefaultSettings } from 'app/store/fuse/settingsSlice';
import PersonIcon from '@material-ui/icons/Person';

function Profile(props) {
	const dispatch = useDispatch();

	const theme = useTheme();
	const { i18n } = useTranslation();
	const [menu, setMenu] = useState(null);

	const profileMenuClick = event => {
		setMenu(event.currentTarget);
	};

	const profileMenuClose = () => {
		setMenu(null);
	};

	return (
		<>
			<Button className="h-40 w-64" onClick={profileMenuClick}>
				<PersonIcon />
			</Button>

			<Popover
				open={Boolean(menu)}
				anchorEl={menu}
				onClose={profileMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				classes={{
					paper: 'py-8'
				}}
			>
				<div className="p-12">لیست سرویس ها</div>
			</Popover>
		</>
	);
}

export default Profile;

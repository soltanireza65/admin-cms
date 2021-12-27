import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { red, green, grey } from '@material-ui/core/colors';
import { useTranslation } from 'react-i18next';
import { openDeleteDialog } from './store/deleteSlice';
function MenuFileItem({ id, caption }: IFileManager.IFile) {
	const dispatch = useDispatch();

	const [anchorEl, setAnchorEl] = useState(null);

	const { t } = useTranslation('fileManagerApp');
	function openMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function closeMenu() {
		setAnchorEl(null);
	}
	const deleteFile = () => {
		dispatch(openDeleteDialog({ id, title: caption }));
	};
	return (
		<>
			<IconButton
				className="p-0"
				aria-owns={anchorEl ? 'selectedContactsMenu' : null}
				aria-haspopup="true"
				onClick={openMenu}
			>
				<Icon>more_vert</Icon>
			</IconButton>
			<Menu id="selectedContactsMenu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
				<MenuList>
					<MenuItem
						onClick={() => {
							closeMenu();
							deleteFile();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon style={{ color: red[500] }}>delete</Icon>
						</ListItemIcon>
						<ListItemText primary={t('delete_title')} />
					</MenuItem>
					<MenuItem
						onClick={() => {
							closeMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon style={{ color: green[300] }}>edit</Icon>
						</ListItemIcon>
						<ListItemText primary={t('update_title')} />
					</MenuItem>
				</MenuList>
			</Menu>
		</>
	);
}

export default MenuFileItem;

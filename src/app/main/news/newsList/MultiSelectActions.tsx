import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IMultiSelectActionsProps } from '../interfaces/props';
import { openDeleteDialog } from '../store/statusSlice';
export default ({ selectedNews }: IMultiSelectActionsProps) => {
	const dispatch = useDispatch();

	const [anchorEl, setAnchorEl] = useState(null);

	function openSelectedContactMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function closeSelectedContactsMenu() {
		setAnchorEl(null);
	}
	const handleAction = index => {
		let newsList = [];
		selectedNews.map(item => newsList.push({ id: item.id, titr: item.titr }));
		// dispatch(openDeleteDialog({ id, titr, status: 5, titleStatus: 'حذف شده' }));
	};

	return (
		<>
			<IconButton
				className="p-0"
				aria-owns={anchorEl ? 'selectedContactsMenu' : null}
				aria-haspopup="true"
				onClick={openSelectedContactMenu}
			>
				<Icon>more_horiz</Icon>
			</IconButton>
			<Menu
				id="selectedContactsMenu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={closeSelectedContactsMenu}
			>
				<MenuList>
					<MenuItem
						onClick={() => {
							closeSelectedContactsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>star</Icon>
						</ListItemIcon>
						<ListItemText primary="تبدیل به انتشار یافته" />
					</MenuItem>
					{/* <MenuItem
						onClick={() => {
							closeSelectedContactsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>folder</Icon>
						</ListItemIcon>
						<ListItemText primary="افزودن به پرونده" />
					</MenuItem> */}
					<MenuItem
						onClick={() => {
							// handleSuspendNews();
							closeSelectedContactsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>puase</Icon>
						</ListItemIcon>
						<ListItemText primary="تعلیق" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							// handleDeleteItems();
							closeSelectedContactsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>delete</Icon>
						</ListItemIcon>
						<ListItemText primary="حذف" />
					</MenuItem>
				</MenuList>
			</Menu>
		</>
	);
};

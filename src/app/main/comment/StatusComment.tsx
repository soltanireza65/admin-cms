import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useTranslation } from 'react-i18next';
import { changeStatus } from './store/commentSlice';
import { useDispatch } from 'react-redux';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckCircle from '@material-ui/icons/CheckCircle';
import HourglassFull from '@material-ui/icons/HourglassFull';
import Block from '@material-ui/icons/Block';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%'
	}
}));

const options = [
	{ title: 'status_active', checkedcolor: '#4caf50', status: 2, icon: <CheckCircle /> },
	{ title: 'status_suspend', checkedcolor: '#64b5f6', status: 3, icon: <HourglassFull /> },
	{ title: 'status_disable', checkedcolor: '#f44336', status: 1, icon: <Block /> }
];

export default function SimpleListMenu({ id, status }) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedItem, setSelectedItem] = React.useState(options.find(x => x.status == status));
	const dispatch = useDispatch();
	const { t } = useTranslation('commentsApp');

	const handleClickListItem = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index) => {
		console.log(index);
		dispatch(changeStatus({ id, status: index }));
		setSelectedItem(options.find(x => x.status == index));
		setAnchorEl(null);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.root}>
			<List
				component="nav"
				style={{
					width: '100%'
				}}
				onClick={handleClickListItem}
			>
				{selectedItem ? (
					<MenuItem
						key={selectedItem.title}
						style={{
							width: '100%',

							borderRadius: '999px',
							justifyContent: 'center',

							background: selectedItem.checkedcolor,
							color: '#fff'
						}}
					>
						{t(selectedItem.title)}
					</MenuItem>
				) : (
					<MenuItem
						key={'status_undefiend'}
						style={{
							width: '100%',

							borderRadius: '999px',
							justifyContent: 'center',

							background: '#000',
							color: '#FFF'
						}}
					>
						{t('status_undefiend')}
					</MenuItem>
				)}
			</List>
			<Menu
				id="lock-menu"
				anchorEl={anchorEl}
				keepMounted
				style={{
					width: '100%',
					borderRadius: '14px',
					margin: 0,
					padding: 0
				}}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{options.map((option, index) => (
					<MenuItem
						key={index}
						style={{
							color: '#000000'
						}}
						onClick={event => handleMenuItemClick(event, option.status)}
					>
						<ListItemText primary={t(option.title)} />
						<ListItemIcon className="flex justify-end">{option.icon}</ListItemIcon>
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}

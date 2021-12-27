import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setDialogState } from './store/favoriteSlice';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
const useStyles = makeStyles(theme => ({
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		width: '100%',
		paddingLeft: 24,
		paddingRight: 12,

		'& .list-item-icon': {
			fontSize: 16,
			width: 16,
			height: 16,
			marginRight: 16
		}
	},
	selected: {
		backgroundColor: `${theme.palette.secondary.light} !important`,
		color: `${theme.palette.secondary.contrastText} !important`,
		pointerEvents: 'none',
		'& .list-item-icon': {
			color: 'inherit'
		}
	},
	listSubheader: {
		paddingLeft: 24
	}
}));
export default props => {
	const dispatch = useDispatch();
	const { t } = useTranslation('categoryApp');

	const handleOpen = () => {
		dispatch(setDialogState(true));
	};

	return (
		<>
			<FuseAnimate animation="transition.slideUpIn" delay={400}>
				<div className="flex-auto border-l-1 border-solid">
					<div className="p-24">
						<Button onClick={handleOpen} variant="contained" color="primary" className="w-full">
							{t('add_favorite')}
						</Button>
					</div>
				</div>
			</FuseAnimate>
		</>
	);
};

import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setStatusFilter, getAdvertisesList, dialogOpenState } from './store/advertiesSlice';
import clsx from 'clsx';
import { Button } from '@material-ui/core';
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
	const { t } = useTranslation('advertiesApp');

	const statusData = useSelector(({ advertiesApp }: any) => advertiesApp.adverties.status);
	const classes = useStyles(props);
	const handleUpdateStatus = (index: number) => {
		dispatch(setStatusFilter(index));
		dispatch(getAdvertisesList({ status: index }));
	};

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={400}>
			<div className="flex-auto border-l-1 border-solid">
				<div className="p-24">
					<Button
						onClick={() => {
							dispatch(dialogOpenState(null, true, 'new'));
						}}
						variant="contained"
						color="primary"
						className="w-full"
					>
						{t('new_advertise')}
					</Button>
				</div>

				<div>
					<List>
						<ListSubheader className={classes.listSubheader} disableSticky>
							{t('sidebar_service_type')}
						</ListSubheader>
						<ListItem
							button
							onClick={() => handleUpdateStatus(2)}
							selected={statusData === 2 ? true : false}
							className={clsx(classes.listItem, statusData === 2 && classes.selected)}
						>
							<Icon className="list-item-icon" color="action">
								call_to_action
							</Icon>
							<ListItemText primary={t('sidebar_filters_active')} disableTypography />
						</ListItem>

						<ListItem
							button
							onClick={() => handleUpdateStatus(1)}
							selected={statusData === 1 ? true : false}
							className={clsx(classes.listItem, statusData === 1 && classes.selected)}
						>
							<Icon className="list-item-icon" color="action">
								desktop_access_disabled
							</Icon>
							<ListItemText primary={t('sidebar_filters_disable')} disableTypography />
						</ListItem>
					</List>
				</div>
			</div>
		</FuseAnimate>
	);
};

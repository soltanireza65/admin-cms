import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddPollingDialog from './PollingDialog';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getPollings } from './store/pollingSlice';
import BlockIcon from '@material-ui/icons/Block';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
// import FilterDialog from './FilterDialog';
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

	const { t } = useTranslation('PollingApp');
	const [statusData, setStatusData] = useState(0);
	const classes = useStyles(props);

	// 1 => deactive 2 => active 3 => all
	const handleUpdateStatus = (status: 1 | 2 | 0) => {
		dispatch(getPollings({ status }));
		setStatusData(status);
	};

	return (
		<>
			<FuseAnimate animation="transition.slideUpIn" delay={400}>
				<div className="flex-auto border-l-1 border-solid">
					<div>
						<List>
							<ListSubheader className={classes.listSubheader} disableSticky>
								{t('pollings_status')}
							</ListSubheader>
							<ListItem
								button
								onClick={() => handleUpdateStatus(0)}
								selected={statusData === 0 ? true : false}
							>
								<CheckCircleOutlineIcon />
								<ListItemText primary={t('all')} disableTypography />
							</ListItem>
							<ListItem
								button
								onClick={() => handleUpdateStatus(2)}
								selected={statusData === 2 ? true : false}
							>
								<CheckCircleOutlineIcon />
								<ListItemText primary={t('active')} disableTypography />
							</ListItem>
							<ListItem
								button
								onClick={() => handleUpdateStatus(1)}
								selected={statusData === 1 ? true : false}
							>
								<BlockIcon />

								<ListItemText primary={t('disable')} disableTypography />
							</ListItem>
						</List>
					</div>
				</div>
			</FuseAnimate>
		</>
	);
};

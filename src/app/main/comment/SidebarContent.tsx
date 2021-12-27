import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getComments } from './store/commentSlice';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import FilterDialog from './FilterDialog';
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
	const { t } = useTranslation('commentsApp');

	const statusData = useSelector(({ commentsApp }: any) => commentsApp.comment.status);

	const classes = useStyles(props);

	const [open, setOpen] = useState<boolean>(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleUpdateStatus = (index: 0 | 1 | 2 | 3) => {
		dispatch(getComments({ status: index }));
	};

	return (
		<>
			<FuseAnimate animation="transition.slideUpIn" delay={400}>
				<div className="flex-auto border-l-1 border-solid">
					<div className="p-24">
						<Button
							onClick={() => {
								setOpen(true);
							}}
							variant="contained"
							color="primary"
							className="w-full"
						>
							{t('filter_title')}
						</Button>
					</div>
					<div>
						<List>
							<ListSubheader className={classes.listSubheader} disableSticky>
								{t('sidebar_service_type')}
							</ListSubheader>
							<ListItem
								button
								onClick={() => handleUpdateStatus(0)}
								selected={statusData === 0 ? true : false}
								className={clsx(classes.listItem, statusData === 0 && classes.selected)}
							>
								<Icon className="list-item-icon" color="action">
									all_inbox
								</Icon>
								<ListItemText primary={t('sidebar_filters_all')} disableTypography />
							</ListItem>
							<ListItem
								button
								onClick={() => handleUpdateStatus(2)}
								selected={statusData === 2 ? true : false}
								className={clsx(classes.listItem, statusData === 2 && classes.selected)}
							>
								<Icon className="list-item-icon" color="action">
									check_circle_outline
								</Icon>
								<ListItemText primary={t('sidebar_filters_active')} disableTypography />
							</ListItem>

							<ListItem
								button
								onClick={() => handleUpdateStatus(3)}
								selected={statusData === 3 ? true : false}
								className={clsx(classes.listItem, statusData === 3 && classes.selected)}
							>
								<Icon className="list-item-icon" color="action">
									remove_circle_outline
								</Icon>
								<ListItemText primary={t('sidebar_filters_suspend')} disableTypography />
							</ListItem>

							<ListItem
								button
								onClick={() => handleUpdateStatus(1)}
								selected={statusData === 1 ? true : false}
								className={clsx(classes.listItem, statusData === 1 && classes.selected)}
							>
								<Icon className="list-item-icon" color="action">
									stop_screen_share
								</Icon>
								<ListItemText primary={t('sidebar_filters_disabled')} disableTypography />
							</ListItem>
						</List>
					</div>
				</div>
			</FuseAnimate>
			<FilterDialog open={open} handleClose={handleClose} />
		</>
	);
};

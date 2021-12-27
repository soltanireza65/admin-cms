import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { setStatus, manageNews } from '../store/newsSlice';
import DefaultCategory from '../../shared-components/category/DefaultCategory';
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
	const { t } = useTranslation('newsApp');
	const [selectedAccount, setSelectedAccount] = React.useState(null);

	const statusData = useSelector(({ newsApp }: any) => newsApp.news.status);
	const classes = useStyles(props);
	const [menu, setMenu] = React.useState(null);

	const MenuClick = event => {
		setMenu(event.currentTarget);
	};

	const MenuClose = () => {
		setMenu(null);
	};
	const handleUpdateStatus = (index: number) => {
		dispatch(setStatus(index));
		dispatch(manageNews({ status: index }));
	};
	const handleChangeCategory = e => {
		if (e.target.value) dispatch(manageNews({ defaultCategoriesID: e.target.value }));
		else {
			dispatch(manageNews({}));
		}
	};

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={400}>
			<div className="flex-auto border-l-1 border-solid">
				<div>
					<List>
						<ListSubheader className={classes.listSubheader} disableSticky>
							{t('sidebar_service_type')}
						</ListSubheader>
						<ListItem
							button
							onClick={() => handleUpdateStatus(1)}
							selected={statusData === 1 ? true : false}
							className={clsx(classes.listItem, statusData === 1 && classes.selected)}
						>
							<Icon className="list-item-icon" color="action">
								drafts
							</Icon>
							<ListItemText primary={t('sidebar_filters_draft')} disableTypography />
						</ListItem>

						<ListItem
							button
							onClick={() => handleUpdateStatus(2)}
							selected={statusData === 2 ? true : false}
							className={clsx(classes.listItem, statusData === 2 && classes.selected)}
						>
							<Icon className="list-item-icon" color="action">
								flag
							</Icon>
							<ListItemText primary={t('sidebar_filters_ReadyToPublish')} disableTypography />
						</ListItem>

						<ListItem
							button
							onClick={() => handleUpdateStatus(3)}
							selected={statusData === 3 ? true : false}
							className={clsx(classes.listItem, statusData === 3 && classes.selected)}
						>
							<Icon className="list-item-icon" color="action">
								publish
							</Icon>
							<ListItemText primary={t('sidebar_filters_published')} disableTypography />
						</ListItem>

						<ListItem
							button
							onClick={() => handleUpdateStatus(5)}
							selected={statusData === 5 ? true : false}
							className={clsx(classes.listItem, statusData === 5 && classes.selected)}
						>
							<Icon className="list-item-icon" color="action">
								delete
							</Icon>
							<ListItemText primary={t('sidebar_filters_deleted')} disableTypography />
						</ListItem>
						<ListItem
							button
							onClick={() => handleUpdateStatus(4)}
							selected={statusData === 4 ? true : false}
							className={clsx(classes.listItem, statusData === 4 && classes.selected)}
						>
							<Icon className="list-item-icon" color="action">
								block
							</Icon>
							<ListItemText primary={t('sidebar_filters_suspend')} disableTypography />
						</ListItem>
					</List>
					<List>
						<ListItem className={clsx(classes.listItem)}>
							<DefaultCategory
								handleChange={handleChangeCategory}
								multiSelect={false}
								showLabel={false}
							/>
						</ListItem>
					</List>
				</div>
			</div>
		</FuseAnimate>
	);
};

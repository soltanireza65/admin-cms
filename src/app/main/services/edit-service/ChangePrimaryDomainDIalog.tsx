import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Transition from '../../shared-components/Transition';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { DialogActions, AppBar, Typography, Toolbar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { changePrimaryDomain, closeChangeDomainDialog } from '../store/servicesSlice';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2)
		}
	},
	fabProgress: {
		color: green[500]
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#000'
	}
}));
export default function ChangePrimaryDomainDialog() {
	const classes = useStyles();
	const { t } = useTranslation('servicesApp');
	const dispatch = useDispatch();
	const { isOpen, portalId, domain, loading } = useSelector(
		({ servicesApp }: any) => servicesApp.services.changeDomainDialog
	);
	const handleClose = () => {
		dispatch(closeChangeDomainDialog());
	};
	const handleSubmit = () => {
		dispatch(changePrimaryDomain({ domain, portalId }));
	};
	return (
		<Dialog
			open={isOpen}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
			className="rtl"
		>
			<AppBar position="static">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{t('change_primary_domain')}
					</Typography>
				</Toolbar>
			</AppBar>
			<DialogContent className="px-20 py-10">
				<div className="text-18 my-40">
					<div>{t('confirm_change_domain', { domain })}</div>
				</div>
				<DialogActions className="px-0">
					<Button
						onClick={handleClose}
						variant="outlined"
						color="secondary"
						disabled={loading}
						className="flex flex-1 ml-2"
					>
						{t('d_return')}
					</Button>
					<Button
						onClick={handleSubmit}
						variant="outlined"
						disabled={loading}
						color="primary"
						className="flex flex-1 mr-2"
					>
						{t('confirm')}
					</Button>
				</DialogActions>
				{loading && (
					<div className={classes.root}>
						<LinearProgress color="secondary" />
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Transition from '../../shared-components/Transition';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { DialogActions, AppBar, Typography, Toolbar, useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { addDomain, closeAddDomainDialog } from '../store/servicesSlice';
import DomainForm, { Form } from '../service/DomainForm';

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

const initialValues: Form = {
	domain: '',
	challengeType: undefined
};

export default function AddDomainDialog() {
	const classes = useStyles();
	const { t } = useTranslation('servicesApp');
	const dispatch = useDispatch();
	const { isOpen, loading, portalId } = useSelector(({ servicesApp }: any) => servicesApp.services.addDialog);
	const handleClose = () => {
		dispatch(closeAddDomainDialog());
	};

	const handleAddDomain = async ({ domain, challengeType }: Form) => {
		dispatch(addDomain({ domain, challengType: challengeType, portalId }));
	};

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Dialog
			open={isOpen}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
			className="rtl"
			maxWidth="sm"
			fullWidth
			fullScreen={fullScreen}
		>
			<AppBar position="static">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{t('add_domain')}
					</Typography>
				</Toolbar>
			</AppBar>
			<DialogContent className="px-20 md:px-28 py-10">
				<div className="text-18 my-32 mb-4">
					<DomainForm
						initialValues={initialValues}
						onSubmit={handleAddDomain}
						actionButton={
							<DialogActions className="px-0 mt-28">
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
									variant="outlined"
									type="submit"
									disabled={loading}
									color="primary"
									className="flex flex-1 mr-2"
								>
									{t('add')}
								</Button>
							</DialogActions>
						}
					/>
				</div>

				{loading && (
					<div className={classes.root}>
						<LinearProgress color="secondary" />
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}

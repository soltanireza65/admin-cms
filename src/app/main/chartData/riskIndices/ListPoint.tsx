import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Transition from 'app/main/shared-components/Transition';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddPoint from './addNewPoint';
import { red, green } from '@material-ui/core/colors';
import { deletePoint, setDialogOpenState, getPoints } from '../store/riskIndexSlice';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '@fuse/hooks';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper
	}
}));

export default function CheckboxList() {
	const classes = useStyles();
	const dispatch = useDispatch();

	const riskIndicesStore = useSelector(({ chartApp }: any) => chartApp.riskStore.dialog);

	const { t } = useTranslation('chartApp');
	const [tabIndex, setTabIndex] = useState<number>(0);

	useEffect(() => {
		dispatch(getPoints({ categoryID: riskIndicesStore.categoryID, isDaily: tabIndex == 0 ? true : false }));
	}, [tabIndex]);
	const handleClose = () => {
		dispatch(setDialogOpenState('', '', false));
	};
	const handleDelete = item => {
		dispatch(deletePoint({ categoryID: item.categoryID, categoryTitle: item.categoryTitle, id: item.id }));
	};
	return (
		<Dialog
			{...riskIndicesStore.props}
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
						{t('rise_indicator_data')} -- {riskIndicesStore && riskIndicesStore.categoryTitle}
					</Typography>
				</Toolbar>
			</AppBar>

			<Tabs
				value={tabIndex}
				onChange={(event, value) => {
					setTabIndex(value);
				}}
				textColor="primary"
				variant="scrollable"
				classes={{ root: 'w-full h-64' }}
			>
				<Tab className="h-64 normal-case" label={t('daily')}></Tab>
				<Tab className="h-64 normal-case" label={t('instant')}></Tab>
			</Tabs>
			<DialogContent>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant="subtitle1">
							{' '}
							{tabIndex == 0 ? t('dailyMessage') : t('momentaryMessage')}{' '}
						</Typography>
						<Divider />
						<AddPoint
							isDaily={tabIndex == 0 ? true : false}
							dispatch={dispatch}
							categoryID={riskIndicesStore && riskIndicesStore.categoryID}
							categoryTitle={riskIndicesStore && riskIndicesStore.categoryTitle}
						/>
					</Grid>
					<Grid item xs={12}>
						<div className="text-18 mb-10 mt-5">
							<Grid item xs={12}>
								<Divider />
								<ListItem>
									<ListItemIcon>
										<Typography variant="caption">{t('row')}</Typography>
									</ListItemIcon>
									<ListItemText className="text-right" id={'0'} primary={t('value')} />
									<ListItemText className="text-center" id={'1'} primary={t('date')} />
									<ListItemText className="text-left" id={'2'} primary={t('delete')} />
								</ListItem>
							</Grid>
							<Grid item xs={12}>
								<Divider />
								<List className={classes.root}>
									{riskIndicesStore && riskIndicesStore && riskIndicesStore.loading && (
										<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
											<Typography className="text-20 mb-16" color="textSecondary">
												{t('please_wait')} ...
											</Typography>
											<LinearProgress className="w-xs" color="secondary" />
										</div>
									)}
									{riskIndicesStore &&
										riskIndicesStore &&
										!riskIndicesStore.loading &&
										riskIndicesStore.listData &&
										riskIndicesStore.listData.length == 0 && (
											<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
												<Typography className="text-20 mb-16" color="textSecondary">
													{t('no_data')}
												</Typography>
											</div>
										)}
									{riskIndicesStore &&
										riskIndicesStore &&
										riskIndicesStore.listData &&
										riskIndicesStore.listData.map((item, index) => {
											return (
												<div className="w-full">
													<ListItem key={item} role={undefined} dense>
														<ListItemIcon>
															<Typography variant="caption">{index + 1}</Typography>
														</ListItemIcon>
														<ListItemText id={index} primary={item.riskIndexNumber} />
														<ListItemText
															id={index}
															primary={item.persianCreatedDateTime}
														/>
														<ListItemSecondaryAction>
															<IconButton edge="end" onClick={() => handleDelete(item)}>
																<Icon style={{ color: red[500] }}>delete</Icon>
															</IconButton>
														</ListItemSecondaryAction>
													</ListItem>
													<Divider />
												</div>
											);
										})}
								</List>
							</Grid>
						</div>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleClose}
					size="small"
					variant="outlined"
					color="primary"
					className="flex flex-1 mr-2"
				>
					{t('exit')}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

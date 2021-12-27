import React, { useCallback, useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
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
import { red } from '@material-ui/core/colors';
import {
	addFavoriteCategory,
	deleteFavoriteCategory,
	getFavoriteCategories,
	setDialogState
} from './store/favoriteSlice';
import { useTranslation } from 'react-i18next';
import Category from '../shared-components/category/category';
import { CategoryApi } from 'api/Category';
import { Polling } from 'api/Polling/index';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper
	}
}));

export default function FavoriteDialog() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState<ICategory.ICategoryData>(null);

	const favorite = useSelector(({ categoryApp }: any) => categoryApp.favorite);
	console.log('favorite: ', favorite);
	const { t } = useTranslation('categoryApp');

	useEffect(() => {
		const getCategories = async () => {
			let catArray = [];
			// const { data } = await Polling.getFavouriteYesNoPollings();
			const { data } = await CategoryApi.getAllCategories();
			data.forEach(item => {
				catArray.push({
					title: item.title,
					value: item.id
				});
			});
			setCategories(catArray);
		};
		getCategories();
	}, []);

	useEffect(() => {
		dispatch(getFavoriteCategories());
	}, []);
	const handleClose = () => {
		dispatch(setDialogState(false));
	};
	const handleDelete = item => {
		dispatch(deleteFavoriteCategory({ id: item.categoryID }));
	};

	// const handleChange = ({ target }) => {
	const handleChange = (event, value) => {
		console.log('value:', value);

		setSelectedCategory(value);
		// const ev = {
		// 	target: {
		// 		name: 'defaultCategoryID',
		// 		value: value && value.value,
		// 		categoryData: value
		// 	}
		// };
		// handleChange(ev);
		// setSelectedCategory(target.categoryData);
	};
	const handleAddFavoriteCategory = () => {
		console.log('selectedCategory: ', selectedCategory);
		selectedCategory &&
			dispatch(addFavoriteCategory({ id: selectedCategory.value, title: selectedCategory.title }));
	};

	// const mapOptions = useCallback((data: ICategory.ICategoryData[]) => {
	// 	return data.map(item => ({
	// 		value: item.id,
	// 		label: item.title
	// 	}));
	// }, []);
	// const handleChangeText = async (inputValue, callBack) => {
	// 	if (!inputValue) {
	// 		return callBack([]);
	// 	}
	// 	try {
	// 		const request = await CategoryApi.getAllCategories({ title: inputValue, moduleType: 6 });
	// 		let { data } = await request;

	// 		data = mapOptions(data);
	// 		callBack(data);
	// 	} catch {
	// 		callBack([]);
	// 	}
	// };
	return (
		<Dialog
			{...favorite.dialogState.props}
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
						{t('f_d_favorite_title')}
					</Typography>
				</Toolbar>
			</AppBar>

			<DialogContent className="mt-10">
				<Grid container>
					<Grid container xs={12}>
						<Grid item xs={9}>
							{/* TODO CATEGORY */}
							{/* <Category
								handleChange={handleChange}
								handleChangeText={handleChangeText}
								isEdditingMode={false}
								selectedCategory={[selectedCategory]}
								multiSelect={false}
								showLabel={false}
							/> */}
							<Autocomplete
								id="categories"
								options={categories}
								getOptionLabel={option => option.title}
								noOptionsText={t('f_d_not_found')}
								// value={[selectedCategory]}
								onChange={handleChange}
								renderInput={params => (
									<TextField
										{...params}
										variant="outlined"
										label={t('d_default_service')}
										placeholder={t('d_default_service')}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={3}>
							<IconButton onClick={handleAddFavoriteCategory}>
								<Icon>add</Icon>
							</IconButton>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<div className="text-18 mb-10 mt-5">
							<Grid item xs={12}>
								<Divider />
								<ListItem>
									<ListItemIcon>
										<Typography variant="caption">{t('f_d_row')}</Typography>
									</ListItemIcon>
									<ListItemText className="text-right" id={'0'} primary={t('f_d_title')} />
									<ListItemText className="text-center" id={'1'} primary={t('f_d_positive')} />
									<ListItemText className="text-left" id={'2'} primary={t('f_d_negetive')} />
									<ListItemText className="text-left" id={'2'} primary={t('f_d_action')} />
								</ListItem>
							</Grid>
							<Grid item xs={12}>
								<Divider />
								<List className={classes.root}>
									{favorite && favorite?.loading && (
										<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
											<Typography className="text-20 mb-16" color="textSecondary">
												{t('f_d_wait')}
											</Typography>
											<LinearProgress className="w-xs" color="secondary" />
										</div>
									)}
									{favorite &&
										!favorite.loading &&
										favorite.entities &&
										favorite.entities.length == 0 && (
											<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
												<Typography className="text-20 mb-16" color="textSecondary">
													{t('f_d_no_data')}
												</Typography>
											</div>
										)}
									{favorite &&
										favorite?.listData?.map((item, index) => {
											return (
												<div className="w-full">
													<ListItem key={item} role={undefined} dense>
														<ListItemIcon>
															<Typography variant="caption">{index + 1}</Typography>
														</ListItemIcon>
														<ListItemText id={index} primary={item.categoryTitle} />
														<ListItemText id={index} primary={item.categoryTitle} />
														<ListItemText id={index} primary={item.categoryTitle} />
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
					{t('f_d_exit')}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

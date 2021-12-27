import { useForm } from '@fuse/hooks';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useCallback, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import HtmlTooltip from '../shared-components/HtmlTooltip';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import {
	FormControl,
	InputLabel,
	List,
	MenuItem,
	Select,
	useMediaQuery,
	useTheme,
	makeStyles,
	LinearProgress
} from '@material-ui/core';
import OptionList from './OptionList';
import { addPolling, editPolling, setAddDialogOpen } from './store/pollingSlice';
import { ModuleTypesEnum } from './interfaces/enums';
import { NewsApi } from 'api/News';
import { CategoryApi } from 'api/Category';
import { useTranslation } from 'react-i18next';
import OptionItem from './OptionItem';
import { uuid } from 'uuidv4';

interface IForm {
	title?: string;
	moduleType: number;
	contentId?: { title: string; id: string };
	option?: string;
	options?: PollingInterface.IOption[];
}

const initialState: IForm = {
	title: '',
	moduleType: null,
	contentId: { title: '', id: '' },
	option: '',
	options: []
};

const useStyles = makeStyles(them => ({
	root: {
		borderRightWidth: 3,
		paddingRight: '2rem',
		borderColor: 'rgba(0, 0, 0, 0.12)'
	},
	aside: {
		marginLeft: '2rem'
	}
}));

const PollingDialog = () => {
	const theme = useTheme();
	const classes = useStyles();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const dispatch = useDispatch();
	const [contentIds, setContentIds] = useState([]);
	const [optionToAdd, setOptionToAdd] = useState<string>('');
	const { t } = useTranslation('PollingApp');
	const [loading, setLoading] = useState<boolean>(false);

	const { isOpen, type, polling } = useSelector(({ pollingApp }: any) => pollingApp.polling.pollingDialog);
	// const categories = useSelector(state => state);
	// .fuse.category.entities
	// console.log('categories: ', categories);

	const [form, setForm] = useState<IForm>({ ...initialState });

	useEffect(() => {
		if (polling) {
			const contentId = contentIds.find(content => content.id == polling.contentId);
			setForm({ ...polling, contentId });
		} else {
			setForm({ ...initialState });
		}
	}, [polling]);

	const handleSetOptions = () => {
		if (form.option) {
			setForm({
				...form,
				options: [...form.options, { title: form.option, id: uuid() }],
				option: ''
			});
		}
	};
	const handleChange = evt => {
		const name = evt.target.name;
		const value = evt.target.value;
		setForm({
			...form,
			[name]: value
		});
	};
	const handleSubmit = async () => {
		const { title, moduleType, contentId } = form;
		const options = form.options.map(option => option.title);
		setLoading(true);
		if (type === 'add') {
			await dispatch(addPolling({ title, moduleType, contentId: contentId.id, options }));
		} else {
			await dispatch(editPolling({ id: polling.id, title, moduleType, contentId: contentId?.id }));
		}
		setLoading(false);
		setForm({
			title: '',
			moduleType: 0,
			contentId: { title: '', id: '' },
			option: '',
			options: []
		});
	};

	const handleSetContentIds = async () => {
		switch (form.moduleType) {
			case 1:
				console.log('form.moduleType: ', form.moduleType);
				const newsRequest = await NewsApi.manageNews();
				if (newsRequest.data && newsRequest.data.length > 0) {
					let tempNewsIds = newsRequest.data.map(item => {
						return {
							title: item.titr,
							id: item.id
						};
					});
					setContentIds(prev => [...tempNewsIds]);
					console.log('tempNewsIds: ', tempNewsIds);
					console.log('ContentIds: ', contentIds);
				}

				break;
			case 16:
				console.log('form.moduleType: ', form.moduleType);
				const catsRequest = await CategoryApi.getAllCategories({
					Flated: true,
					count: 5000
				});

				if (catsRequest.data && catsRequest.data.length > 0) {
					let tempCatIds = catsRequest.data.map(item => {
						return {
							title: item.title,
							id: item.id
						};
					});
					setContentIds(prev => [...tempCatIds]);
				}

				break;

			default:
				break;
		}
	};

	useEffect(() => {
		handleSetContentIds();
	}, [form.moduleType]);
	// const getModuleTypes = () => {
	// 	Object.keys(ModuleTypesEnum).map(key => {
	// 		console.log('MyEnum[key]: ', ModuleTypesEnum[key]);
	// 	});
	// };
	// getModuleTypes();

	const handleDeleteOption = (optionId: string) => {
		const newOptions = form.options.filter(option => option.id != optionId);
		setForm(form => ({ ...form, options: newOptions }));
	};

	return (
		<Dialog
			open={isOpen}
			onClose={() => dispatch(setAddDialogOpen(false))}
			maxWidth="lg"
			fullScreen={fullScreen}
			classes={{
				root: 'max-h-150 h-100',
				paper: 'rounded-8'
			}}
		>
			<AppBar position="static" className="">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{type === 'add' ? t('addPollings') : t('edit_polling')}
					</Typography>
				</Toolbar>
			</AppBar>
			<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0 flex justify-evenly items-stretch' }}>
				<div
					className={`content flex-col justify-between mb-10 ${
						type === 'add' ? `${classes.root} w-1/3 pl-20` : ''
					}`}
				>
					<div className="inputFileds">
						<FormControl fullWidth>
							<Typography variant="subtitle1" gutterBottom>
								{t('polling_title')}:
							</Typography>
							<TextField
								className="mb-12"
								name="title"
								value={form.title}
								onChange={handleChange}
								fullWidth
								variant="outlined"
								placeholder={t('polling_title')}
								required
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<HtmlTooltip
												style={{
													fontSize: '16px'
												}}
												title="title"
											>
												<Icon className="text-18">help</Icon>
											</HtmlTooltip>
										</InputAdornment>
									)
								}}
							/>
						</FormControl>

						<FormControl fullWidth>
							<Typography variant="subtitle1" gutterBottom>
								{t('content_type')}:
							</Typography>
							<Select
								className="mb-12"
								fullWidth
								labelId="moduleType-label"
								name="moduleType"
								id="moduleType"
								placeholder={t('content_type')}
								value={form.moduleType}
								variant="outlined"
								onChange={e => {
									setForm({
										...form,
										moduleType: Number(e.target.value)
									});
								}}
							>
								{}
								<MenuItem value={1}>{t('news')}</MenuItem>
								<MenuItem value={16}>{t('category')}</MenuItem>
								{/* 
									<MenuItem value={3}>پادکست</MenuItem>
									<MenuItem value={4}>عکس</MenuItem>
									<MenuItem value={5}>اینفوگرافیک</MenuItem>
									 */}
							</Select>
						</FormControl>

						<FormControl fullWidth>
							<Typography variant="subtitle1" gutterBottom>
								{t('content_id')}:
							</Typography>
							<Autocomplete
								disabled={contentIds.length < 1}
								className="mb-12"
								value={form.contentId}
								// onChange={handleChange}
								onChange={(event, value, reason) => {
									setForm({
										...form,
										contentId: value
									});
								}}
								fullWidth
								options={contentIds}
								getOptionLabel={option => option.title}
								renderInput={params => (
									<TextField {...params} variant="outlined" placeholder={t('content_id')} />
								)}
							/>
						</FormControl>
					</div>
					<DialogActions className="px-0">
						<Button
							variant="outlined"
							className="flex flex-1 ml-2"
							color="primary"
							onClick={handleSubmit}
							disabled={loading}
						>
							{type === 'add' ? t('add') : t('save')}
						</Button>
						<Button
							variant="outlined"
							className="flex flex-1 mr-2"
							color="secondary"
							onClick={() => dispatch(setAddDialogOpen(false))}
						>
							{t('cancel')}
						</Button>
					</DialogActions>
					{loading && (
						<div className="mt-2 mb-12">
							<LinearProgress color="secondary" />
						</div>
					)}
				</div>
				{type === 'add' && (
					<div className={`w-2/3 ${classes.aside} mb-12`}>
						<Typography variant="subtitle1" gutterBottom>
							{t('options')}:
						</Typography>
						<div className="flex">
							<FormControl fullWidth>
								<TextField
									label={t('option')}
									name="option"
									value={form.option}
									onChange={handleChange}
									fullWidth
									variant="outlined"
									required
									onKeyUp={e => {
										if (e.key === 'Enter') {
											// if (optionToAdd.length > 0) {
											// 	setOptionsToAdd(prev => [...prev, optionToAdd]);
											// }
											handleSetOptions();
											setOptionToAdd('');
										}
									}}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<HtmlTooltip
													style={{
														fontSize: '16px'
													}}
													title="title"
												>
													<Icon className="text-18">help</Icon>
												</HtmlTooltip>
											</InputAdornment>
										)
									}}
								/>
							</FormControl>
							<Button onClick={handleSetOptions}>
								<AddIcon />
							</Button>
						</div>
						<div style={{ maxHeight: 250, overflow: 'auto' }}>
							<List>
								{form.options &&
									form.options.length > 0 &&
									form.options.map((item, index) => {
										return (
											<OptionItem
												showVote={false}
												option={item}
												key={item.id}
												onDelete={handleDeleteOption}
											/>
										);
									})}
							</List>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default PollingDialog;

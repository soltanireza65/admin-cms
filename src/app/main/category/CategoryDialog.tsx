import { useForm } from '@fuse/hooks';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';
import HtmlTooltip from '../shared-components/HtmlTooltip';
import FuseUtils from '@fuse/utils';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '@fuse/hooks';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import {
	createCategory,
	openNewCategoryDialog,
	closeNewCategoryDialog,
	editCategory,
	setLoadingState
} from './store/categorySlice';
import { IDialogCategory } from './interfaces/props';
import Album from 'app/main/file-manger/album/Album';
import { deleteAllFiles } from 'app/store/fuse/albumSlice';
import SelectOptions from '../shared-components/selectOptions/index';
import { ModuleType } from 'utils/variables';
import IOSSwitch from '../shared-components/IosSwitch';
import { bourseApi } from 'api/bourseApi/index';
import { showMessage } from 'app/store/fuse/messageSlice';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { IOptionsData } from './interfaces/props';
import { addFile } from 'app/store/fuse/albumSlice';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Autocomplete from '@material-ui/lab/Autocomplete';

const initialValues: IDialogCategory = {
	title: '',
	englishTitle: '',
	description: '',
	parentId: '',
	id: '',
	mediaFiles: [],
	saveMessage: '',
	editMessage: '',
	deleteMessage: '',
	cancelMessage: '',
	additionalData: '',
	moduleType: 1,
	isMainPageCategory: false
};
let symbols: IOptionsData[] = [];
let indices: IOptionsData[] = [];
function CategoryDialog() {
	const dispatch = useDispatch();
	const { form, handleChange, resetForm, setForm, setInForm } = useForm<IDialogCategory>(initialValues);
	const categoryDialog = useSelector(({ categoryApp }: any) => categoryApp.category.categoryDialog);
	const categoryData = useSelector(({ categoryApp }: any) => categoryApp.category);
	const mediaFilesData = useSelector(({ fuse }: any) => fuse.album);
	const [options, setOptions] = useState<any[]>([]);
	const [selectedTicker, setSelectedTicker] = useState<IOptionsData>();
	const theme = useTheme();

	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [isMainPage, setIsMainpage] = useState(false);
	const [selectedType, setSelectedType] = useState({
		title: '',
		value: 1
	});

	const [parentId, setParentId] = useState({ title: '', value: '' });

	const parentIdOptions = categoryData.entities.map(item => ({ title: item.title, value: item.id }));

	const handleParentIdChange = value => {
		setParentId(value);
		setForm(form => ({ ...form, parentId: value?.value || '' }));
	};

	const getTickersData = useDebounce(async typeCode => {
		indices = [];
		symbols = [];
		{
			//شاخص کل
			if (typeCode == 3110) {
				const request = await bourseApi.getAllTickers({ typeCodes: 3110 });
				const { data } = await request;
				if (data && data.length > 0) {
					data.map(item => {
						indices.push({
							label: item.symbolFA,
							value: item
						});
					});
				}
				setOptions(indices);
			}
		}
		{
			const request = await bourseApi.getAllTickers({ typeCodes: typeCode });
			const { data } = await request;
			if (data && data.length > 0) {
				data.map(item => {
					typeCode == 3120 &&
						indices.push({
							label: item.symbolFA,
							value: item
						});
					typeCode == 1100 &&
						symbols.push({
							label: item.symbolFA,
							value: item
						});
				});
				typeCode == 3120 && setOptions(indices);
				typeCode == 1100 && setOptions(symbols);
			} else {
				if (typeCode == 3120) {
					indices = [];
				}
				if (typeCode == 1100) {
					symbols = [];
				}
			}
		}
	}, 400);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (categoryDialog.type === 'edit' && categoryDialog.data) {
			setForm({ ...categoryDialog.data });
			console.log(categoryDialog.data);

			categoryDialog.data.mediaFiles.map((item: IGlobalData.IMedaiFiles, index) => {
				dispatch(
					addFile(
						{
							id: index + 1,
							extension: '.png',
							mediaFileId: item.mediaFileId,
							filePath: item.filePath,
							attachments: item.attachments,
							fileType: item.mediaFileType,
							isVideo: false,
							caption: item.caption,
							url: ''
						},
						3,
						true
					)
				);
			});

			setIsMainpage(categoryDialog.data.isMainPageCategory);
			setSelectedType({
				title: '',
				value: categoryDialog.data.moduleType
			});
			const parentTitle = categoryDialog.data.parentId
				? categoryData.entities.find(cateogry => cateogry.id === categoryDialog.data.parentId)?.title
				: '';
			setParentId({ value: categoryDialog.data.parentId, title: parentTitle });
			categoryDialog.data.additionalData &&
				setSelectedTicker({
					label: categoryDialog.data.title,
					value: JSON.parse(categoryDialog.data.additionalData)
				});
			if (categoryDialog.data.moduleType == 6) {
				getTickersData(1100);
			}
			if (categoryDialog.data.moduleType == 5) {
				getTickersData(3120);
			}
		}

		/**
		 * Dialog type: 'new'
		 */
		if (categoryDialog.type === 'new') {
			setForm({
				...initialValues,
				...categoryDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [categoryDialog.data, categoryDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (categoryDialog.props.open) {
			initDialog();
		}
	}, [categoryDialog.props.open, initDialog]);
	const { t } = useTranslation('categoryApp');

	function handleOpenDialog() {
		dispatch(openNewCategoryDialog(''));
	}

	function handleCloseDialog() {
		dispatch(deleteAllFiles({}));

		setSelectedTicker(null);
		setSelectedType({ title: 'خبر', value: 1 });
		setParentId({ value: '', title: '' });
		symbols = [];
		indices = [];
		resetForm();
		categoryData.loadingOne === false && dispatch(closeNewCategoryDialog({}));
	}

	const handleIsMainPageChange = () => {
		setIsMainpage(!isMainPage);
	};
	function handleSubmit(ev) {
		ev.preventDefault();
		if ((selectedType.value == 5 || selectedType.value == 6) && selectedTicker == null) {
			dispatch(
				showMessage({
					message: t('c_d_dialog_selected_ticker'),
					variant: 'error'
				})
			);
			return;
		}
		dispatch(setLoadingState({}));
		const { imagesEntities } = mediaFilesData;
		if (selectedTicker) {
			form.title = selectedTicker.value.symbolFA;

			form.additionalData = JSON.stringify(selectedTicker.value);
		}
		form.isMainPageCategory = isMainPage;
		form.moduleType = selectedType.value;
		form.mediaFiles = [];
		imagesEntities.map((file, index) => {
			form.mediaFiles.push({
				mediaId: file.item.mediaFileId,
				attachments: file.item.attachments,
				mediaCropParam: file.item.mediaCropParam,
				mediaFileType: file.mainItem == true ? 1 : 2,
				order: index
			});
		});

		if (categoryDialog.type == 'new') {
			form.parentId = categoryDialog.parentId.toString().length > 1 ? categoryDialog.parentId : null;

			form.saveMessage = t('save_data', { title: form.title });
			dispatch(createCategory({ ...form }));
		} else {
			form.saveMessage = t('save_data', { title: form.title });
			dispatch(editCategory({ ...form }));
		}

		resetForm();
		handleCloseDialog();
	}
	const handleSelectedTicker = value => {
		form.additionalData = JSON.stringify(value.value);
		form.englishTitle = value.value.symbol;
		setSelectedTicker(value);
	};

	const handleTypeChange = value => {
		setSelectedType(value.target);

		if (value.target.value == 5) {
			getTickersData(3120);
		}
		if (value.target.value == 6) {
			getTickersData(1100);
		}
		if (value.target.value == 17) {
			getTickersData(3110);
		}
	};
	return (
		<div className="p-24">
			<Dialog
				{...categoryDialog.props}
				onClose={handleCloseDialog}
				maxWidth="lg"
				fullScreen={fullScreen}
				classes={{
					root: 'max-h-150 h-100 ',
					paper: 'rounded-8'
				}}
			>
				<AppBar position="static" className="">
					<Toolbar className="flex w-full">
						<Typography variant="subtitle1" color="inherit">
							{t('c_d_dialog_form_title')}
						</Typography>
					</Toolbar>
				</AppBar>
				<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0 flex justify-evenly items-stretch' }}>
					<div className="content flex-col justify-between border-l-3 w-1/3">
						<div className="inputFileds px-20 py-20">
							<FormControlLabel
								className="text-black"
								control={
									<IOSSwitch
										value={isMainPage}
										checked={isMainPage}
										onChange={handleIsMainPageChange}
										name="isMainPageCategory"
									/>
								}
								label={t('isMainPage')}
							/>
							<SelectOptions
								name="category-type"
								handleChange={handleTypeChange}
								selectedOption={selectedType}
								listOptions={ModuleType}
								title={t('c_d_type')}
							/>

							{selectedType.value == 17 || selectedType.value == 6 || selectedType.value == 5 ? (
								<FuseChipSelect
									className="mt-8 mb-16"
									value={selectedTicker}
									onChange={handleSelectedTicker}
									NoOptionsMessage={t('c_d_no_options')}
									id="title"
									placeholder={t('c_d_select_ticker')}
									textFieldProps={{
										label: t('c_d_dialog_title'),
										InputLabelProps: {
											shrink: true
										},
										variant: 'standard'
									}}
									options={options}
									isMulti={false}
								/>
							) : (
								<TextField
									className="mt-8 mb-16"
									id="title"
									name="title"
									value={form.title}
									onChange={handleChange}
									label={t('c_d_dialog_title')}
									placeholder={t('c_d_dialog_title')}
									autoFocus
									variant="outlined"
									required
									fullWidth
								/>
							)}
							<TextField
								className="my-12"
								label={t('c_d_dialog_en_title')}
								placeholder={t('c_d_dialog_en_title')}
								name="englishTitle"
								value={form.englishTitle}
								onChange={handleChange}
								fullWidth
								variant="outlined"
								required
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<HtmlTooltip
												style={{
													fontSize: '16px'
												}}
												title={t('c_d_en_title_tooltip')}
											>
												<Icon className="text-18">help</Icon>
											</HtmlTooltip>
										</InputAdornment>
									)
								}}
							/>

							<TextField
								className="my-12"
								label={t('description')}
								placeholder={t('description')}
								name="description"
								id="description"
								value={form.description}
								onChange={handleChange}
								fullWidth
								variant="outlined"
								required
								type="textarea"
								multiline
							/>
							<Autocomplete
								value={parentId}
								getOptionLabel={option => option.title}
								onChange={(event, newValue) => {
									handleParentIdChange(newValue);
								}}
								options={parentIdOptions}
								renderInput={params => (
									<TextField {...params} label={t('parent_id')} variant="outlined" fullWidth />
								)}
							/>
						</div>
						<DialogActions className="p-8 actions flex justify-between w-full px-16 mb-12">
							<Button
								variant="outlined"
								className="w-1/3 flex flex-1 mr-2"
								color="primary"
								onClick={handleSubmit}
								disabled={categoryData.loadingOne}
							>
								{t('c_d_button_submit')}
							</Button>
							<Button
								variant="outlined"
								className="w-1/3 flex flex-1 mr-2"
								color="secondary"
								onClick={handleCloseDialog}
								disabled={categoryData.loadingOne}
							>
								{t('back')}
							</Button>
						</DialogActions>
					</div>
					<div className="album w-2/3">
						<Album mediaType={3} />
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default CategoryDialog;

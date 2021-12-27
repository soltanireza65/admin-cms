import React, { useState, useRef } from 'react';
import { FluidContainer } from './styles/grid';
import { ButtonDiv } from './styles/buttons';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Close from '@material-ui/icons/Close';
import { openNewDialog } from 'app/store/fuse/uploadSlice';
import { getMediaFiles, setLoadingState, setMediaType, setDialogState } from './store/fileManagerSlice';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageSearch from '@material-ui/icons/ImageSearch';
import { useDebounce } from '@fuse/hooks';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SaveIcon from '@material-ui/icons/Save';
import AddBoxIcon from '@material-ui/icons/AddBox';

export default () => {
	const dispatch = useDispatch();
	const [selectedButton, setSelectedButton] = useState<number>(0);
	const fileManager = useSelector(({ fuse }: any) => fuse.fileManagerApp.fileManager);
	const [openSearch, setOpenSearch] = useState<boolean>(false);
	const [searchText, setSearchText] = useState('');

	const { t } = useTranslation('fileManagerApp');
	const [selectedModuleOwner, setSelectedModuleOwner] = useState('all');
	function showSearch() {
		setOpenSearch(true);
		document.addEventListener('keydown', escFunction, false);
	}

	function hideSearch() {
		setOpenSearch(false);
		if (searchText.length > 0) {
			setSearchText('');
			dispatch(getMediaFiles({ FileType: fileManager.mediaType }));
		}
		document.removeEventListener('keydown', escFunction, false);
	}
	const searchTestFunc = useDebounce((text: string) => {
		dispatch(getMediaFiles({ caption: text, FileType: fileManager.mediaType }));
	}, 400);
	const handleOnChangeText = (text: string) => {
		setSearchText(text);
		dispatch(setLoadingState({}));
		searchTestFunc(text);
	};

	const handleSelectedType = index => {
		setSearchText('');
		dispatch(setLoadingState({}));
		if (index == 0) {
			dispatch(getMediaFiles({}));
		} else {
			dispatch(getMediaFiles({ FileType: index }));
			dispatch(setMediaType(index));
		}
		setSelectedButton(index);
	};
	function escFunction(event) {
		if (event.keyCode === 27) {
			hideSearch();
		}
	}

	const handleSelectedModuleOwner = e => {
		setSelectedModuleOwner(e.target.value);
	};
	return (
		<FluidContainer>
			<div className="innerfilter">
				<div className="filter-list-group">
					{!openSearch && !fileManager.dialogState && (
						<ButtonDiv>
							{/* <FormControl
								style={{
									minWidth: '70px',
									marginLeft: '10px'
								}}
								variant="filled"
							>
								<InputLabel htmlFor="category-label-placeholder"> {t('moduleOnwerPicker')} </InputLabel>
								<Select value={selectedModuleOwner} onChange={handleSelectedModuleOwner}>
									<MenuItem value="all">{t('moduleOwnerAll')}</MenuItem>

									<MenuItem value="News">{t('moduleOwnerNews')}</MenuItem>

									<MenuItem value="Category">{t('moduleOwnerCategory')}</MenuItem>

									<MenuItem value="Advertise">{t('moduleOwnerAdverties')}</MenuItem>
								</Select>
							</FormControl> */}
							<button
								className={clsx('btn btn-white', selectedButton === 0 && 'active')}
								onClick={() => handleSelectedType(0)}
							>
								{t('all_media')}
							</button>
							<button
								className={clsx('btn btn-white', selectedButton === 3 && 'active')}
								onClick={() => handleSelectedType(3)}
							>
								{t('images')}
							</button>
							<button
								className={clsx('btn btn-white', selectedButton === 4 && 'active')}
								onClick={() => handleSelectedType(4)}
							>
								{t('videos')}
							</button>
							<button
								className={clsx('btn btn-white', selectedButton === 2 && 'active')}
								onClick={() => handleSelectedType(2)}
							>
								{t('audios')}
							</button>

							<button
								className={clsx('btn btn-white', selectedButton === 1 && 'active')}
								onClick={() => handleSelectedType(1)}
							>
								{t('other')}
							</button>

							<IconButton onClick={showSearch}>
								<Search />
							</IconButton>
						</ButtonDiv>
					)}

					{(openSearch == true || fileManager.dialogState == true) && (
						<ButtonDiv>
							<InputBase
								style={{
									width: '40vw',
									marginRight: '150px'
								}}
								value={searchText}
								onChange={x => handleOnChangeText(x.target.value)}
								placeholder={t('search_file')}
								inputProps={{ 'aria-label': t('search_file') }}
							/>
							{fileManager.loading && (
								<IconButton>
									<CircularProgress
										style={{
											width: '25px',
											height: '25px'
										}}
									/>
								</IconButton>
							)}
							<IconButton onClick={() => handleOnChangeText(searchText)}>
								<ImageSearch />
							</IconButton>
							<IconButton onClick={hideSearch}>{!fileManager.dialogState && <Close />}</IconButton>
						</ButtonDiv>
					)}
				</div>
			</div>
			<div className="share-group-btn">
				<div className="inline-flex">
					<button
						className=" hover:text-gray-700 text-gray-800 font-bold py-2 px-4"
						onClick={() => {
							dispatch(openNewDialog());
						}}
					>
						<AddBoxIcon className="text-4xl" />
					</button>
					{fileManager.dialogState == true && (
						<button
							className="hover:text-gray-700 text-gray-800 font-bold py-2 px-4"
							onClick={() => {
								dispatch(setDialogState(false, 0, 0));
							}}
						>
							<SaveIcon className="text-4xl" />
						</button>
					)}
					{fileManager.dialogState == true && (
						<button
							style={{ transform: 'rotate(180deg)' }}
							className="rotate-180 hover:text-gray-700 text-gray-800 font-bold py-2 px-4"
							onClick={() => {
								dispatch(setDialogState(false, 0, 0));
							}}
						>
							<ExitToAppIcon className="text-4xl" />
						</button>
					)}
				</div>
			</div>
		</FluidContainer>
	);
};

import React, { useState, useRef } from 'react';
import { FluidContainer } from './styles/grid';
import { ButtonDiv } from './styles/buttons';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Close from '@material-ui/icons/Close';
import { openNewDialog } from 'app/store/fuse/uploadSlice';
import { getMediaFiles, setLoadingState } from './store/fileManagerSlice';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageSearch from '@material-ui/icons/ImageSearch';
import { useDebounce } from '@fuse/hooks';
import { useTranslation } from 'react-i18next';
export default () => {
	const dispatch = useDispatch();
	const [selectedButton, setSelectedButton] = useState<number>(0);
	const loading = useSelector(({ fuse }: any) => fuse.fileManagerApp.fileManager.loading);
	const [openSearch, setOpenSearch] = useState<boolean>(false);
	const [searchText, setSearchText] = useState('');

	function showSearch() {
		setOpenSearch(true);
		document.addEventListener('keydown', escFunction, false);
	}

	function hideSearch() {
		setOpenSearch(false);
		if (searchText.length > 0) {
			setSearchText('');
			dispatch(getMediaFiles({ FileType: selectedButton }));
		}
		document.removeEventListener('keydown', escFunction, false);
	}
	const searchTestFunc = useDebounce((text: string) => {
		dispatch(getMediaFiles({ caption: text, FileType: selectedButton }));
	}, 400);
	const handleOnChangeText = (text: string) => {
		setSearchText(text);
		dispatch(setLoadingState({}));
		searchTestFunc(text);
	};

	const handleSelectedType = index => {
		dispatch(setLoadingState({}));
		if (index == 0) {
			dispatch(getMediaFiles({}));
		} else {
			dispatch(getMediaFiles({ FileType: index }));
		}
		setSelectedButton(index);
	};
	function escFunction(event) {
		if (event.keyCode === 27) {
			hideSearch();
		}
	}

	const { t } = useTranslation('fileManagerApp');
	return (
		<FluidContainer>
			<div className="innerfilter">
				<div className="filter-list-group">
					{!openSearch && (
						<ButtonDiv>
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

					{openSearch && (
						<ButtonDiv
							style={{
								margin: '200px'
							}}
						>
							<InputBase
								style={{
									width: '60vw'
								}}
								value={searchText}
								onChange={x => handleOnChangeText(x.target.value)}
								placeholder="عنوان فایل مورد نظر را جستجو کنید"
								inputProps={{ 'aria-label': 'عنوان فایل مورد نظر را جستجو کنید' }}
							/>
							{loading && (
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
							<IconButton onClick={hideSearch}>
								<Close />
							</IconButton>
						</ButtonDiv>
					)}
				</div>
			</div>
			<div className="share-group-btn">
				<ButtonDiv>
					<button
						className="btn btn-default"
						onClick={() => {
							dispatch(openNewDialog());
						}}
					>
						افزودن
					</button>
				</ButtonDiv>
			</div>
		</FluidContainer>
	);
};

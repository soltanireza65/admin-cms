import React, { useState, useEffect } from 'react';
import { BodyDiv } from './styles/general';
import { FiltersDiv } from './styles/filters';
import { FluidContainer } from './styles/grid';
import { GridContainer, GridStyle, LoadMoreButton } from './styles/documents';
import FileItem from './FileItem';
import FiltersMenu from './FiltersMenu';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { getMediaFiles, setLoadingState } from './store/fileManagerSlice';
import { useTranslation } from 'react-i18next';
export default () => {
	const dispatch = useDispatch();
	const fileManager = useSelector(({ fuse }: any) => fuse.fileManagerApp.fileManager);

	const [counter, setCounter] = useState<number>(15);
	let ListFiles = null;
	if (fileManager.loading) {
		ListFiles = (
			<div className="flex flex-1 flex-col items-center justify-center h-full">
				<CircularProgress />
			</div>
		);
	}
	if (fileManager.entities && fileManager.entities.length > 0) {
		ListFiles = fileManager.entities.map(
			(fileItem, index) =>
				fileItem && (
					<FileItem
						id="Gallery-Item"
						key={index}
						{...fileItem}
						mediaType={fileManager.mediaType}
						moduleType={fileManager.moduleType}
					/>
				)
		);
	}

	const { t } = useTranslation('fileManagerApp');

	if (!fileManager.loading && (!fileManager.entities || (fileManager.entities && fileManager.entities.length == 0))) {
		ListFiles = (
			<div className="flex flex-1 flex-col items-center justify-center h-full">
				<Typography>{t('no_data')}.</Typography>
			</div>
		);
	}
	const loadMore = () => {
		dispatch(setLoadingState({}));
		setCounter(counter + 15);
		dispatch(getMediaFiles({ FileType: fileManager.mediaType, count: counter + 15 }));
	};

	return (
		<BodyDiv>
			<FiltersDiv>
				<FiltersMenu />
			</FiltersDiv>
			<GridContainer>
				<FluidContainer>
					<FuseAnimate animation="transition.expandIn" delay={600}>
						<div className="grid grid-cols-6 gap-10 overflow-hidden">{ListFiles}</div>
					</FuseAnimate>
					{/* (!fileManager.entities || (fileManager.entities && fileManager.entities.length == 0)) */}
					{fileManager && !fileManager.limitLoadMoreButton && fileManager.entities && (
						<LoadMoreButton onClick={loadMore}>
							<div className="content">
								<button className="btn btn-default-outline">{t('load_more')}</button>
							</div>
						</LoadMoreButton>
					)}
				</FluidContainer>
			</GridContainer>
		</BodyDiv>
	);
};

import React, { useRef } from 'react';
import ListTable from './ListTable';
import { useDispatch, useSelector } from 'react-redux';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Header from './Header';
import { manageTags, openNewTagDialog } from '../shared-components/tags/store/tagsSlice';
import Button from '@material-ui/core/Button/Button';
import { useTranslation } from 'react-i18next';

const TagsApp = () => {
	const dispatch = useDispatch();
	const pageLayout = useRef(null);
	const { entities } = useSelector(({ tagApp }: any) => tagApp.tags);
	React.useEffect(() => {
		entities.length === 0 && dispatch(manageTags({}));
	}, [dispatch]);
	const openTagDialog = () => {
		dispatch(openNewTagDialog(null));
	};

	const { t } = useTranslation('tagApp');

	return (
		<>
			<FusePageCarded
				classes={{
					root: 'w-full',
					header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136',
					content: 'h-3/4'
				}}
				header={<Header pageLayout={pageLayout} />}
				content={
					<>
						<div className="flex justify-end mb-16">
							<Button color="primary" variant="contained" className="mx-16 mt-12" onClick={openTagDialog}>
								{t('d_openButton')}
							</Button>
						</div>
						<ListTable pageLayout={pageLayout} />
					</>
				}
				ref={pageLayout}
				innerScroll
				useFuseScrollBar={false}
			/>
		</>
	);
};
export default TagsApp;

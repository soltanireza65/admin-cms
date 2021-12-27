import React, { useRef, useEffect } from 'react';
import AdvertiesTableInit from './AdvertiesTableInit';
import withReducer from 'app/store/withReducer';
import reducer from './store/index';
import { useDispatch, useSelector } from 'react-redux';
import FusePageCarded from '@fuse/core/FusePageCarded';
import SidebarHeader from './SidebarHeader';
import Header from './Header';
import SidebarContent from './SidebarContent';
import PaginationActions from './PaginationActions';
import AdvertiesDialog from './AdvertiesDialog';
import { getAdvertisesList } from './store/advertiesSlice';
import DeleteDialog from './DeleteDialog';
const AdvertiesApp = () => {
	const dispatch = useDispatch();
	const pageLayout = useRef(null);
	const statusData = useSelector(({ advertiesApp }: any) => advertiesApp.adverties.status);
	useEffect(() => {
		dispatch(getAdvertisesList({ status: statusData }));
	}, []);
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
						<PaginationActions dispatch={dispatch} />
						<AdvertiesTableInit />
					</>
				}
				leftSidebarHeader={<SidebarHeader />}
				leftSidebarContent={<SidebarContent />}
				ref={pageLayout}
				innerScroll
				useFuseScrollBar={false}
			/>
			<AdvertiesDialog />
			<DeleteDialog />
		</>
	);
};
export default withReducer('advertiesApp', reducer)(AdvertiesApp);

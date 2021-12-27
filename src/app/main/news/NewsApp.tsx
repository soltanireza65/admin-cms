import React, { useRef } from 'react';
import ListTable from './newsList/ListTable';
import withReducer from 'app/store/withReducer';
import reducer from './store/index';
import { useDispatch } from 'react-redux';
import { manageNews } from './store/newsSlice';
import FusePageCarded from '@fuse/core/FusePageCarded';
import SidebarContent from './newsList/SidebarContent';
import SidebarHeader from './newsList/SidebarHeader';
import PaginationActions from './newsList/PaginationActions';
import Header from './newsList/Header';
const NewsApp = () => {
	const dispatch = useDispatch();
	const pageLayout = useRef(null);
	React.useEffect(() => {
		dispatch(manageNews({ status: 1 }));
	});
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
						<ListTable />
					</>
				}
				leftSidebarHeader={<SidebarHeader />}
				leftSidebarContent={<SidebarContent />}
				ref={pageLayout}
				innerScroll
				useFuseScrollBar={false}
			/>
		</>
	);
};
export default withReducer('newsApp', reducer)(NewsApp);

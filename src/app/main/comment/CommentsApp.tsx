import React, { useRef } from 'react';
import ListTable from './ListTable';
import withReducer from 'app/store/withReducer';
import reducer from './store/index';
import { useDispatch } from 'react-redux';
import { getComments } from './store/commentSlice';
import FusePageCarded from '@fuse/core/FusePageCarded';
import SidebarContent from './SidebarContent';
import SidebarHeader from './SidebarHeader';
import CommentDialog from './CommentDialog';
import DeleteDialog from './DeleteDialog';
// import PaginationActions from './PaginationActions';
import Header from './Header';
const CommentsApp = () => {
	const dispatch = useDispatch();
	const pageLayout = useRef(null);
	React.useEffect(() => {
		dispatch(getComments({}));
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
						<ListTable pageLayout={pageLayout} />
					</>
				}
				leftSidebarHeader={<SidebarHeader />}
				leftSidebarContent={<SidebarContent />}
				ref={pageLayout}
				innerScroll
				useFuseScrollBar={false}
			/>
			<CommentDialog />
			<DeleteDialog />
		</>
	);
};
export default withReducer('commentsApp', reducer)(CommentsApp);

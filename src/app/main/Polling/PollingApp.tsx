import React, { useEffect, useRef, useState } from 'react';
import withReducer from 'app/store/withReducer';
import reducer from './store/index';

import FusePageCarded from '@fuse/core/FusePageCarded';
import SidebarContent from './SidebarContent';
import SidebarHeader from './SidebarHeader';
// import PaginationActions from './PaginationActions';
import PollingList from './PollingList';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useTranslation } from 'react-i18next';

interface Props {}

const PollingApp = (props: Props) => {
	const { t } = useTranslation('PollingApp');

	return (
		<>
			<FusePageCarded
				classes={{
					root: 'w-full',
					header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136',
					content: 'h-3/4'
				}}
				// header={<Header pageLayout={pageLayout} />}
				header={
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<span className="text-24 mx-16">
							{/* {t('sidebar_header_title')} */}
							{t('sidebar_header_title')}
						</span>
					</FuseAnimate>
				}
				content={<PollingList />}
				// leftSidebarHeader={<SidebarHeader />}
				// leftSidebarContent={<SidebarContent />}
				// ref={pageLayout}
				innerScroll
				useFuseScrollBar={false}
			/>
		</>
	);
};

export default withReducer('pollingApp', reducer)(PollingApp);

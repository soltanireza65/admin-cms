import React, { useEffect, useRef } from 'react';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import { useDispatch, useSelector } from 'react-redux';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import BubbleTable from './BubbleColmuns';
import { getAllData } from '../store/bubbleSlice';
const PridectionApp = () => {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);
	useEffect(() => {
		dispatch(getAllData({}));
	}, []);
	const { t } = useTranslation('chartApp');

	return (
		<>
			<FusePageSimple
				header={
					<div className="flex flex-col flex-1 p-8 sm:p-12 relative">
						<FuseAnimate delay={200}>
							<div className="self-center">
								<Typography variant="h6">{t('bubble_chart')}</Typography>
							</div>
						</FuseAnimate>
					</div>
				}
				content={<BubbleTable />}
				classes={{
					root: 'bg-red',
					header: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
					sidebarHeader: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
					rightSidebar: 'w-320'
				}}
				rightSidebarVariant="temporary"
				ref={pageLayout}
				innerScroll
			/>
		</>
	);
};
export default withReducer('chartApp', reducer)(PridectionApp);

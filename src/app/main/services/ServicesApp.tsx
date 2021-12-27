import React, { useReducer, useRef } from 'react';
import { useDispatch } from 'react-redux';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@material-ui/core/Button/Button';
import { useTranslation } from 'react-i18next';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import ServicesTable from './ServicesTable';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getServices } from './store/servicesSlice';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	newButton: {
		'&:hover': {
			textDecoration: 'none !important'
		}
	}
});

const ServicesApp = () => {
	const dispatch = useDispatch();
	const pageLayout = useRef(null);
	React.useEffect(() => {
		dispatch(getServices());
	}, []);

	const styles = useStyles();

	const { t } = useTranslation('servicesApp');

	return (
		<>
			<FusePageCarded
				classes={{
					root: 'w-full',
					header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136',
					content: 'h-3/4'
				}}
				content={
					<>
						<div className="flex justify-end mb-16">
							<Link to="/apps/services/add" className={styles.newButton}>
								<Button color="primary" variant="contained" className="mx-16 mt-12">
									{t('new_service')}
								</Button>
							</Link>
						</div>
						<ServicesTable pageLayout={pageLayout} />
					</>
				}
				ref={pageLayout}
				innerScroll
				useFuseScrollBar={false}
				header={<Header />}
			/>
		</>
	);
};
export default withReducer('servicesApp', reducer)(ServicesApp);

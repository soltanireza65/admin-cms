import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import { Redirect, useParams } from 'react-router-dom';
import Domains from './Domains';
import WebsiteTemplate from './WebsiteTemplate';
import Settings from './Settings';
import { getServiceById } from '../store/servicesSlice';
import { LinearProgress, Typography } from '@material-ui/core';

const ServicesApp = () => {
	const pageLayout = useRef(null);
	const { t } = useTranslation('servicesApp');
	const dispatch = useDispatch();

	const { id } = useParams<{ id: string }>();
	const service = useSelector((store: any) => store.servicesApp.services.entities.find(service => service.id === id));
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchService = async () => {
			await dispatch(getServiceById(id));
			setLoading(false);
		};
		fetchService();
	}, []);

	return (
		<>
			<FusePageCarded
				classes={{
					root: 'w-full',
					header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136',
					content: 'max-h-full bg-transparent shadow-none'
				}}
				content={
					<div className="mt-16 px-0 md:px-32">
						{!service ? (
							loading ? (
								<div className="flex flex-1 flex-col items-center justify-center mt-96">
									<Typography className="text-20 mb-16" color="textSecondary">
										{t('please_wait')} ...
									</Typography>
									<LinearProgress className="w-xs" color="secondary" />
								</div>
							) : (
								<Redirect to="/apps/services/list" />
							)
						) : (
							<>
								<WebsiteTemplate portalId={service.id} templateId={service.templateId} />
								<Settings />
								<Domains domains={service.domains} portalId={service.id} />
							</>
						)}
					</div>
				}
				header={
					<Header>
						{service && (
							<>
								{t('service')} {service.id}
							</>
						)}
					</Header>
				}
				ref={pageLayout}
				useFuseScrollBar={false}
			/>
		</>
	);
};
export default withReducer('servicesApp', reducer)(ServicesApp);

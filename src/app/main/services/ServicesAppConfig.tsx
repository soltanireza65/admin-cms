import React from 'react';
import { Redirect } from 'react-router-dom';
import fa from './i18n/fa';
import en from './i18n/en';
import i18next from 'i18next';
i18next.addResourceBundle('en', 'servicesApp', en);
i18next.addResourceBundle('fa', 'servicesApp', fa);

const ServicesAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/services/add',
			component: React.lazy(() => import('./new-service/NewService'))
		},
		{
			path: '/apps/services/list',
			component: React.lazy(() => import('./ServicesApp'))
		},
		{
			path: '/apps/services/:id',
			component: React.lazy(() => import('./edit-service'))
		},
		{
			path: '/apps/services/*',
			component: () => <Redirect to="/apps/services/list" />
		}
	]
};

export default ServicesAppConfig;

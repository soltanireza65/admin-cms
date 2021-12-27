import React from 'react';
import i18next from 'i18next';
import fa from './i18n/fa';
import en from './i18n/en';
import { Redirect } from 'react-router-dom';
i18next.addResourceBundle('en', 'newsApp', en);
i18next.addResourceBundle('fa', 'newsApp', fa);

const NewsAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: ['/apps/news/newsdata/:newsid', '/apps/news/newsdata'],
			component: React.lazy(() => import('./newsEditor/index'))
		},
		{
			path: '/apps/news/list',
			component: React.lazy(() => import('./NewsApp'))
		},
		{
			path: '/apps/news',
			component: () => <Redirect to="/apps/news/list" />
		}
	]
};

export default NewsAppConfig;

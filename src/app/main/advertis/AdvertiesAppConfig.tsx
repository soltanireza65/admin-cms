import React from 'react';
import i18next from 'i18next';
import fa from './i18n/fa';
import en from './i18n/en';
i18next.addResourceBundle('fa', 'advertiesApp', fa);
i18next.addResourceBundle('en', 'advertiesApp', en);

const AdvertiesAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: ['/apps/advertiesApp'],
			component: React.lazy(() => import('./AdvertiesApp'))
		}
	]
};

export default AdvertiesAppConfig;

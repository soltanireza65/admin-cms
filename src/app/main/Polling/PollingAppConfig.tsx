import React from 'react';
import i18next from 'i18next';
import fa from './i18n/fa';
import en from './i18n/en';
i18next.addResourceBundle('en', 'PollingApp', en);
i18next.addResourceBundle('fa', 'PollingApp', fa);

const PollingAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: ['/apps/pollingApp'],
			component: React.lazy(() => import('./PollingApp'))
		}
	]
};

export default PollingAppConfig;

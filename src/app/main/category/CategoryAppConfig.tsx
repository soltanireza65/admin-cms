import CategoryApp from './CategoryApp';
import React from 'react';
import i18next from 'i18next';
import en from './i18n/en';
import fa from './i18n/fa';
import tr from './i18n/tr';
import ar from './i18n/ar';
i18next.addResourceBundle('en', 'categoryApp', en);
i18next.addResourceBundle('fa', 'categoryApp', fa);
i18next.addResourceBundle('ar', 'categoryApp', ar);
i18next.addResourceBundle('tr', 'categoryApp', tr);

const CategoryAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: ['/apps/categoryapp'],
			component: React.lazy(() => import('./CategoryApp'))
		}
	]
};

export default CategoryAppConfig;

import React from 'react';
import i18next from 'i18next';
import fa from './i18n/fa';
import en from './i18n/en';
i18next.addResourceBundle('en', 'chartApp', en);
i18next.addResourceBundle('fa', 'chartApp', fa);

const NewsAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/bourse/bubblechart',
			component: React.lazy(() => import('./bubbles/BubbleIndex'))
		},
		{
			path: '/apps/bourse/riskIndex',
			component: React.lazy(() => import('./riskIndices/RiskIndex'))
		}
	]
};

export default NewsAppConfig;

import React from 'react';
import i18next from 'i18next';
import fa from './i18n/fa';
import en from './i18n/en';
i18next.addResourceBundle('en', 'commentsApp', en);
i18next.addResourceBundle('fa', 'commentsApp', fa);

const CommentsAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: ['/apps/commentsApp'],
			component: React.lazy(() => import('./CommentsApp'))
		}
	]
};

export default CommentsAppConfig;

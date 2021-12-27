import React from 'react';
import i18next from 'i18next';
import en from './i18n/en';
import fa from './i18n/fa';
import tr from './i18n/tr';
import ar from './i18n/ar';
i18next.addResourceBundle('en', 'fileManagerApp', en);
i18next.addResourceBundle('fa', 'fileManagerApp', fa);
i18next.addResourceBundle('ar', 'fileManagerApp', ar);
i18next.addResourceBundle('tr', 'fileManagerApp', tr);

const FileManagerAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: ['/apps/filemanager'],
			component: React.lazy(() => import('./FileManager'))
		}
	]
};

export default FileManagerAppConfig;

import React from 'react';
import i18next from 'i18next';
import fa from './i18n/fa';
import en from './i18n/en';
import UserApp from './index';
i18next.addResourceBundle('en', 'usersApp', en);
i18next.addResourceBundle('fa', 'usersApp', fa);
const UserConfigApp = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/users',
			component: () => <UserApp />
		}
	]
};

export default UserConfigApp;

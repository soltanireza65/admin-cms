import React from 'react';
import i18next from 'i18next';
import Login from './login';
const CategoryAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: ['/auth/login'],
			component: Login
		}
	]
};

export default CategoryAppConfig;

import React from 'react';
import { Redirect } from 'react-router-dom';

const TagsAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/tags/list',
			component: React.lazy(() => import('./TagsApp'))
		},
		{
			path: '/apps/tags/*',
			component: () => <Redirect to="/apps/tags/list" />
		}
	]
};

export default TagsAppConfig;

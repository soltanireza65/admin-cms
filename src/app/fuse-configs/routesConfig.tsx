import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import CategoryAppConfig from 'app/main/category/CategoryAppConfig';
import NewsAppConfig from 'app/main/news/NewsConfigApp';
import FileManagerAppConfig from 'app/main/file-manger/FileManagerAppConfig';
import LoginConfig from 'app/auth/loginConfig';
import LogoutConfig from 'app/auth/logoutConfig';
import CommentsApp from 'app/main/comment/CommentAppConfig';
import ChartAppConfig from 'app/main/chartData/ChartAppConfig';
import AdvertiesAppConfig from 'app/main/advertis/AdvertiesAppConfig';
import UserAppConfig from 'app/main/users/UserConfigApp';
import PollingAppConfig from 'app/main/Polling/PollingAppConfig';
import TagsAppConfig from 'app/main/tags/TagsConfigApp';
import ServicesAppConfig from 'app/main/services/ServicesAppConfig';

const routeConfigs = [
	CategoryAppConfig,
	NewsAppConfig,
	ChartAppConfig,
	CommentsApp,
	FileManagerAppConfig,
	LoginConfig,
	LogoutConfig,
	AdvertiesAppConfig,
	UserAppConfig,
	PollingAppConfig,
	TagsAppConfig,
	ServicesAppConfig
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/apps/categoryapp"></Redirect>
	}
];

export default routes;

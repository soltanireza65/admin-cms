import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import fa from './navigation-i18n/fa';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
i18next.addResourceBundle('fa', 'navigation', fa);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'categories',
				title: 'Category',
				translate: 'Category',
				type: 'item',
				icon: 'folder',
				url: '/apps/categoryapp'
			},
			{
				id: 'filemanager',
				title: 'FileManager',
				translate: 'FileManager',
				type: 'item',
				icon: 'filemanger',
				url: '/apps/filemanager'
			},
			{
				id: 'news',
				title: 'News',
				translate: 'News',
				type: 'collapse',
				icon: 'list',
				children: [
					{
						id: 'newContent',
						title: 'NewContent',
						translate: 'NewContent',
						type: 'item',
						icon: 'new',
						url: '/apps/news/newsdata'
					},
					{
						id: 'newsList',
						title: 'NewsList',
						translate: 'NewsList',
						type: 'item',
						icon: 'news',
						url: '/apps/news/list'
					},
					{
						id: 'report',
						title: 'Report',
						translate: 'Report',
						type: 'item',
						icon: 'report',
						url: '/apps/news/report'
					}
				]
			},
			{
				id: 'bourse',
				title: 'Bourse',
				translate: 'Bourse',
				type: 'collapse',
				icon: 'chart',
				children: [
					{
						id: 'indices',
						title: 'Indices',
						translate: 'Indices',
						type: 'item',
						icon: 'folder',
						url: '/apps/bourse/bubblechart'
					},
					{
						id: 'risk',
						title: 'RiskIndex',
						translate: 'RiskIndex',
						type: 'item',
						icon: 'item',
						url: '/apps/bourse/riskIndex'
					}
				]
			},
			{
				id: 'commentmanager',
				title: 'CommentManager',
				translate: 'CommentManager',
				type: 'item',
				icon: 'message',
				url: '/apps/commentsapp'
			},
			{
				id: 'advertiesmanager',
				title: 'AdvertiesManager',
				translate: 'AdvertiesManager',
				type: 'item',
				icon: 'pageview',
				url: '/apps/advertiesapp'
			},
			{
				id: 'polling',
				title: 'نظرسنجی',
				translate: 'Polling',
				type: 'item',
				icon: 'folder',
				url: '/apps/pollingApp'

				// id: 'polling',
				// title: 'نظرسنجی',
				// translate: 'نظرسنجی',
				// type: 'collapse',
				// icon: 'list',
				// children: [
				// 	{
				// 		id: 'pollings',
				// 		title: 'نظرسنجی ها',
				// 		translate: 'نظرسنجی ها',
				// 		type: 'item',
				// 		icon: 'new',
				// 		url: '/apps/pollingApp'
				// 	},
				// 	{
				// 		id: 'newPolling',
				// 		title: 'نظرسنجی جدید',
				// 		translate: 'نظرسنجی جدید',
				// 		type: 'item',
				// 		icon: 'new',
				// 		url: '/apps/pollingApp/newpolling'
				// 	}
				// ]
			},
			{
				id: 'users',
				title: 'Users',
				translate: 'Users',
				type: 'item',
				icon: 'people',
				url: '/apps/users'
			},
			{
				id: 'tags',
				title: 'Tags',
				translate: 'Tags',
				type: 'item',
				icon: 'label',
				url: '/apps/tags/list'
			},
			{
				id: 'servicesManager',
				title: 'ServicesManager',
				translate: 'services_manager',
				type: 'collapse',
				icon: 'home',
				children: [
					{
						id: 'services',
						title: 'services',
						translate: 'services',
						type: 'item',
						icon: 'new',
						url: '/apps/services/list'
					},
					{
						id: 'addService',
						title: 'addService',
						translate: 'add_service',
						type: 'item',
						icon: 'news',
						url: '/apps/services/add'
					}
				]
			},
			{
				id: 'logout',
				title: 'Logout',
				translate: 'Logout',
				type: 'item',
				icon: 'logout',
				url: '/apps/logout'
			}
		]
	}
];

export default navigationConfig;

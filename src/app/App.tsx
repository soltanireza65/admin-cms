import MomentUtils from '@date-io/moment';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import history from '@history';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import React from 'react';
import Provider from 'react-redux/es/components/Provider';
import { Router } from 'react-router-dom';
import AppContext from './AppContext';
import routes from './fuse-configs/routesConfig';
import store from './store';
import i18next from 'i18next';
import './mainLocalizer';
import shareCategoryFa from './main/shared-components/category/i18n/fa';
import { SnackbarProvider } from 'notistack';
import Auth from 'app/auth/Auth';
import 'react-image-crop/dist/ReactCrop.css';
import SimpleReactLightbox from 'simple-react-lightbox';
import 'react-image-lightbox/style.css';
import './App.css';

const jss = create({
	...jssPreset(),
	plugins: [...jssPreset().plugins.map(function(p): any { return p }), jssExtend(), rtl()],
	insertionPoint: document.getElementById('jss-insertion-point')
});
const generateClassName = createGenerateClassName();
i18next.addResourceBundle('fa', 'shareCategory', shareCategoryFa);

const App = () => {
	return (
		<AppContext.Provider
			value={{
				routes
			}}
		>
			<StylesProvider jss={jss} generateClassName={generateClassName}>
				<Provider store={store}>
					<SimpleReactLightbox>
						<MuiPickersUtilsProvider utils={MomentUtils}>
							<Auth>
								<Router history={history}>
									<FuseTheme>
										<SnackbarProvider maxSnack={3}>
											<FuseLayout />
										</SnackbarProvider>
									</FuseTheme>
								</Router>
							</Auth>
						</MuiPickersUtilsProvider>
					</SimpleReactLightbox>
				</Provider>
			</StylesProvider>
		</AppContext.Provider>
	);
};

export default App;

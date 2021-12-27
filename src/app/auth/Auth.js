/* eslint-disable lines-between-class-members */
import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import history from '@history';

import { AuthService } from 'api/Http/authService';
class Auth extends Component {
	state = {
		waitAuthCheck: false,
		isLoggedIn: false
	};

	componentDidMount() {
		this.authValidate();
	}

	authValidate = async () => {
		const auth = new AuthService();
		if (history.location.pathname.indexOf('login') > -1) {
			// TODO Check login problem if it solved
			if (!history.location.search.includes('error')) {
				auth.signinSilentCallback()
					.then(() => {
						this.setState({ isLoggedIn: true });
						this.setState({ waitAuthCheck: false });
						history.push({
							pathname: '/apps/categoryapp'
						});
					})
					.catch(x => {
						window.location.href = 'https://idp.behsoud.com/Account/Login';
					});
			} else {
				await auth.login();
			}
		} else {
			await auth.renewToken();
			const user = await auth.getUser();
			if (user != null && user != undefined && user) {
				if (!user.expired) {
					this.setState({ isLoggedIn: true });

					this.setState({ waitAuthCheck: false });
				} else {
					this.setState({ waitAuthCheck: true });
					auth.renewToken().then(console.log);
				}
			} else {
				await auth.login();
			}
		}
	};
	render() {
		return this.state.waitAuthCheck ? <FuseSplashScreen /> : this.state.isLoggedIn && <>{this.props.children}</>;
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			// logout: logoutUser,
			// setUserData,
			// setUserDataAuth0,
			// setUserDataFirebase,
			// showMessage,
			// hideMessage
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(Auth);

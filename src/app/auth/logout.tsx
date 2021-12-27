import React, { useEffect } from 'react';
import { ButtonDiv } from './styles/buttons';
import Typography from '@material-ui/core/Typography';
function Logout() {
	useEffect(() => {
		localStorage.removeItem('access_token');
		window.location.href = 'https//idp.behsoud.com/Account/Logout';
	}, []);
	return (
		<div id="fuse-splash-screen">
			<div className="center">
				<div className="logo">
					<img width="128" src="assets/images/logos/behsoud.svg" alt="logo" />
				</div>
				<div className="logo">
					<Typography variant="h5" color="primary" />
					<ButtonDiv />
				</div>
			</div>
		</div>
	);
}

export default React.memo(Logout);

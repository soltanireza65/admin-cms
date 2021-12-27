import FuseAnimate from '@fuse/core/FuseAnimate';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import clsx from 'clsx';
const useStyles = makeStyles({
	root: {
		'text-align': '-webkit-center !important'
	},
	appBar: {
		maxWidth: '40%'
	}
});

export default (pageLayout: any) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const searchText = useSelector(({ contactsApp }: any) => contactsApp.contacts.searchText);
	const mainTheme = useSelector(selectMainTheme);
	const [tabState, setTabState] = React.useState(0);

	const handleTab = x => {
		setTabState(x);
	};
	return (
		<div className={clsx('flex flex-1 items-center justify-between p-8 sm:p-24', classes.root)}>
			<div className=" w-full items-center justify-center px-8 sm:px-12">
				<ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Paper className="flex p-4 items-center w-full h-48 px-8 py-4 rounded-8" elevation={1}>
							<Icon color="action">search</Icon>

							<Input
								placeholder="Search for anything"
								className="flex flex-1 px-16"
								disableUnderline
								fullWidth
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								// onChange={ev => dispatch(setContactsSearchText(ev))}
							/>
							<Hidden lgUp>
								<IconButton
									onClick={ev => pageLayout.current.toggleRightSidebar()}
									aria-label="open right sidebar"
								>
									<Icon>menu</Icon>
								</IconButton>
							</Hidden>
						</Paper>
					</FuseAnimate>
					<FuseAnimate delay={100}>
						<Tabs
							className={classes.appBar}
							value={tabState}
							onChange={handleTab}
							aria-label="nav tabs example"
						>
							<Tab className=" text-base" onClick={x => handleTab(0)} label="شخصی" />
							<Tab className=" text-base" onClick={x => handleTab(1)} label="عمومی" />
						</Tabs>
					</FuseAnimate>
				</ThemeProvider>
			</div>
		</div>
	);
};

import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { useTranslation } from 'react-i18next';
import { Hidden, IconButton } from '@material-ui/core';

const Header = ({ handleChange, pageLayout }) => {
	const mainTheme = useSelector(selectMainTheme);
	const [search, setSearch] = useState<string>();

	const { t } = useTranslation('categoryApp');

	const handleChangeText = (text: string) => {
		setSearch(text);
		handleChange(text);
	};
	return (
		<ThemeProvider theme={mainTheme}>
			<div className="flex flex-1">
				<Paper
					className="flex items-center w-full h-48 sm:h-56 p-16 ltr:pl-4 lg:ltr:pl-16 rtl:pr-4 lg:rtl:pr-16 rounded-8"
					elevation={1}
				>
					<Hidden lgUp>
						<IconButton
							onClick={ev => pageLayout.current.toggleLeftSidebar()}
							aria-label="open left sidebar"
						>
							<Icon>menu</Icon>
						</IconButton>
					</Hidden>
					<Icon color="action">search</Icon>

					<Input
						placeholder={t('header_search')}
						className="px-16"
						disableUnderline
						value={search}
						fullWidth
						inputProps={{
							'aria-label': t('header_search')
						}}
						onChange={ev => handleChangeText(ev.target.value)}
					/>
				</Paper>
			</div>
		</ThemeProvider>
	);
};

export default Header;

import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '@fuse/hooks';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import HtmlTootTip from '../shared-components/HtmlTooltip';
import FilterList from '@material-ui/icons/FilterList';

function Header({ handleChangeText }) {
	const dispatch = useDispatch();
	const mainTheme = useSelector(selectMainTheme);
	const [typeSearch, setTypeSearch] = useState<any>(0);

	const handleChangeItems = e => {
		setTypeSearch(e?.target?.value);
	};
	const { t } = useTranslation('usersApp');
	return (
		<ThemeProvider theme={mainTheme}>
			<div className="flex flex-1">
				<Paper
					className="flex items-center w-full h-48 sm:h-56 p-16 ltr:pl-4 lg:ltr:pl-16 rtl:pr-4 lg:rtl:pr-16 rounded-8"
					elevation={1}
				>
					<Icon color="action">search</Icon>
					<Input
						placeholder={t('header_search')}
						className="px-16"
						disableUnderline
						fullWidth
						inputProps={{
							'aria-label': t('header_search')
						}}
						onChange={ev => handleChangeText(ev.target.value, typeSearch)}
					/>
					<FormControl className="w-1/6 ml-5">
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							name="newsType"
							value={typeSearch}
							onChange={handleChangeItems}
						>
							<MenuItem value={0}>{t('header_search_userid')}</MenuItem>
							<MenuItem value={1}>{t('header_search_email')}</MenuItem>
							<MenuItem value={2}>{t('header_search_phone')}</MenuItem>
						</Select>
					</FormControl>
				</Paper>
			</div>
		</ThemeProvider>
	);
}

export default Header;

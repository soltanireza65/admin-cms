import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '@fuse/hooks';
import { getPollings } from './store/pollingSlice';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { NewsApi } from 'api/News/index';
function Header(props) {
	const dispatch = useDispatch();
	const mainTheme = useSelector(selectMainTheme);
	const [options, setOptions] = React.useState<INewsInterface.INewsDTO[]>([]);
	const [selectedNews, setSelectedNews] = useState<INewsInterface.INewsDTO>(null);

	const handleChangeText = useDebounce(async (text: any) => {
		if (text.length < 3) {
			return null;
		}
		const request = await NewsApi.manageNews({ titr: text });
		const { data } = await request;

		if (data.length === 0) {
			setOptions([]);
		}
		setOptions(Object.keys(data).map(key => data[key]) as INewsInterface.INewsDTO[]);
	}, 200);
	const handleChangeNews = (item: any) => {
		if (item && item.id) {
			// dispatch(getComments({ ContentId: item.id }));

			setSelectedNews(item);
		} else {
			// dispatch(getComments({}));
			setSelectedNews(null);
		}
	};
	const { t } = useTranslation('newsApp');
	return (
		<ThemeProvider theme={mainTheme}>
			<div className="flex flex-1">
				<Paper
					className="flex items-center w-full h-48 sm:h-56 p-16 ltr:pl-4 lg:ltr:pl-16 rtl:pr-4 lg:rtl:pr-16 rounded-8"
					elevation={1}
				>
					<Hidden lgUp>
						<IconButton
							onClick={ev => props.pageLayout.current.toggleLeftSidebar()}
							aria-label="open left sidebar"
						>
							<Icon>menu</Icon>
						</IconButton>
					</Hidden>

					<Icon color="action">search</Icon>
					<Autocomplete
						classes={{
							root: 'w-full'
						}}
						id="checkboxes-tags-demo"
						options={options}
						noOptionsText={t('suggestion_no_Options')}
						onChange={(event: any, newValue: string | null) => {
							handleChangeNews(newValue);
						}}
						onInputChange={(event, value) => {
							handleChangeText(value);
						}}
						getOptionLabel={(option: INewsInterface.INewsDTO) => `${option.titr}-${option.newsCode}`}
						renderOption={(option, { selected }) => (
							<>
								{option.titr}-{option.newsCode}
							</>
						)}
						renderInput={params => (
							<TextField {...params} variant="outlined" label={t('suggestion_t_title')} />
						)}
					/>
				</Paper>
			</div>
		</ThemeProvider>
	);
}

export default Header;

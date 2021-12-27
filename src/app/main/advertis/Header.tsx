import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { getAdvertisesList } from './store/advertiesSlice';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '@fuse/hooks';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// import FilterList from '@material-ui/icons/FilterList';
// import FilterDialog from './FilterDialog';

function Header(props) {
	const dispatch = useDispatch();
	const mainTheme = useSelector(selectMainTheme);
	const [typeSearch, setTypeSearch] = useState<any>();
	const [openDialogFilter, setOpenDialogFilter] = React.useState(false);
	//add filter to redux
	const handleOpenFilter = () => {
		setOpenDialogFilter(true);
	};
	const handleCloseFilter = () => {
		setOpenDialogFilter(false);
	};
	const handleChangeText = useDebounce(async (text: string, typeSearch2: number) => {
		let filterData: {
			title?: string;
			Id?: string;
		} = {};
		switch (typeSearch2) {
			case 0:
				filterData = {
					title: text
				};
				break;
			case 1:
				filterData = {
					Id: text
				};
				break;
			default:
				filterData = {
					title: text
				};
				break;
		}
		dispatch(getAdvertisesList({ ...filterData }));
	}, 600);
	const handleChangeItems = e => {
		setTypeSearch(e.target.value);
	};
	const { t } = useTranslation('advertiesApp');
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
							<MenuItem value={0}>{t('header_search_menu_title')}</MenuItem>
							<MenuItem value={1}>{t('header_search_menu_id')}</MenuItem>
						</Select>
					</FormControl>
					{/*	<HtmlTootTip title={'جستجوی پیشرفته'}>
						<IconButton onClick={handleOpenFilter}>
							<FilterList />
						</IconButton>
					</HtmlTootTip> */}
				</Paper>
				{/*			<FilterDialog open={openDialogFilter} handleClose={handleCloseFilter} />*/}
			</div>
		</ThemeProvider>
	);
}

export default Header;

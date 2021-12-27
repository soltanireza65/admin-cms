import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import clsx from 'clsx';
import { getSuggestTagsByTitle, manageTags } from '../shared-components/tags/store/tagsSlice';
import { useDebounce } from '@fuse/hooks';
import { useTranslation } from 'react-i18next';
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
	const mainTheme = useSelector(selectMainTheme);

	const handleChangeText = useDebounce(async (text: string) => {
		if (text) dispatch(getSuggestTagsByTitle({ title: text }));
		else dispatch(manageTags({}));
	}, 200);

	const { t } = useTranslation('tagApp');

	return (
		<div className={clsx('flex flex-1 items-center justify-between py-8 sm:py-24', classes.root)}>
			<div className=" w-full items-center justify-center">
				<ThemeProvider theme={mainTheme}>
					<div className="flex items-center" style={{ whiteSpace: 'nowrap' }}>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<span className="text-24 mr-16 ml-32">
								{/* {t('sidebar_header_title')} */}
								{t('tags')}
							</span>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Paper className="flex p-4 items-center w-full h-48 px-8 py-4 rounded-8" elevation={1}>
								<Icon color="action">search</Icon>

								<Input
									placeholder={t('search')}
									className="flex flex-1 px-16"
									disableUnderline
									fullWidth
									inputProps={{
										'aria-label': 'Search'
									}}
									onChange={ev => handleChangeText(ev.target.value)}
								/>
							</Paper>
						</FuseAnimate>
					</div>
				</ThemeProvider>
			</div>
		</div>
	);
};

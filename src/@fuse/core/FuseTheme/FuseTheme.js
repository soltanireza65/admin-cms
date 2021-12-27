import { ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { getAllCategories } from 'app/store/fuse/categorySlice';

const useEnhancedEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function FuseTheme(props) {
	const direction = useSelector(({ fuse }) => fuse.settings.defaults.direction);
	const mainTheme = useSelector(selectMainTheme);

	const dispatch = useDispatch();
	useEnhancedEffect(() => {
		dispatch(getAllCategories({ Flated: true }));
		document.body.dir = direction;
	}, [direction]);

	// console.warn('FuseTheme:: rendered',mainTheme);
	return <ThemeProvider theme={mainTheme}>{props.children}</ThemeProvider>;
}

export default React.memo(FuseTheme);

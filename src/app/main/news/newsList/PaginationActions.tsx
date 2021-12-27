import React, { useState } from 'react';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useTheme } from '@material-ui/core/styles';
import { IPaginationActions } from '../interfaces/props';
import TextField from '@material-ui/core/TextField';
import { manageNews } from '../store/newsSlice';
import { useDebounce } from '@fuse/hooks';

export default ({ dispatch }) => {
	const theme = useTheme();

	const [page, setPage] = useState<number>(1);
	const handleChangePage = useDebounce(p => {
		dispatch(manageNews({ page: p, count: 20 }));
	}, 200);
	const handleFirstPageButtonClick = event => {
		setPage(1);
		handleChangePage();
	};

	const handleBackButtonClick = event => {
		setPage(page - 1);
		handleChangePage(page - 1);
	};

	const handleNextButtonClick = event => {
		setPage(page + 1);
		handleChangePage(page + 1);
	};
	const handleGotoPage = event => {
		setPage(parseInt(event.target.value));
		handleChangePage(parseInt(event.target.value));
	};

	return (
		<div className="flex-shrink-0  px-12 overflow-hidden">
			<IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<TextField className="w-1/5 text-center" onChange={handleGotoPage} value={page} type="number"></TextField>
			<IconButton onClick={handleNextButtonClick} aria-label="next page">
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
		</div>
	);
};

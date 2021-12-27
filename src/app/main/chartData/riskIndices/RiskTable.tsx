import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';

import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { IBuubleTableProps } from '../interfaces/props';
import PaginationActions from '../../shared-components/PaggenationActions';
const useStyles = makeStyles(theme => ({
	root: {
		'&:nth-child(even)': {
			'background-color': theme.palette.type === 'light' ? '#f2f2f2;' : theme.palette.secondary
		},
		'&:nth-child(odd)': {
			'background-color': theme.palette.type === 'light' ? '#fff;' : theme.palette.primary.main
		}
	}
}));

export default ({ columns, data }: IBuubleTableProps) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const {
		getTableProps,
		headerGroups,
		prepareRow,
		page,
		gotoPage,
		setPageSize,
		state: { pageIndex, pageSize }
	} = useTable(
		{
			columns,
			data,
			autoResetPage: true
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		hooks => {
			hooks.allColumns.push(_columns => [..._columns]);
		}
	);

	const handleChangePage = (event, newPage) => {
		gotoPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setPageSize(Number(event.target.value));
	};

	return (
		<div className="flex flex-col min-h-full sm:border-1 sm:rounded-16 overflow-hidden">
			<TablePagination
				component="div"
				classes={{
					root: 'overflow-hidden flex-shrink-0 border-0',
					spacer: 'w-0 max-w-0'
				}}
				colSpan={5}
				count={data.length}
				rowsPerPage={10}
				rowsPerPageOptions={[]}
				page={pageIndex}
				labelDisplayedRows={({ from, to, count }) => {
					return <h6>{`${from}-${to} از ${count !== -1 ? count : `more than ${to}`}`}</h6>;
				}}
				SelectProps={{
					inputProps: { 'aria-label': 'rows per page' },
					native: false
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
				ActionsComponent={PaginationActions}
			/>
			<TableContainer className="flex flex-1">
				<Table {...getTableProps()} stickyHeader>
					<TableHead className="overflow-hidden">
						{headerGroups.map(headerGroup => (
							<TableRow {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => {
									return (
										<TableCell
											className="whitespace-no-wrap p-12"
											{...(!column.sortable
												? column.getHeaderProps()
												: column.getHeaderProps(column.getSortByToggleProps()))}
											onClick={() => {
												// dispatch();
											}}
										>
											{column.render('Header')}
										</TableCell>
									);
								})}
							</TableRow>
						))}
					</TableHead>
					<TableBody className="overflow-y overflow-x">
						{page.map((row, i) => {
							prepareRow(row);
							return (
								<TableRow
									{...row.getRowProps()}
									// onClick={ev => onRowClick(ev, row)}
									className={clsx('truncate cursor-pointer', classes.root)}
								>
									{row.cells.map(cell => {
										return (
											<TableCell
												{...cell.getCellProps()}
												className={clsx('p-12', cell.column.className)}
											>
												{cell.render('Cell')}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

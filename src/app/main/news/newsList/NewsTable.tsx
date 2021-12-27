import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import clsx from 'clsx';
import { INewsListProps } from '../interfaces/props';
import makeStyles from '@material-ui/core/styles/makeStyles';
import LocationsFormDialog from './LocationsForm';
import DeleteDialog from './StatusDialog';
import DatePublishTime from './DatePublish';
import { useDispatch, useSelector } from 'react-redux';
import { manageNews } from '../store/newsSlice';
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

export default ({ columns, data, onRowClick }: INewsListProps) => {
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
		hooks => {
			hooks.allColumns.push(_columns => [
				// Let's make a column for selection
				{
					id: 'selection',
					sortable: false,
					// The header can use the table's getToggleAllRowsSelectedProps method
					// to render a checkbox.  Pagination is a problem since this will select all
					// rows even though not all rows are on the current page.  The solution should
					// be server side pagination.  For one, the clients should not download all
					// rows in most cases.  The client should only download data for the current page.
					// In that case, getToggleAllRowsSelectedProps works fine.
					Header: ({ getToggleAllRowsSelectedProps }) => {
						return <div></div>;
					},
					// The cell can use the individual row's getToggleRowSelectedProps method
					// to the render a checkbox
					Cell: ({ row }) => <div></div>
				},
				..._columns
			]);
		}
	);

	const newsData = useSelector(({ newsApp }: any) => newsApp.news);
	useEffect(() => {
		setPageSize(Number(50));
	}, []);

	return (
		<div className="flex flex-col min-h-full sm:border-1 sm:rounded-16 overflow-hidden">
			<TableContainer>
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
												dispatch(
													manageNews({
														orderByFieldName:
															column.id.charAt(0).toUpperCase() + column.id.slice(1),
														orderByDescending:
															newsData.columnSorted.toLowerCase() !==
															column.id.toLowerCase()
																? false
																: !newsData.orderDescending
													})
												);
											}}
										>
											{column.render('Header')}
											{column.sortable ? (
												<TableSortLabel
													active={
														newsData.columnSorted.toLowerCase() === column.id.toLowerCase()
													}
													// react-table has a unsorted state which is not treated here
													direction={newsData.orderDescending ? 'desc' : 'asc'}
												/>
											) : null}
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
									onClick={ev => onRowClick(ev, row)}
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
			<DeleteDialog />
			<DatePublishTime />
			<LocationsFormDialog />
		</div>
	);
};

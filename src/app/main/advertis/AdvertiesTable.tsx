import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
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
interface INewsListProps {
	columns: any;
	data: any;
	onRowClick: Function;
}
export default ({ columns, data, onRowClick }: INewsListProps) => {
	const classes = useStyles();
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
			hooks.allColumns.push(_columns => [..._columns]);
		}
	);

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
		</div>
	);
};

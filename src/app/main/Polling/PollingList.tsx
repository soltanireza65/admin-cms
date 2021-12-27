import { Button, IconButton, LinearProgress, TableFooter, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TocIcon from '@material-ui/icons/Toc';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSwitch from '../shared-components/async-switch/AsyncSwitch';
import DeletePollingDialog from './DeletePollingDialog';
import PollingDialog from './PollingDialog';
import PollingOptionsDialog from './PollingOptionsDialog';
import {
	changePollingStatus,
	getPollings,
	openPollingOptionsDialog,
	setAddDialogOpen,
	setDeletePollingDialogOpen,
	setEditDialogOpen,
	setStatus
} from './store/pollingSlice';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: '#fff'
		},
		table: {
			minWidth: 650
		},
		root: {
			width: '100%',
			position: 'relative',
			display: 'flex',
			height: '100%',
			flexDirection: 'column'
		},
		container: {
			maxHeight: 440
		}
	})
);

const PollingList = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { entities, loading, hasError, loadingSwitches, status } = useSelector(
		({ pollingApp }: any) => pollingApp.polling
	);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	useEffect(() => {
		if (entities.length === 0) dispatch(getPollings({ count: rowsPerPage }));
	}, []);

	const { t } = useTranslation('PollingApp');

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		// dispatch(getPollings({ status: 1, count: 1, page: 1, totalPage: 1 }));
	};
	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleChangeStatus = (id, checked) => {
		dispatch(changePollingStatus({ id: id, status: checked ? 2 : 1 }));
	};

	const getModuleType = id => {
		switch (id) {
			case 1:
				return t('news');
				break;
			case 16:
				return t('category');
				break;

			default:
				break;
		}
	};

	// 1 => deactive 2 => active 3 => all
	const handleUpdateStatus = (event, status: 1 | 2 | 0) => {
		dispatch(getPollings({ status }));
		dispatch(setStatus(status));
	};

	return (
		<div className={classes.root}>
			<div className="flex flex-col-reverse sm:flex-row justify-between sm:items-center m-16">
				<Tabs
					value={status}
					indicatorColor="primary"
					textColor="primary"
					onChange={handleUpdateStatus}
					aria-label="disabled tabs example"
				>
					<Tab label="همه" value={0} className="flex-1" />
					<Tab label="فعال" value={2} className="flex-1" />
					<Tab label="غیر فعال" value={1} className="flex-1" />
				</Tabs>
				<Button
					color="primary"
					variant="contained"
					className="mb-8 md:mb-0"
					onClick={() => {
						dispatch(setAddDialogOpen(true));
					}}
				>
					{t('addPollings')}
				</Button>
			</div>

			<PollingDialog />
			<DeletePollingDialog />
			<PollingOptionsDialog />
			{loading ? (
				<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
					<Typography className="text-20 mb-16" color="textSecondary">
						{t('please_wait')} ...
					</Typography>
					<LinearProgress className="w-xs" color="secondary" />
				</div>
			) : !entities || entities.length === 0 ? (
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						{t('no_data')}
					</Typography>
				</div>
			) : (
				<>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									{/* {columns.map(column => (
								<TableCell key={column.id} style={{ minWidth: column.minWidth }}>
									{column.label}
								</TableCell>
							))} */}
									{/* <TableCell style={{ maxWidth: '70px' }}>ID</TableCell> */}
									<TableCell>{t('title')}</TableCell>
									<TableCell>{t('status')}</TableCell>
									<TableCell>{t('content_code')}</TableCell>
									<TableCell>{t('content_type')}</TableCell>
									<TableCell>{t('options')}</TableCell>
									<TableCell align="center">{t('actions')}</TableCell>
									{/* <TableCell>تاریخ ایجاد</TableCell> */}
									{/* <TableCell>تاریخ بروزرسانی</TableCell> */}
								</TableRow>
							</TableHead>
							<TableBody>
								{entities &&
									entities.length > 0 &&
									entities
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((item, index) => {
											console.log('Item: ', item);

											return (
												<TableRow key={item.id}>
													{/* <TableCell>{item.id}</TableCell> */}
													<TableCell component="th" scope="row">
														{item.title}
													</TableCell>
													<TableCell>
														{item.status == 2 ? t('active') : t('disable')}
													</TableCell>
													<TableCell>{item.contentId}</TableCell>
													<TableCell>{getModuleType(item.moduleType)}</TableCell>
													<TableCell>
														<IconButton
															aria-label="options"
															onClick={() =>
																dispatch(
																	openPollingOptionsDialog({
																		options: item.options,
																		pollingId: item.id
																	})
																)
															}
														>
															<TocIcon />
														</IconButton>
													</TableCell>
													<TableCell className="flex">
														<div className="relative">
															<AsyncSwitch
																checked={item.status == 2}
																handleChange={(evt, checked) =>
																	handleChangeStatus(item.id, checked)
																}
																loading={loadingSwitches[item.id]}
															/>
														</div>
														<IconButton
															onClick={() => {
																dispatch(
																	setDeletePollingDialogOpen({
																		id: item.id,
																		title: item.title
																	})
																);
															}}
														>
															<DeleteIcon />
														</IconButton>
														<IconButton
															onClick={() => {
																dispatch(
																	setEditDialogOpen({ show: true, polling: item })
																);
															}}
														>
															<EditIcon />
														</IconButton>
													</TableCell>
													{/* <TableCell>{item.persianCreatedDateTime}</TableCell> */}
													{/* <TableCell>{item.persianLastModifiedDateTime}</TableCell> */}
												</TableRow>
											);
										})}
							</TableBody>
						</Table>
						<TableFooter className="float-left">
							<TablePagination
								rowsPerPageOptions={[10, 25, 100]}
								component="div"
								count={entities.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
								labelRowsPerPage={<p>{t('per_page')}</p>}
							/>
						</TableFooter>
					</TableContainer>
				</>
			)}
		</div>
	);
};

export default PollingList;

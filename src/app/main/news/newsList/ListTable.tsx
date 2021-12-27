import React from 'react';
import { Icon, IconButton } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import _ from '@lodash';
import LinearProgress from '@material-ui/core/LinearProgress';
import { red, yellow, green, grey } from '@material-ui/core/colors';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import NewsTable from './NewsTable';
import { setDialogCategoryState } from '../store/locationsFormSlice';
import { openDeleteDialog, suspendNews } from '../store/statusSlice';
import { publishNews, openPublishDialog } from '../store/newsSlice';
import HtmlTootip from 'app/main/shared-components/HtmlTooltip';
import history from '@history';
const ListTable = props => {
	const dispatch = useDispatch();
	const news = useSelector(({ newsApp }: any) => newsApp.news);

	const { t } = useTranslation('newsApp');
	const columns = React.useMemo(
		() => [
			{
				Header: t('t_id'),
				accessor: 'newsCode',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: t('t_title'),
				accessor: 'titr',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: t('t_viewCount'),
				accessor: 'viewCount',
				sortable: true
			},

			{
				id: 'locations_list',
				Header: t('t_locations_list'),
				width: 30,
				sortable: false,
				Cell: ({ row }) => (
					<div className="flex items-center">
						<HtmlTootip title={t('t_locations_description')}>
							<IconButton
								onClick={ev => {
									ev.stopPropagation();
									dispatch(setDialogCategoryState(true, row.original));
									// dispatch(removeContact(row.original.id));
								}}
							>
								<Icon style={{ color: yellow[900] }}>folder</Icon>
							</IconButton>
						</HtmlTootip>
					</div>
				)
			},

			{
				Header: t('t_author'),
				accessor: 'authorUserFullName',
				sortable: true
			},
			{
				Header: t('t_lastModifiedUser'),
				accessor: 'lastModifiedUserFullName',
				sortable: true
			},
			{
				Header: t('t_add_edit_date'),
				accessor: 'persianLastModifiedDateTime',
				sortable: true
			},
			{
				Header: t('t_pub_date'),
				accessor: 'persianStartPublishDateTime',
				sortable: true
			},
			{
				id: 'action',
				Header: t('t_actions'),
				width: 128,
				sortable: false,
				Cell: ({ row }) => (
					<div className="flex items-center">
						<HtmlTootip title={t('t_publish_feature_description')}>
							<IconButton
								onClick={ev => {
									ev.stopPropagation();
									dispatch(
										openPublishDialog(row.original.id, row.original.titr, row.original.newCode)
									);
								}}
							>
								<Icon style={{ color: green[500] }}>date_range</Icon>
							</IconButton>
						</HtmlTootip>
						<HtmlTootip title={t('t_publish_description')}>
							<IconButton
								onClick={ev => {
									ev.stopPropagation();
									dispatch(publishNews({ id: row.original.id, titr: row.original.titr }));
								}}
							>
								<Icon style={{ color: green[500] }}>publish</Icon>
							</IconButton>
						</HtmlTootip>
						<HtmlTootip title={t('t_suspend_description')}>
							<IconButton
								onClick={ev => {
									ev.stopPropagation();
									dispatch(suspendNews({ ...row.original }));
									// dispatch(removeContact(row.original.id));
								}}
							>
								<Icon style={{ color: grey[600] }}>block</Icon>
							</IconButton>
						</HtmlTootip>
						<HtmlTootip title={t('t_edit')}>
							<IconButton
								onClick={ev => {
									ev.stopPropagation();
									history.push(`/apps/news/newsdata/${row.original.id}`);
								}}
							>
								<Icon>edit</Icon>
							</IconButton>
						</HtmlTootip>
						<HtmlTootip title={t('t_delete_description')}>
							<IconButton
								onClick={ev => {
									ev.stopPropagation();
									dispatch(
										openDeleteDialog({
											id: row.original.id,
											titr: row.original.titr,
											titleStatus: 'حذف شده'
										})
									);
								}}
							>
								<Icon style={{ color: red[500] }}>delete</Icon>
							</IconButton>
						</HtmlTootip>
					</div>
				)
			}
		],
		[dispatch, news.entities]
	);

	if (news.loading) {
		return (
			<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
				<Typography className="text-20 mb-16" color="textSecondary">
					{t('please_wait')} ...
				</Typography>
				<LinearProgress className="w-xs" color="secondary" />
			</div>
		);
	}

	if (!news.entities) {
		return null;
	}
	if (news.entities.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					{t('no_data')}
				</Typography>
			</div>
		);
	}

	return (
		<>
			<NewsTable
				columns={columns}
				data={news.entities}
				onRowClick={(ev, row) => {
					if (row) {
						// dispatch(openEditContactDialog(row.original));
					}
				}}
			/>
		</>
	);
};
export default ListTable;

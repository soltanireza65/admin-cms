import React from 'react';
import { FormControlLabel, Icon, IconButton } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import _ from '@lodash';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import HtmlTootip from 'app/main/shared-components/HtmlTooltip';
import IosSwitch from '../shared-components/IosSwitch';
import AdvertiesTable from './AdvertiesTable';
import { changeAdvertiseStatus, deleteDialogOpenState, dialogOpenState } from './store/advertiesSlice';
import { red, yellow, green, grey } from '@material-ui/core/colors';

export default () => {
	const dispatch = useDispatch();
	const advertiesStore = useSelector(({ advertiesApp }: any) => advertiesApp.adverties);

	const { t, i18n } = useTranslation('advertiesApp');
	const handleChangeActiveState = (id: string, statusOriginal: AdvertiesInterface.Status, title: string) => {
		const status: AdvertiesInterface.Status = statusOriginal == 1 ? 2 : 1;
		dispatch(changeAdvertiseStatus({ id, status, title }));
	};
	const columns = React.useMemo(
		() => [
			{
				Header: t('t_id'),
				accessor: 'id',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: t('t_title'),
				accessor: 'title',
				className: 'font-bold',
				sortable: true
			},
			{
				id: 'status',
				Header: t('t_status'),
				width: 128,
				sortable: false,
				Cell: ({ row }) => (
					<div className="flex items-center">
						<HtmlTootip title={t('t_status_description')}>
							<FormControlLabel
								control={
									<IosSwitch
										value={row.original.status}
										checked={row.original.status == 2}
										onChange={() =>
											handleChangeActiveState(
												row.original.id,
												row.original.status,
												row.original.title
											)
										}
										name="isLockedForPublicView"
									/>
								}
								label={row.original.status == 2 ? t('t_status_active') : t('t_status_disactive')}
							/>
						</HtmlTootip>
					</div>
				)
			},
			{
				id: 'actions',
				Header: t('t_actions'),
				width: 128,
				sortable: false,
				Cell: ({ row }) => (
					<div className="flex items-center">
						<HtmlTootip title={t('t_edit')}>
							<IconButton
								onClick={ev => {
									ev.stopPropagation();
									dispatch(dialogOpenState({ ...row.original }, true, 'edit'));
								}}
							>
								<Icon>edit</Icon>
							</IconButton>
						</HtmlTootip>
						<HtmlTootip title={t('t_delete_description')}>
							<IconButton
								onClick={ev => {
									ev.stopPropagation();
									dispatch(deleteDialogOpenState(row.original.id, row.original.title, true));
								}}
							>
								<Icon style={{ color: red[500] }}>delete</Icon>
							</IconButton>
						</HtmlTootip>
					</div>
				)
			},

			{
				Header: t('t_linkUrl'),
				accessor: 'linkUrl',
				sortable: true
			},

			{
				Header: t('t_hitCount'),
				accessor: 'hitCount',
				sortable: true
			}
		],
		[dispatch, advertiesStore.entities, i18n.language]
	);

	if (advertiesStore.loading) {
		return (
			<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
				<Typography className="text-20 mb-16" color="textSecondary">
					{t('please_wait')} ...
				</Typography>
				<LinearProgress className="w-xs" color="secondary" />
			</div>
		);
	}
	if (!advertiesStore.entities || advertiesStore.entities.length === 0) {
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
			<AdvertiesTable
				columns={columns}
				data={advertiesStore.entities}
				onRowClick={(ev, row) => {
					if (row) {
						// dispatch(openEditContactDialog(row.original));
					}
				}}
			/>
		</>
	);
};

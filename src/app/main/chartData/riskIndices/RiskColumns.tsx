import React, { useEffect } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Icon, IconButton } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import _ from '@lodash';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import RiskTable from './RiskTable';
import { blue } from '@material-ui/core/colors';
import { IStates } from '../interfaces/states';
import { getPoints, setDialogOpenState } from '../store/riskIndexSlice';
const ListTable = () => {
	const dispatch = useDispatch();
	const riskStore = useSelector(({ chartApp }: any) => chartApp.riskStore);

	const { t, i18n } = useTranslation('chartApp');
	const columns = React.useMemo(
		() => [
			{
				Header: t('title'),
				accessor: 'categoryTitle',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: t('listpoint'),
				width: 30,
				sortable: false,
				Cell: ({ row }) => (
					<IconButton
						onClick={() => {
							console.log(row.original);
							dispatch(
								getPoints({
									categoryTitle: row.original.categoryTitle,
									categoryID: row.original.categoryID
								})
							);
							dispatch(setDialogOpenState(row.original.categoryTitle, row.original.categoryID, true));
						}}
					>
						<Icon style={{ color: blue[500] }}>list_alt</Icon>
					</IconButton>
				)
			}
		],
		[dispatch, riskStore.entities, i18n.language]
	);

	useEffect(() => {
		riskStore && riskStore.entities && console.log(riskStore.entities.length);
	}, [riskStore]);
	if (riskStore.loading) {
		return (
			<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
				<Typography className="text-20 mb-16" color="textSecondary">
					{t('please_wait')} ...
				</Typography>
				<LinearProgress className="w-xs" color="secondary" />
			</div>
		);
	}
	if (!riskStore.entities) {
		return null;
	}
	if (riskStore.entities.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					{t('no_data')}
				</Typography>
			</div>
		);
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<RiskTable columns={columns} data={riskStore.entities} />
		</FuseAnimate>
	);
};
export default ListTable;

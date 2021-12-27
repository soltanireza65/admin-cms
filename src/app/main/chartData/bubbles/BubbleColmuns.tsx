import React, { useEffect } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Icon, IconButton } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import _ from '@lodash';
import LinearProgress from '@material-ui/core/LinearProgress';
import { red, green, grey } from '@material-ui/core/colors';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import PredictionNumber from './PredictionNumber';
import HtmlToolTip from 'app/main/shared-components/HtmlTooltip';
import BubbleTable from './BubbleTable';
import { IStates } from '../interfaces/states';
const ListTable = () => {
	const dispatch = useDispatch();
	const bubbleStore = useSelector(({ chartApp }: any) => chartApp.bubbleStore);

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
				Header: t('perdictedNumber'),
				width: 30,
				sortable: false,
				Cell: ({ row }) => (
					<PredictionNumber number={row.original.bubbleEdge} row={row.original} dispatch={dispatch} />
				)
			}
		],
		[dispatch, bubbleStore.entities, i18n.language]
	);

	useEffect(() => {
		bubbleStore && bubbleStore.entities && console.log(bubbleStore.entities.length);
	}, [bubbleStore]);
	if (bubbleStore.loading) {
		return (
			<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
				<Typography className="text-20 mb-16" color="textSecondary">
					{t('please_wait')} ...
				</Typography>
				<LinearProgress className="w-xs" color="secondary" />
			</div>
		);
	}
	if (!bubbleStore.entities) {
		return null;
	}
	if (bubbleStore.entities.length === 0) {
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
			<BubbleTable columns={columns} data={bubbleStore.entities} />
		</FuseAnimate>
	);
};
export default ListTable;

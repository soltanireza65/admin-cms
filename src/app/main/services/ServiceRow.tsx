import React, { MouseEvent, useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import moment from 'moment-jalaali';
import HtmlTooltip from '../shared-components/HtmlTooltip';
import Icon from '@material-ui/core/Icon';
import { green } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import AsyncSwitch from '../shared-components/async-switch/AsyncSwitch';
import { changeServiceStatus } from './store/servicesSlice';
moment.loadPersian({ dialect: 'persian-modern' });

const useStyles = makeStyles({
	root: {
		'&:nth-child(even)': { 'background-color': '#f2f2f2;' },
		'&:nth-child(odd)': { 'background-color': '#fff;' }
	}
});

interface IProps {
	index: number;
	item: ServicesInterface.IService;
	padding: number | 10;
	pageLayout: any;
}

const formatDate = (date: string, format: string) => {
	return date ? moment(new Date(date)).format(format) : '';
};

const ServiceRow = ({ index, item, padding, pageLayout }: IProps) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const { t } = useTranslation('servicesApp');
	const [changeStatusLoading, setChangeStatusLoading] = useState<boolean>(false);

	const handleEdit = (ev: MouseEvent) => {
		ev.stopPropagation();
		// const { label, title, id, description } = item;
		// dispatch(openEditTagDialog({ label, title, id, description }));
	};

	const onChangeServiceStatus = async () => {
		setChangeStatusLoading(true);
		await dispatch(changeServiceStatus({ portalId: item.id, status: item.status === 1 ? 2 : 1 }));
		setChangeStatusLoading(false);
	};

	return (
		<>
			<TableRow key={index} className={classes.root}>
				<TableCell
					style={{
						paddingRight: padding
					}}
					className="max-w-64 w-64 p-0 text-center"
				></TableCell>
				<TableCell
					style={{
						paddingRight: padding
					}}
				>
					{t(item.serviceName.toLowerCase())}
				</TableCell>
				<TableCell
					style={{
						paddingRight: padding
					}}
				>
					{item.templateName}
				</TableCell>
				<TableCell
					style={{
						paddingRight: padding
					}}
					className="max-w-128 truncate"
				>
					{item.domains[0].domain}
				</TableCell>
				{/* <TableCell
					style={{
						paddingRight: padding
					}}
				>
					{formatDate(item.summary[0]?.lastUsageDateTime, 'hh:mm:ss - yyyy/MM/DD')}
				</TableCell> */}
				<TableCell>
					<div className="flex items-center">
						<Link to={`/apps/services/${item.id}`} role="button">
							<HtmlTooltip title={t('edit')} placement="bottom" classes={{ tooltip: 'text-13' }}>
								<IconButton>
									<Icon style={{ color: green[300] }}>edit</Icon>
								</IconButton>
							</HtmlTooltip>
						</Link>
						<div className="mx-16">
							<AsyncSwitch
								checked={item.status === 1}
								loading={changeStatusLoading}
								handleChange={onChangeServiceStatus}
							/>
						</div>
					</div>
				</TableCell>
			</TableRow>
		</>
	);
};
export default ServiceRow;

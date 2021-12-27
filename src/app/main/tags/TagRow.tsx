import React, { MouseEvent } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { ITags } from 'api/Interfaces/tags';
import moment from 'moment-jalaali';
import HtmlTooltip from '../shared-components/HtmlTooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { green } from '@material-ui/core/colors';
import { openEditTagDialog } from '../shared-components/tags/store/tagsSlice';
moment.loadPersian({ dialect: 'persian-modern' });

const useStyles = makeStyles({
	root: {
		'&:nth-child(even)': { 'background-color': '#f2f2f2;' },
		'&:nth-child(odd)': { 'background-color': '#fff;' }
	}
});

interface IProps {
	index: number;
	item: ITags.ITag;
	padding: number | 10;
	pageLayout: any;
}

const formatDate = (date: string, format: string) => {
	return date ? moment(new Date(date)).format(format) : '';
};

const TagRow = ({ index, item, padding, pageLayout }: IProps) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const { t } = useTranslation('tagApp');

	const handleEdit = (ev: MouseEvent) => {
		ev.stopPropagation();
		const { label, title, id, description } = item;
		dispatch(openEditTagDialog({ label, title, id, description }));
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
					{item.title}
				</TableCell>
				<TableCell
					style={{
						paddingRight: padding
					}}
				>
					{item.label}
				</TableCell>
				<TableCell
					style={{
						paddingRight: padding
					}}
					className="max-w-128 truncate"
				>
					{item.description}
				</TableCell>
				<TableCell
					style={{
						paddingRight: padding
					}}
				>
					{formatDate(item.createdDateTime, 'jYYYY/jM/jD')}
				</TableCell>
				<TableCell
					style={{
						paddingRight: padding
					}}
				>
					{item.summary[0]?.totalCount}
				</TableCell>
				<TableCell
					style={{
						paddingRight: padding
					}}
				>
					{formatDate(item.summary[0]?.lastUsageDateTime, 'hh:mm:ss - yyyy/MM/DD')}
				</TableCell>
				<TableCell>
					<IconButton onClick={handleEdit}>
						<HtmlTooltip title={t('edit')} placement="bottom" classes={{ tooltip: 'text-13' }}>
							<Icon style={{ color: green[300] }}>edit</Icon>
						</HtmlTooltip>
					</IconButton>
				</TableCell>
			</TableRow>
		</>
	);
};
export default TagRow;

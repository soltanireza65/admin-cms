import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import TableRow from '@material-ui/core/TableRow';
import HtmlTooltip from '../shared-components/HtmlTooltip';
import { useDispatch, useSelector } from 'react-redux';
import { red, yellow, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import StatusComment from './StatusComment';
import { openStateCommentDialog, openStateDeleteDialog } from './store/commentSlice';
const useStyles = makeStyles({
	root: {
		'&:nth-child(even)': { 'background-color': '#f2f2f2;' },
		'&:nth-child(odd)': { 'background-color': '#fff;' }
	}
});

interface IProps {
	index: number;
	item: CommentAPIInterface.IComment;
	padding: number | 10;
	pageLayout: any;
}

const CommentRow = ({ index, item, padding, pageLayout }: IProps) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const { t } = useTranslation('commentsApp');
	const [expanded, setExpanded] = useState<boolean>(false);
	return (
		<>
			<TableRow key={index} hover className={clsx('cursor-pointer', classes.root)}>
				<TableCell
					style={{
						paddingRight: padding
					}}
					className="max-w-64 w-64 p-0 text-center"
					onClick={() => setExpanded(!expanded)}
				>
					{item.childs && item.childs.length > 0 && (
						<Icon>{expanded ? 'keyboard_arrow_down' : 'arrow_back_ios'}</Icon>
					)}
				</TableCell>
				<TableCell
					style={{
						paddingRight: padding
					}}
				>
					{item.contentParentTitle}
				</TableCell>
				<TableCell
					style={{
						paddingRight: padding
					}}
				>
					{item.content}
				</TableCell>
				<TableCell>
					<StatusComment id={item.id} status={item.status} />
				</TableCell>
				<TableCell>
					<IconButton
						onClick={ev => {
							ev.stopPropagation();
							dispatch(openStateCommentDialog(item, true, 'replay'));
						}}
					>
						<HtmlTooltip title={t('replay')} placement="bottom" classes={{ tooltip: 'text-13' }}>
							<Icon
								style={{
									color: '#000'
								}}
							>
								reply
							</Icon>
						</HtmlTooltip>
					</IconButton>
					<IconButton
						onClick={ev => {
							ev.stopPropagation();
							dispatch(openStateCommentDialog(item, true, 'edit'));
						}}
					>
						<HtmlTooltip title={t('edit')} placement="bottom" classes={{ tooltip: 'text-13' }}>
							<Icon style={{ color: green[300] }}>edit</Icon>
						</HtmlTooltip>
					</IconButton>
					<IconButton
						onClick={ev => {
							ev.stopPropagation();
							dispatch(openStateDeleteDialog(item, true));
						}}
					>
						<HtmlTooltip title={t('delete_button')} placement="bottom" classes={{ tooltip: 'text-13' }}>
							<Icon style={{ color: red[300] }}>delete</Icon>
						</HtmlTooltip>
					</IconButton>
				</TableCell>
			</TableRow>
			{expanded &&
				item.childs &&
				item.childs.length > 0 &&
				item.childs.map((row, index) => {
					return (
						<CommentRow
							key={index}
							index={index}
							item={row}
							padding={padding + 15}
							pageLayout={pageLayout}
						/>
					);
				})}
		</>
	);
};
export default CommentRow;

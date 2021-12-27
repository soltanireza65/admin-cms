import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CommentRow from './CommentRow';
import { useTranslation } from 'react-i18next';

export default ({ pageLayout }) => {
	const comments = useSelector(({ commentsApp }: any) => commentsApp.comment);
	const { t } = useTranslation('commentsApp');
	return comments && comments.loading == true ? (
		<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
			<Typography className="text-20 mb-16" color="textSecondary">
				{t('please_wait')} ...
			</Typography>
			<LinearProgress className="w-xs" color="secondary" />
		</div>
	) : (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell className="max-w-64 w-64 p-0 text-center"> </TableCell>
					<TableCell>{t('d_news')}</TableCell>
					<TableCell>{t('d_text')}</TableCell>
					<TableCell className="text-center ">{t('d_status')}</TableCell>
					<TableCell className=""> {t('d_actions')} </TableCell>
				</TableRow>
			</TableHead>

			{comments && comments.entities && comments.entities.length > 0 && (
				<TableBody>
					{comments.entities.map((item, index) => {
						return (
							item && (
								<CommentRow
									key={index}
									index={index}
									item={item}
									padding={12}
									pageLayout={pageLayout}
								/>
							)
						);
					})}
				</TableBody>
			)}
		</Table>
	);
};

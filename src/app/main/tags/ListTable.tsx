import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { useSelector } from 'react-redux';
import TagRow from './TagRow';
import { useTranslation } from 'react-i18next';
import TableContainer from '@material-ui/core/TableContainer';
import { TableFooter } from '@material-ui/core';
import { getTags } from '../shared-components/tags/store/tagsSlice';
import Pagination from 'components/Pagination';

export default ({ pageLayout }) => {
	const tags = useSelector(({ tagApp }: any) => tagApp.tags);
	const { t } = useTranslation('tagApp');

	if (tags.loading)
		return (
			<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
				<Typography className="text-20 mb-16" color="textSecondary">
					{t('please_wait')} ...
				</Typography>
				<LinearProgress className="w-xs" color="secondary" />
			</div>
		);

	if (!tags.entities || tags.entities.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					{t('no_data')}
				</Typography>
			</div>
		);
	}

	const handlePagination = ({ page, count }) => getTags({ count, page });

	return (
		tags.entities && (
			<TableContainer>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell className="max-w-64 w-64 p-0 text-center"> </TableCell>
							<TableCell>{t('d_title')}</TableCell>
							<TableCell>{t('d_label')}</TableCell>
							<TableCell>{t('d_description')}</TableCell>
							<TableCell>{t('d_createTime')}</TableCell>
							<TableCell>{t('d_usageCount')}</TableCell>
							<TableCell>{t('d_lastUsageTime')}</TableCell>
							<TableCell> </TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tags.entities.map((item, index: number) => {
							return (
								item && (
									<TagRow
										key={index}
										index={index}
										item={item}
										padding={16}
										pageLayout={pageLayout}
									/>
								)
							);
						})}
					</TableBody>
				</Table>
				<TableFooter>
					<Pagination handleChange={handlePagination} />
				</TableFooter>
			</TableContainer>
		)
	);
};

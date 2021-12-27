import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { useSelector } from 'react-redux';
import ServiceRow from './ServiceRow';
import { useTranslation } from 'react-i18next';
import TableContainer from '@material-ui/core/TableContainer';

export default ({ pageLayout }) => {
	const { entities, loading } = useSelector(({ servicesApp }: any) => servicesApp.services);
	const { t } = useTranslation('servicesApp');

	if (loading)
		return (
			<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
				<Typography className="text-20 mb-16" color="textSecondary">
					{t('please_wait')} ...
				</Typography>
				<LinearProgress className="w-xs" color="secondary" />
			</div>
		);

	if (!entities || entities.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					{t('no_data')}
				</Typography>
			</div>
		);
	}

	return (
		entities && (
			<TableContainer>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell className="max-w-64 w-64 p-0 text-center"> </TableCell>
							<TableCell>{t('service_type')}</TableCell>
							<TableCell>{t('template_name')}</TableCell>
							<TableCell>{t('main_domain')}</TableCell>
							<TableCell> </TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{entities.map((item, index: number) => {
							return (
								item && (
									<ServiceRow
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
			</TableContainer>
		)
	);
};

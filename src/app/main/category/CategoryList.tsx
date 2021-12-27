import FuseAnimate from '@fuse/core/FuseAnimate';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryRow from './CategoryRow';
import FuseUtils from '@fuse/utils';
import { useTranslation } from 'react-i18next';
import { TableContainer } from '@material-ui/core';
function CategoryList({ searchText, pageLayout }) {
	const categories = useSelector(({ categoryApp }: any) => categoryApp.category);
	const [filteredData, setFilteredData] = useState<ICategory.ICategoryData[]>(null);
	const { t } = useTranslation('categoryApp');

	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		setLoading(true);
		function getFilteredArray(entities, searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (!searchText || searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, searchText);
		}

		if (categories.entities) {
			setFilteredData(getFilteredArray(categories.entities, searchText));
			setLoading(false);
		}
	}, [categories.entities, searchText]);
	return (categories && categories.loading == true) || loading ? (
		<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
			<Typography className="text-20 mb-16" color="textSecondary">
				{t('please_wait')} ...
			</Typography>
			<LinearProgress className="w-xs" color="secondary" />
		</div>
	) : (
		<TableContainer>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell className="max-w-64 w-64 p-0 text-center"> </TableCell>
						<TableCell>{t('m_title')}</TableCell>
						<TableCell className="text-center ">{t('m_description')}</TableCell>
						<TableCell className=""> {t('m_location')} </TableCell>
						<TableCell className="">{t('m_status')}</TableCell>
						<TableCell className=""> </TableCell>
					</TableRow>
				</TableHead>

				{filteredData && filteredData.length > 0 && (
					<TableBody>
						{filteredData.map((item, index) => {
							return (
								item && (
									<CategoryRow
										key={index}
										index={index}
										textActive={t('status_active')}
										textDisActive={t('status_disable')}
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
		</TableContainer>
	);
}

export default CategoryList;

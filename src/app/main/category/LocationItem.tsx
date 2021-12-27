import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openDeleteDialog } from './store/deleteSlice';
import { openEditLocationDialog } from './store/locationSlice';
import { IDeleteState } from './interfaces/stores';

const moduleTypes = [
	{
		title: 'خبر',
		value: 1
	},
	{
		title: 'تبلغیات',
		value: 2
	},
	{
		title: 'منو',
		value: 3
	}
];
export default ({
	title,
	locationModuleType,
	locationCode,
	locationHeight,
	locationWidth,
	viewCount,
	categoryTitle,
	categoryId
}: IGlobalData.ILocation) => {
	const dispatch = useDispatch();
	const { t } = useTranslation('categoryApp');
	const handleDelete = ({ id, title, type, locationCode, locationModuleType, title2 }: IDeleteState) => {
		dispatch(openDeleteDialog({ id, title, type, locationCode, locationModuleType, title2 }));
	};
	const handleEdit = (data?: IGlobalData.ILocation, id?: string) => {
		dispatch(openEditLocationDialog({ data, id }));
	};
	return (
		<ListItem className={'border-solid border-2 py-16 px-0 sm:px-8'} dense>
			<div className="flex flex-1 flex-col relative overflow-hidden px-8">
				<Typography variant="subtitle1" className="todo-title truncate" color="inherit">
					{title}
				</Typography>
				<Typography color="textSecondary" className="todo-notes truncate">
					{`${t('l_d_dialog_locationcode')}: ${locationCode}`}
				</Typography>
				<Typography color="textSecondary" className="todo-notes truncate">
					{`${t('l_d_viewcount')}: ${viewCount}`}
				</Typography>
				<Typography color="textSecondary" className="todo-notes truncate">
					{`${t('l_d_locationheight')}: ${locationHeight}`}
				</Typography>
				<Typography color="textSecondary" className="todo-notes truncate">
					{`${t('l_d_locationwidth')}: ${locationWidth}`}
				</Typography>
				<Typography color="textSecondary" className="todo-notes truncate">
					{`${t('l_d_mediaType')}: ${moduleTypes[locationModuleType - 1].title}`}
				</Typography>
			</div>

			<div className="px-8">
				<IconButton
					onClick={ev => {
						ev.preventDefault();
						ev.stopPropagation();
						handleEdit(
							{
								title,
								locationModuleType,
								locationCode,
								locationHeight,
								locationWidth,
								viewCount,
								categoryTitle,
								categoryId
							},
							categoryId
						);
					}}
				>
					<Icon>edit</Icon>
				</IconButton>
				<IconButton
					onClick={ev => {
						ev.preventDefault();
						ev.stopPropagation();
						handleDelete({
							title,
							title2: categoryTitle,
							locationCode,
							locationModuleType,
							type: 'location',
							id: categoryId
						});
					}}
				>
					<Icon>delete</Icon>
				</IconButton>
			</div>
		</ListItem>
	);
};

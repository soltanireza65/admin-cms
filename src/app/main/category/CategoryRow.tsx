import React, { useState, useEffect } from 'react';
import TableCell from '@material-ui/core/TableCell';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import TableRow from '@material-ui/core/TableRow';
import HtmlTooltip from '../shared-components/HtmlTooltip';
import { useDispatch } from 'react-redux';
import { getOneCategory } from './store/categorySlice';
import { red, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { openDeleteDialog } from './store/deleteSlice';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IOSSwitch from '../shared-components/IosSwitch';
import { CategoryApi } from 'api/Category/index';
import { openNewCategoryDialog, openEditCategoryDialog } from './store/categorySlice';
import { IDeleteState } from './interfaces/stores';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
	root: {
		'&:nth-child(even)': { 'background-color': '#f2f2f2;' },
		'&:nth-child(odd)': { 'background-color': '#fff;' }
	}
});

interface Props {
	index: number;
	item: ICategory.ICategoryData;
	padding: number | 10;
	pageLayout: any;
	textActive: string;
	textDisActive: string;
}
const CategoryRow = ({ index, item, padding, pageLayout, textActive, textDisActive }: Props) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [expanded, setExpanded] = useState<boolean>(false);
	const [selectedRow, setselectedRow] = useState<number>(1);

	const [isActive, setIsActive] = useState<boolean>(false);
	const { t } = useTranslation('categoryApp');
	const handleChangeActiveState = async () => {
		try {
			const request = await CategoryApi.changeCategoryStatus({ categoryId: item.id, status: isActive ? 1 : 2 });
			const { status } = await request;
			if (status === 1) {
				setIsActive(!isActive);

				dispatch(
					showMessage({
						message: t('m_cateogory_title', { title: item.title }),
						variant: 'success'
					})
				);
			}
		} catch {
			dispatch(
				showMessage({
					message: t('m_server_error'),
					variant: 'error'
				})
			);
		}
	};
	useEffect(() => {
		setIsActive(item.status === 2 ? true : false);
	}, []);
	const handleDelete = ({ id, title, type }: IDeleteState) => {
		dispatch(openDeleteDialog({ id, title, type }));
	};
	const handleOpenNewCategory = ({ parentId }: ICategory.ICategoryData) => {
		dispatch(openNewCategoryDialog(parentId));
	};
	const handleEditCategory = data => {
		dispatch(openEditCategoryDialog(data));
	};
	return (
		<>
			<TableRow
				key={index}
				hover
				selected={index == selectedRow}
				className={clsx('cursor-pointer', classes.root)}
			>
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
					className="w-200"
					style={{
						paddingRight: padding
					}}
				>
					{item.title}
				</TableCell>
				<TableCell className="text-center truncate text-overflow-hidden max-w-256">
					{item.description}
				</TableCell>
				<TableCell>
					<Badge color="primary" badgeContent={item.locations.length}>
						<Button
							onClick={ev => {
								setselectedRow(index);
								pageLayout.current.toggleRightSidebar();
								dispatch(getOneCategory({ id: item.id }));
							}}
							color="secondary"
						>
							{t('m_location_list')}
						</Button>
					</Badge>
				</TableCell>
				<TableCell className="text-center">
					<FormControlLabel
						control={
							<IOSSwitch
								value={isActive}
								checked={isActive}
								onChange={handleChangeActiveState}
								name="isLockedForPublicView"
							/>
						}
						label={isActive ? textActive : textDisActive}
					/>
				</TableCell>
				<TableCell>
					<IconButton
						onClick={ev => {
							ev.stopPropagation();
							handleOpenNewCategory({ parentId: item.id });
						}}
					>
						<HtmlTooltip
							title={t('m_add_subset_category')}
							placement="bottom"
							classes={{ tooltip: 'text-13' }}
						>
							<Icon
								style={{
									color: '#000'
								}}
							>
								add
							</Icon>
						</HtmlTooltip>
					</IconButton>
					<IconButton
						onClick={ev => {
							ev.stopPropagation();
							handleEditCategory(item);
							// handleOpenEditForm(row.original.uid);
						}}
					>
						<HtmlTooltip title={t('m_edit')} placement="bottom" classes={{ tooltip: 'text-13' }}>
							<Icon style={{ color: green[300] }}>edit</Icon>
						</HtmlTooltip>
					</IconButton>
					<IconButton
						onClick={ev => {
							ev.stopPropagation();
							handleDelete({ id: item.id, title: item.title, type: 'category' });
						}}
					>
						<HtmlTooltip title={t('m_delete')} placement="bottom" classes={{ tooltip: 'text-13' }}>
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
						<CategoryRow
							key={index}
							index={index}
							item={row}
							padding={padding + 15}
							textActive={textActive}
							textDisActive={textDisActive}
							pageLayout={pageLayout}
						/>
					);
				})}
		</>
	);
};
export default CategoryRow;

import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import LocationDialog from './LocationsDialog';
import { useTranslation } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';
import { openNewLocationDialog } from './store/locationSlice';
function LocationHeader(props) {
	const dispatch = useDispatch();
	const catogries = useSelector(({ categoryApp }: any) => categoryApp.category);
	const { t } = useTranslation('categoryApp');
	const [openDialog, setOpenDialog] = useState<boolean>(false);

	function handleOpenDialog() {
		dispatch(openNewLocationDialog(catogries.selectedcategory.id));
	}
	if (!catogries.selectedcategory) {
		return (
			<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
				<LocationDialog></LocationDialog>
				<Typography className="text-20 mb-16" color="textSecondary">
					هیچ دسته بندی انتخاب نشده است.
				</Typography>
			</div>
		);
	}

	if (catogries.loading) {
		return (
			<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
				<Typography className="text-20 mb-16" color="textSecondary">
					لطفا منتظر بمانید ...
				</Typography>
				<LinearProgress className="w-xs" color="secondary" />
			</div>
		);
	}
	return (
		catogries &&
		catogries.selectedcategory &&
		catogries.loading == false && (
			<div className="flex flex-col justify-between h-full p-4 sm:p-12">
				<div className="p-24">
					<Tooltip title={t('back')}>
						<IconButton
							color="secondary"
							onClick={() => {
								props.pageLayout.current.toggleRightSidebar();
							}}
							className="absolute  top-0  left-0 z-999"
						>
							<Icon>arrow_back</Icon>
						</IconButton>
					</Tooltip>
					<Tooltip title={t('l_d_title')}>
						<IconButton
							color="secondary"
							aria-label={t('l_d_title')}
							onClick={handleOpenDialog}
							className="absolute  top-0  right-0 z-999"
						>
							<Icon>add</Icon>
						</IconButton>
					</Tooltip>
				</div>
				<FuseAnimate animation="transition.expandIn" delay={200}>
					<LocationDialog openDialog={openDialog}></LocationDialog>
				</FuseAnimate>

				<div className="p-12">
					<FuseAnimate delay={200}>
						<Typography variant="subtitle1" className="mb-8">
							{catogries.selectedcategory.title}
						</Typography>
					</FuseAnimate>
				</div>
			</div>
		)
	);
}

export default LocationHeader;

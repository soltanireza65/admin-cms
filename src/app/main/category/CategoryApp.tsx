import React, { useEffect, useRef, useState } from 'react';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import { getAllCategories, openNewCategoryDialog } from './store/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimate from '@fuse/core/FuseAnimate';
import rtl from 'jss-rtl';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import LocationList from './LocationList';
import LocationHeader from './LocationHeader';
import FabDialog from './CategoryDialog';
import Icon from '@material-ui/core/Icon';
import CategoryList from './CategoryList';
import DeleteDialog from './DeleteDialog';
import Header from './Header';
import { useDebounce } from '@fuse/hooks';
import FavoriteDialog from './FavoriteDialog';
import SidebarHeader from './SidebarHeader';
import SidebarContent from './SidebarContent';
import AppModal from 'components/AppModal';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const CategoryApp = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation('categoryApp');

	const [searchText, setSearchText] = useState<string>(null);
	const pageLayout = useRef(null);
	useEffect(() => {
		dispatch(getAllCategories({}));
	}, []);

	const handleChangeText = useDebounce(async (text: string) => {
		setSearchText(text);
	}, 600);
	const handleUpdateData = () => {
		dispatch(getAllCategories({}));
	};

	function handleOpenDialog() {
		dispatch(openNewCategoryDialog(''));
	}

	return (
		<>
			<FusePageSimple
				header={
					<div className="flex flex-col flex-1 p-8 sm:p-12 relative">
						<Header handleChange={handleChangeText} pageLayout={pageLayout} />
						<div className="flex flex-1 justify-between">
							<FabDialog />
						</div>
					</div>
				}
				content={
					<>
						<div className="float-left m-16">
							<ButtonGroup color="primary" aria-label="outlined primary button group">
								<Button
									color="primary"
									variant="outlined"
									onClick={handleUpdateData}
									style={{ backgroundColor: 'white' }}
								>
									{t('c_d_title')}
								</Button>
								<Button color="primary" variant="contained" onClick={handleOpenDialog}>
									{t('c_d_dialog_title')}
								</Button>
							</ButtonGroup>
						</div>
						<CategoryList pageLayout={pageLayout} searchText={searchText} />
					</>
				}
				classes={{
					root: 'bg-red',
					header: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
					sidebarHeader: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
					rightSidebar: 'w-320'
				}}
				rightSidebarVariant="temporary"
				rightSidebarHeader={<LocationHeader pageLayout={pageLayout} />}
				rightSidebarContent={<LocationList />}
				ref={pageLayout}
				innerScroll
			/>
			<DeleteDialog />
			<FavoriteDialog />
		</>
	);
};
export default withReducer('categoryApp', reducer)(CategoryApp);

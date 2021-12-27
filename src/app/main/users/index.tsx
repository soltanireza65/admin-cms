import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FusePageCarded from '@fuse/core/FusePageCarded';
import UserTable from './UserTable';
import Header from './Header';
import { useDebounce } from '@fuse/hooks';
import { IUser } from './interfaces/userList';
import PaginationActions from './PaginationActions';
import NewUserTable from './NewUserTable';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import withReducer from 'app/store/withReducer';
import reducer from './store/index';
import { filterUsers, openAddModal } from './store/usersSlice';

const UserApp = () => {
	const pageLayout = useRef(null);
	const [filterState, setFilterState] = useState({});
	const dispatch = useDispatch();
	const { entities } = useSelector((store: any) => store.usersApp.users);

	const handleChangeText = useDebounce(async (text: string, typeSearch2: number) => {
		let newData = {};
		switch (typeSearch2) {
			case 0:
				newData = {
					userId: text
				};
				break;
			case 1:
				newData = {
					email: text
				};
				break;
			case 2:
				newData = {
					phone: text
				};
				break;
		}

		dispatch(filterUsers(newData));
		setFilterState(newData);
	}, 200);

	const handleChangePage = async (page, count) => {
		let newFilterData = {
			...filterState,
			count,
			page
		};
		dispatch(filterUsers(newFilterData));
		setFilterState(newFilterData);
	};
	useEffect(() => {
		if (entities.length === 0) dispatch(filterUsers({}));
	}, []);

	const { t } = useTranslation('usersApp');

	const handleAddUser = () => {
		dispatch(openAddModal());
	};

	return (
		<>
			<FusePageCarded
				classes={{
					root: 'w-full',
					header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136',
					content: 'h-3/4'
				}}
				header={<Header handleChangeText={handleChangeText} />}
				content={
					<>
						<div className="flex justify-between mb-16">
							<PaginationActions handleChangePagination={handleChangePage} />
							<Button color="primary" variant="contained" className="mx-16 mt-12" onClick={handleAddUser}>
								{t('new_user')}
							</Button>
						</div>

						<NewUserTable />
					</>
				}
				ref={pageLayout}
				innerScroll
				useFuseScrollBar={false}
			/>
		</>
	);
};
export default withReducer('usersApp', reducer)(UserApp);

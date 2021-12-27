import { useDebounce } from '@fuse/hooks';
import MaterialTable from 'material-table';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { changePassword, changeRole, editProfile } from './UserFunctions';
function UsersTable({ usersList }) {
	const [columns, setColumns] = useState([
		{ title: 'کد کاربر', field: 'userId' },
		{ title: 'نام و نام خانوادگی', field: 'fullname' },
		{ title: 'همراه', field: 'phone' },
		{ title: 'ایمیل', field: 'email' },
		{
			title: 'نقش کاربر',
			field: 'userRole',
			lookup: { user: 'کاربر', admin: 'ادمین' }
		},
		{
			title: 'عملیات',
			field: 'password'
		}
	]);

	const handleUpdateData = useDebounce(async (p, data) => {
		console.log(data);
		//:  | '' | 'ChangeRole'
		switch (p) {
			case 'password': {
				return await changePassword({
					userId: data.userId,
					password: data.newValue,
					confirmPassword: data.newValue
				});
				break;
			}
			case 'fullname': {
				return await editProfile({ userId: data.userId, fullName: data.newValue });
				break;
			}
			case 'userRole': {
				return await changeRole({ userId: data.userId, roleName: data.newValue });
				break;
			}
		}
	}, 200);

	const users = useSelector(store => store.usersApp);

	if (users.loading)
		return (
			<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
				<Typography className="text-20 mb-16" color="textSecondary">
					لطفا منتظر بمانید ...
				</Typography>
				<LinearProgress className="w-xs" color="secondary" />
			</div>
		);

	if (!users.entities || users.entities.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					{t('no_data')}
				</Typography>
			</div>
		);
	}

	return (
		<MaterialTable
			options={{
				search: false,
				showTitle: false,
				toolbar: false,
				paging: false
			}}
			style={{
				height: '100% !important',
				boxShadow: '0'
			}}
			columns={columns}
			data={users.entities}
			cellEditable={{
				onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
					const { field } = columnDef;
					const { userId } = rowData;
					return new Promise(async (resolve, reject) => {
						const result = await handleUpdateData(field, {
							newValue,
							userId
						});
						if (result) {
							resolve();
						} else {
							reject();
						}
					});
				}
			}}
		/>
	);
}

export default UsersTable;

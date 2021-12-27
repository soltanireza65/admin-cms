import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import VpnKey from '@material-ui/icons/VpnKey';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddUserDialog from './AddUserDialog';
import { openEditModal, openModal, openPasswordModal, openRolesModal } from './store/usersSlice';
import RolesDialog from './RolesDialog';
import PasswordDialog from './PasswordDialog';
import HtmlTooltip from '../shared-components/HtmlTooltip';
import EditdDialog from './EditDialog';

function UsersTable() {
	const dispatch = useDispatch();
	const users = useSelector(store => store.usersApp.users);
	const { t } = useTranslation('usersApp');

	if (users.loading)
		return (
			<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
				<Typography className="text-20 mb-16" color="textSecondary">
					{t('please_wait')} ...
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
	const handleEditUser = user => {
		const { userId, fullname } = user;

		dispatch(openEditModal({ userId, fullName: fullname }));
	};

	const handleEditUserRoles = user => {
		const { userId, roles, fullname } = user;
		dispatch(openRolesModal({ userId, username: fullname, roles }));
	};

	const handleEditPassword = user => {
		const { userId, fullname } = user;
		dispatch(openPasswordModal({ userId, username: fullname }));
	};

	return (
		<>
			<TableContainer component={Paper}>
				<Table className="" size="small" aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell className="text-right">{t('header_search_userid')}</TableCell>
							<TableCell className="text-right">{t('fullname')}</TableCell>
							<TableCell className="text-right">{t('header_search_phone')}</TableCell>
							<TableCell className="text-right">{t('header_search_email')}</TableCell>
							<TableCell className="text-right">{t('roles')}</TableCell>
							<TableCell className="text-right">{t('edit')}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.entities.map(row => (
							<TableRow key={row.name}>
								<TableCell className="text-right">{row.userId}</TableCell>
								<TableCell className="text-right">{row.fullname}</TableCell>
								<TableCell className="text-right">{row.phone}</TableCell>
								<TableCell className="text-right">{row.email}</TableCell>
								<TableCell className="md:text-center" onClick={() => handleEditUserRoles(row)}>
									<HtmlTooltip title={t('edit_role_description')}>
										<IconButton>
											<PersonIcon className="text-black" />
										</IconButton>
									</HtmlTooltip>
								</TableCell>
								<TableCell className="text-right">
									<div className="flex">
										<HtmlTooltip title={t('password_description')}>
											<IconButton onClick={() => handleEditPassword(row)}>
												<VpnKey
													className="text-black"
													style={{ color: 'rgb(117, 117, 117)' }}
												/>
											</IconButton>
										</HtmlTooltip>
										<HtmlTooltip title={t('edit_description')}>
											<IconButton onClick={() => handleEditUser(row)}>
												<EditIcon
													className="text-black"
													style={{ color: 'rgb(117, 117, 117)' }}
												/>
											</IconButton>
										</HtmlTooltip>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<AddUserDialog />
			<RolesDialog />
			<PasswordDialog />
			<EditdDialog />
		</>
	);
}

export default UsersTable;

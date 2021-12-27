import React, { useState } from 'react';
import { AppBar, Dialog, DialogContent, TextField, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeRolesModal } from './store/usersSlice';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { baseApi } from 'api/BaseApi';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';

const useStyle = makeStyles(theme => ({
	root: {
		[theme.breakpoints.up(560)]: {
			minWidth: 400
		}
	}
}));

function RolesDialog() {
	const { open, data } = useSelector((store: any) => store.usersApp.users.rolesModal);
	const dispatch = useDispatch();
	const styles = useStyle();
	const { t } = useTranslation('usersApp');

	const handleCloseModal = () => {
		dispatch(closeRolesModal());
	};

	const handleDeleteRole = (role: string) => {
		const res = baseApi.removeRoleFromUser({ roleName: role, userId: data.userId });
	};

	const handleAddRole = (role: string) => {
		const res = baseApi.addRoleToUser({ roleName: role, userId: data.userId });
	};

	const [newRole, setNewRole] = useState<string>('');

	const handleChangNewRole = event => {
		setNewRole(event.target.value);
	};

	return (
		<>
			<Dialog
				open={open}
				onClose={handleCloseModal}
				classes={{
					root: 'max-h-150 h-100 min-w-full',
					paper: 'rounded-8 '
				}}
				maxWidth="sm"
			>
				<AppBar position="static">
					<Toolbar className="flex w-full">
						<Typography variant="subtitle1" color="inherit">
							{t('edit_user_roles', { user: data.username })}
						</Typography>
					</Toolbar>
				</AppBar>

				<DialogContent classes={{ root: `sm:pt-0 pb-0 md:px-32 sm:p-24 p-10 ${styles.root}` }}>
					<List>
						<Grid container spacing={1} alignItems="center">
							<Grid item xs={2} className="mt-20">
								<IconButton>
									<AddIcon onClick={() => handleAddRole(newRole)} />
								</IconButton>
							</Grid>
							<Grid item xs={10}>
								<TextField
									value={newRole}
									onChange={handleChangNewRole}
									label={t('add_new_role')}
									fullWidth
								/>
							</Grid>
						</Grid>
						<div className="mt-20">
							{data.roles.length > 0 ? (
								data.roles.map((role: string, index: number) => (
									<ListItem key={role + index}>
										<ListItemText primary={role} />
										<ListItemSecondaryAction>
											<IconButton
												edge="end"
												aria-label="delete"
												onClick={() => handleDeleteRole(role)}
											>
												<DeleteIcon />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								))
							) : (
								<div className="mt-32 text-center text-gray-700">{t('no_role')}</div>
							)}
						</div>
					</List>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default RolesDialog;

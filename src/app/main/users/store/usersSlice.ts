import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import { IUsersState } from '../interfaces/state';
import { filterUsers as filtUsers, editProfile as editProf } from '../UserFunctions';
import i18n from 'i18next';

export const filterUsers = createAsyncThunk(
	'usersApp/users/filterUsers',
	async (filterData: BaseApiNameSpace.IFilter) => {
		const data = await filtUsers({ ...filterData });
		return { data };
	}
);

export const editProfile = createAsyncThunk(
	'usersApp/users/editProfile',
	async (userData: { user: BaseApiNameSpace.IEditProfileBody; prevUsername: string }, { dispatch }) => {
		const { status, message } = await editProf(userData.user);
		if (status == 1) {
			dispatch(
				showMessage({
					message: i18n.t('user_update', { ns: 'usersApp', user: userData.prevUsername }),
					variant: 'success'
				})
			);
			return { data: userData.user };
		} else {
			return { data: null, message };
		}
	}
);

const initialState: IUsersState = {
	entities: [],
	loading: true,
	addUserModal: {
		open: false
	},
	rolesModal: {
		open: false,
		data: {
			roles: [],
			userId: '',
			username: ''
		}
	},
	passwordModal: {
		open: false,
		data: {
			userId: '',
			username: ''
		}
	},
	editModal: {
		open: false,
		data: {
			userId: '',
			fullName: ''
		},
		loading: false,
		error: ''
	}
};

const mapper = (data: BaseApiNameSpace.IUser[] = []) => {
	return data.map(item => ({
		roles: item.profile.roles,
		fullname: item.profile.fullName,
		email: item.email,
		phone: item.phoneNumber,
		userId: item.userId,
		password: 'رمز جدید'
	}));
};

const usersSlice = createSlice({
	name: 'usersApp/users',
	initialState,
	reducers: {
		openAddModal: state => {
			state.addUserModal = {
				open: true
			};
		},
		closeAddModal: state => {
			state.addUserModal.open = false;
		},
		openRolesModal: (state, action) => {
			state.rolesModal = {
				data: action.payload,
				open: true
			};
		},
		closeRolesModal: state => {
			state.rolesModal.open = false;
		},
		openPasswordModal: (state, action) => {
			state.passwordModal = {
				data: action.payload,
				open: true
			};
		},
		closePasswordModal: state => {
			state.passwordModal.open = false;
		},
		openEditModal: (state, action) => {
			state.editModal = { ...initialState.editModal, open: true, data: action.payload };
		},
		closeEditModal: state => {
			state.editModal.open = false;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(filterUsers.fulfilled, (state, action) => {
				state.entities = mapper(action.payload.data);
				state.loading = false;
			})
			.addCase(filterUsers.pending, state => {
				state.loading = true;
			})
			.addCase(filterUsers.rejected, state => {
				state.entities = null;
				state.loading = false;
			});
		builder.addCase(editProfile.pending, state => {
			state.editModal.loading = true;
			state.editModal.error = '';
		});
		builder
			.addCase(editProfile.fulfilled, (state, action) => {
				state.editModal = { ...initialState.editModal };
				const { userId, fullName } = action.payload.data;
				const user = state.entities.find(user => user.userId === userId);
				if (user) {
					user.fullname = fullName;
				}
			})
			.addCase(editProfile.rejected, (state, action: any) => {
				state.editModal.loading = false;
				state.editModal.error = action.payload?.message;
			});
	}
});

export const {
	closeAddModal,
	openAddModal,
	closeRolesModal,
	openRolesModal,
	openPasswordModal,
	closePasswordModal,
	openEditModal,
	closeEditModal
} = usersSlice.actions;

export default usersSlice.reducer;

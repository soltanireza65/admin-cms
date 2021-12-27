import { createSlice, createAsyncThunk, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import _ from '@lodash';
import { Polling } from 'api/Polling';
import { AuthService } from 'api/Http/authService';
import axios from 'axios';
import i18next from 'i18next';

const authService = new AuthService();

const prefix = `${process.env.REACT_APP_URL}/polling/api/`;

export const addPolling = createAsyncThunk(
	'pollingApp/polling/addPolling',
	async ({ title, moduleType, contentId, options }: PollingInterface.IAddPolling, { dispatch, getState }) => {
		const authService = new AuthService();
		const token = await authService.getToken();

		let response: IGlobalData.IServiceResult<PollingInterface.IPolling>;
		try {
			const request = await axios({
				method: 'post',
				url: `${prefix}/PollingAdmin/AddPolling`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				data: { title, moduleType, contentId, options }
			});

			response = {
				data: request.data.data,
				message: request.data.message,
				status: request.data.status
			};

			dispatch(
				showMessage({
					message: i18next.t('polling_created', {
						ns: 'PollingApp',
						title
					}),
					variant: 'success'
				})
			);
		} catch (e) {
			response = {
				// data: {},
				message: e.message,
				status: 2
			};
		}
		return response;
	}
);
export const deletePolling = createAsyncThunk(
	'pollingApp/polling/deletePolling',
	async ({ id, title }: PollingInterface.IDeletePolling, { dispatch, getState }) => {
		const authService = new AuthService();
		const token = await authService.getToken();
		let response;
		let data = new FormData();
		data.append('id', id);
		try {
			const request = await axios.delete(`${prefix}/PollingAdmin/DeletePolling`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				data: data
			});

			response = {
				id: id,
				message: request.data.message,
				status: request.data.status
			};
			dispatch(
				showMessage({
					message: i18next.t('polling_deleted', {
						ns: 'PollingApp',
						title
					}),
					variant: 'success'
				})
			);
		} catch (e) {
			response = {
				// data: {},
				message: e.message,
				status: 2
			};
		}
		return response;
	}
);

export const editPolling = createAsyncThunk(
	'pollingApp/polling/editPolling',
	async ({ id, title, moduleType, contentId }: PollingInterface.IEditPolling, { dispatch, getState }) => {
		const authService = new AuthService();
		const token = await authService.getToken();
		let response;
		try {
			const request = await axios({
				method: 'put',
				url: `${prefix}/PollingAdmin/EditPolling`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				data: { id, title, moduleType, contentId }
			});

			response = {
				data: { id, title, moduleType, contentId },
				message: request.data.message,
				status: request.data.status
			};
			dispatch(
				showMessage({
					message: i18next.t('polling_edited', {
						ns: 'PollingApp',
						title
					}),
					variant: 'success'
				})
			);
		} catch (e) {
			response = {
				data: {},
				message: e.message,
				status: 2
			};
		}
		return response;
	}
);

export const changePollingStatus = createAsyncThunk(
	'pollingApp/polling/changePollingStatus',
	async ({ id, status }: PollingInterface.IPolling, { dispatch, getState }) => {
		console.log('id: ', id);
		console.log('status: ', status);
		const authService = new AuthService();
		const token = await authService.getToken();
		let response;
		try {
			const request = await axios({
				method: 'put',
				url: `${prefix}/PollingAdmin/ChangePollingStatus`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				data: JSON.stringify({
					id: id,
					status: status
				})
			});

			response = {
				data: { id, status },
				message: request.data.message,
				status: request.data.status
			};
			if (response.status == 1) {
				dispatch(
					showMessage({
						message: i18next.t('polling_status_changed', {
							ns: 'PollingApp',
							status:
								status == 2
									? i18next.t('active', { ns: 'PollingApp' })
									: i18next.t('disable', { ns: 'PollingApp' })
						}),
						variant: 'success'
					})
				);
			}
		} catch (e) {
			response = {
				// data: {},
				message: e.message,
				status: 2
			};
		}
		console.log('response: ', response);

		return response;
	}
);

export const deleteOptionsFromPolling = createAsyncThunk(
	'pollingApp/polling/deleteOptionsFromPolling',
	async ({ pollingId, optionsId }: PollingInterface.IEditAddOptions, { dispatch, getState }) => {
		const authService = new AuthService();
		const token = await authService.getToken();
		let response;
		try {
			const request = await axios({
				method: 'delete',
				url: `${prefix}/PollingAdmin/DeleteOptionsFromPolling`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				data: { pollingId, optionsId }
			});

			response = {
				data: { pollingId, optionsId },
				message: request.data.message,
				status: request.data.status
			};
			console.log('response: ', response);
		} catch (e) {
			response = {
				// data: {},
				message: e.message,
				status: 2
			};
		}
		console.log('request: ', response);
		return response;

		// const { data, status, message } = await Polling.deleteOptionsFromPolling({ pollingId, optionsId });
		// if (status == 1) {
		// 	dispatch(
		// 		showMessage({
		// 			message: `گزینه با موفقیت حذف شد`,
		// 			variant: 'success'
		// 		})
		// 	);
		// 	return { data };
		// } else {
		// 	dispatch(
		// 		showMessage({
		// 			message: message,
		// 			variant: 'error'
		// 		})
		// 	);
		// 	return {};
		// }
	}
);

export const addOptionsToPolling = createAsyncThunk(
	'pollingApp/polling/addOptionsToPolling',
	async ({ pollingId, optionsTitle }: PollingInterface.IEditAddOptions, { dispatch, getState }) => {
		const authService = new AuthService();
		const token = await authService.getToken();
		let response;
		try {
			const request = await axios({
				method: 'put',
				url: `${prefix}/PollingAdmin/addOptionsToPolling`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				data: { pollingId, optionsTitle }
			});
			console.log('request: ', request);

			response = {
				data: { pollingId, options: request.data.data },
				message: request.data.message,
				status: request.data.status
			};
		} catch (e) {
			response = {
				// data: {},
				message: e.message,
				status: 2
			};
		}
		console.log('request: ', response);
		if (response.status == 1) {
			dispatch(
				showMessage({
					message: i18next.t('option_added', { ns: 'PollingApp' }),
					variant: 'success'
				})
			);
		} else {
			dispatch(
				showMessage({
					message: response.message,
					variant: 'error'
				})
			);
		}
		return response;
	}
);

export const getPollings = createAsyncThunk(
	'pollingApp/polling/getPollings',
	async ({ status, count, page, totalPage }: PollingInterface.IGetPollings, { dispatch, getState }) => {
		const authService = new AuthService();
		const token = await authService.getToken();
		let response;
		try {
			const request = await axios.get(`${prefix}/PollingAdmin/GetPollings`, {
				params: {
					status: status,
					count: count,
					page: page,
					totalPage: totalPage
				},
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				data: {}
			});
			response = {
				data: request.data.data,
				message: request.data.message,
				status: request.data.status
			};
		} catch (e) {
			response = {
				// data: {},
				message: e.message,
				status: 2
			};
		}
		return response;
	}
);

const initialState = {
	entities: [],
	currentPolling: null,
	status: 0,
	rowsPerPage: 0,
	loadingSwitches: {},
	loading: false,
	error: null,
	errorMessage: '',
	lastFetch: null,
	selectedPolling: null,
	deletePollingDialog: {
		isOpen: false,
		pollingId: '',
		loading: false
	},
	pollingDialog: {
		type: '',
		isOpen: false,
		polling: null
	},
	pollingOptionsDialog: {
		isOpen: false,
		pollingId: '',
		options: []
	}
};

const pollingSlice = createSlice({
	name: 'pollingApp/pollings',
	initialState,
	reducers: {
		setCurrentPolling(state, action: PayloadAction<object>) {
			state.currentPolling = action.payload;
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload;
		},
		setErrorMessage(state, action: PayloadAction<string>) {
			state.errorMessage = action.payload;
		},

		setAddDialogOpen(state, action: PayloadAction<boolean>) {
			if (action.payload) state.pollingDialog = { isOpen: action.payload, polling: null, type: 'add' };
			else {
				state.pollingDialog.isOpen = false;
			}
		},
		setDeleteDialogOpen(state, action: PayloadAction<boolean>) {
			state.deletePollingDialog.isOpen = action.payload;
		},
		setEditDialogOpen(state, action: PayloadAction<{ show: boolean; polling: PollingInterface.IPolling }>) {
			state.pollingDialog = { isOpen: action.payload.show, polling: action.payload.polling, type: 'edit' };
		},
		openPollingOptionsDialog(state, action: any) {
			state.pollingOptionsDialog = {
				isOpen: true,
				options: action.payload.options,
				pollingId: action.payload.pollingId
			};
		},
		closePollingOptionsDialog(state) {
			state.pollingOptionsDialog.isOpen = false;
		},
		setDeletePollingDialogOpen(state, action) {
			state.deletePollingDialog.isOpen = true;
			state.deletePollingDialog.pollingId = action.payload.id;
		},
		closeDeletePollingDialog(state) {
			state.deletePollingDialog = { isOpen: false, pollingId: '', loading: false };
		},
		setStatus(state, action: PayloadAction<0 | 1 | 2>) {
			state.status = action.payload;
		}

		// openPublishDialog: {
		// 	reducer: (state, action: any) => {
		// 		state.datePublishDialog = {
		// 			props: {
		// 				open: true
		// 			},
		// 			title: action.payload.title,
		// 			id: action.payload.id,
		// 			newsCode: parseInt(action.payload.newsCode)
		// 		};
		// 	},
		// 	prepare: (id: string, title: string, newsCode: number) => ({ payload: { id, title, newsCode } })
		// },
		// closePublishDialog: (state, action) => {
		// 	state.datePublishDialog = {
		// 		props: {
		// 			open: false
		// 		},
		// 		title: '',
		// 		id: '',
		// 		newsCode: 0
		// 	};
		// }
	},
	extraReducers: builder => {
		builder
			.addCase(addPolling.fulfilled, (state, action) => {
				state.entities = [action.payload.data, ...state.entities];
				state.pollingDialog.isOpen = false;
			})
			.addCase(addPolling.rejected, (state, action) => {
				state.error = action.payload;
			});

		builder
			.addCase(editPolling.fulfilled, (state, action) => {
				const index = state.entities.findIndex(item => item.id === action.payload.data.id);
				state.entities[index].title = action.payload.data.title;
				state.entities[index].moduleType = action.payload.data.moduleType;
				state.entities[index].contentId = action.payload.data.contentId;
				state.pollingDialog.isOpen = false;
			})
			.addCase(editPolling.rejected, (state, action) => {
				state.error = action.payload;
			});
		builder
			.addCase(changePollingStatus.pending, (state, action) => {
				state.loadingSwitches[action.meta.arg.id] = true;
			})
			.addCase(changePollingStatus.fulfilled, (state, action) => {
				const index = state.entities.findIndex(item => item.id === action.payload.data.id);
				state.entities[index].status = action.payload.data.status;
				state.loadingSwitches[action.meta.arg.id] = false;
			})
			.addCase(changePollingStatus.rejected, (state, action) => {
				state.error = action.payload;
				state.loadingSwitches[action.meta.arg.id] = false;
			});
		builder
			.addCase(deletePolling.pending, (state, action) => {
				state.deletePollingDialog.loading = true;
			})
			.addCase(deletePolling.fulfilled, (state, action) => {
				state.deletePollingDialog.loading = false;
				state.deletePollingDialog.isOpen = false;
				state.deletePollingDialog.pollingId = '';

				state.entities = state.entities.filter(x => x.id != action.payload.id);
			})
			.addCase(deletePolling.rejected, (state, action) => {
				state.error = action.payload;
			});
		builder.addCase(addOptionsToPolling.fulfilled, (state, action) => {
			const { pollingId, options } = action.payload.data;

			const index = state.entities.findIndex(item => item.id === pollingId);

			state.entities[index].options.push(...options);
		});
		builder
			.addCase(deleteOptionsFromPolling.fulfilled, (state, action) => {
				const { pollingId, optionsId } = action.payload.data;
				const index = state.entities.findIndex(item => item.id === pollingId);
				state.entities[index].options = state.entities[index].options.filter(
					option => !optionsId.includes(option.id)
				);
			})
			.addCase(deleteOptionsFromPolling.rejected, (state, action) => {
				state.loading = false;
			});
		builder
			.addCase(getPollings.pending, (state, action) => {
				state.loading = true;
				state.rowsPerPage = action.meta.arg.count;
				state.loadingSwitches = {};
			})
			.addCase(getPollings.fulfilled, (state, action) => {
				state.loading = false;
				state.entities = action.payload.data;
			})
			.addCase(getPollings.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = 'errorMessage : CHANGE ME';
				state.entities = [];
			});
	}
});

export const {
	setLoading,
	setCurrentPolling,
	setAddDialogOpen,
	setDeleteDialogOpen,
	setEditDialogOpen,
	openPollingOptionsDialog,
	closePollingOptionsDialog,
	closeDeletePollingDialog,
	setDeletePollingDialogOpen,
	setStatus
} = pollingSlice.actions;
export default pollingSlice.reducer;

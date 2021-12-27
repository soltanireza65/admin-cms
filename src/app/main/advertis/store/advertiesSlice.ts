import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import { AdvertiesApi } from 'api/Adverties/index';
import { IState } from '../interfaces/states';
import i18n from 'i18next';
/**
 * addAdverties
editAdverties
deleteAdverties
changeAdvertiseStatus
getAdvertisesList
getAdvertiseById
 */
export const addAdverties = createAsyncThunk(
	'advertiesApp/addnew',
	async (dataAdverties: AdvertiesInterface.IAdvertiesBody, { dispatch }) => {
		const request = await AdvertiesApi.addAdverties({ ...dataAdverties });

		const { data, status } = await request;

		if (status == 1) {
			dispatch(
				showMessage({
					message: i18n.t('advertise_registered', { ns: 'advertiesApp', title: dataAdverties.title }),

					variant: 'success'
				})
			);
			// dispatch(getAllCategories({}));
		} else {
			dispatch(
				showMessage({
					message: i18n.t('register_failed', { ns: 'advertiesApp', title: dataAdverties.title }),

					variant: 'error'
				})
			);
		}

		return { data, status };
	}
);

export const editAdverties = createAsyncThunk(
	'advertiesApp/edit',
	async (dataAdverties: AdvertiesInterface.IAdvertiesBody, { dispatch }) => {
		const request = await AdvertiesApi.editAdverties({ ...dataAdverties });

		const { data, status } = await request;
		if (status == 1) {
			dispatch(
				showMessage({
					message: i18n.t('advertise_updated', { ns: 'advertiesApp', title: dataAdverties.title }),

					variant: 'success'
				})
			);
			// dispatch(getAllCategories({}));
		} else {
			dispatch(
				showMessage({
					message: i18n.t('update_failed', { ns: 'advertiesApp', title: dataAdverties.title }),

					variant: 'error'
				})
			);
		}

		return { data, status, dataAdverties };
	}
);

export const deleteAdverties = createAsyncThunk(
	'advertiesApp/deleteAdverties',
	async ({ id, title }: AdvertiesInterface.IAdvertiesBody, { dispatch }) => {
		const request = await AdvertiesApi.deleteAdverties({ id });

		const { data, status } = await request;
		if (status == 1) {
			dispatch(
				showMessage({
					message: i18n.t('advertise_deleted', { ns: 'advertiesApp', title }),

					variant: 'success'
				})
			);
			dispatch(getAdvertisesList({}));
		} else {
			dispatch(
				showMessage({
					message: i18n.t('delete_failed', { ns: 'advertiesApp' }),

					variant: 'error'
				})
			);
		}

		return { data, status };
	}
);

export const changeAdvertiseStatus = createAsyncThunk(
	'advertiesApp/statusChange',
	async ({ id, title, status }: AdvertiesInterface.IAdvertiesBody, { dispatch }) => {
		const request = await AdvertiesApi.changeAdvertiseStatus({ id, status });

		const r2 = await request;

		if (r2.status == 1) {
			dispatch(setStatus({ id, status }));
			dispatch(
				showMessage({
					message: i18n.t('advertise_updated', { ns: 'advertiesApp', title }),

					variant: 'success'
				})
			);
			dispatch(deleteAdvertiesFromList({ id }));
			// dispatch(getAllCategories({}));
		} else {
			dispatch(
				showMessage({
					message: i18n.t('update_failed', { ns: 'advertiesApp', title }),

					variant: 'error'
				})
			);
		}

		return { id };
	}
);

export const getAdvertisesList = createAsyncThunk(
	'advertiesApp/getAdvertisesList',
	async (dataAdverties: AdvertiesInterface.IFilterAdverties, { dispatch, getState }) => {
		const states: any = getState();
		const { advertiesApp } = states;
		const { adverties } = advertiesApp;
		const { status }: IState = adverties;
		dataAdverties.status = dataAdverties.status ? dataAdverties.status : status;
		const request = await AdvertiesApi.getAdvertisesList({ ...dataAdverties });

		const { data } = await request;

		return { data };
	}
);

export const getAdvertiseById = createAsyncThunk(
	'advertiesApp/getAdvertiseById',
	async (dataAdverties: AdvertiesInterface.IAdvertiesBody, { dispatch }) => {
		const request = await AdvertiesApi.getAdvertiseById({ ...dataAdverties });

		const { data, status } = await request;
		if (status == 1) {
			// dispatch(getAllCategories({}));
		} else {
		}

		return { data, status };
	}
);

const initialState: IState = {
	entities: [],
	status: 2,
	loading: false,
	deleteDialog: {
		id: '',
		loading: false,
		props: {
			open: false
		},
		title: ''
	},
	dialogAdverties: {
		type: 'new',
		locations: [],
		image: null,
		loading: false,
		imageLoading: true,
		props: {
			currentAdvertiesItem: null,
			open: false
		}
	}
};

const advertiesSlice = createSlice({
	name: 'adverties',
	initialState,
	reducers: {
		setStatus: {
			reducer: (state, action: any) => {
				if (state.entities.findIndex(x => x.id == action.payload.id) >= 0)
					state.entities.find(x => x.id == action.payload.id).status = action.payload.status;
			},
			prepare: ({ id, status }) => ({ payload: { id, status } })
		},
		setStatusFilter: {
			reducer: (state, action: any) => {
				state.status = action.payload;
			},
			prepare: (value: number) => ({ payload: value })
		},
		setLoading: {
			reducer: (state, action: any) => {
				state.loading = action.payload;
			},
			prepare: value => ({ payload: value })
		},
		deleteAdvertiesFromList: {
			reducer: (state, action: any) => {
				state.entities = state.entities.filter(x => x.id !== action.payload.toString());
			},
			prepare: ({ id }) => ({ payload: id })
		},
		setLoadingDialog: {
			reducer: (state, action: any) => {
				state.dialogAdverties.loading = action.payload;
			},
			prepare: value => ({ payload: value })
		},
		setImage: {
			reducer: (state, action: any) => {
				state.dialogAdverties.image = action.payload;
				state.dialogAdverties.imageLoading = false;
			},
			prepare: (image: IFileManager.IFile) => ({ payload: image })
		},
		setImageLoading: state => {
			state.dialogAdverties.imageLoading = true;
		},
		dialogOpenState: {
			reducer: (state, action: any) => {
				state.dialogAdverties.props = {
					currentAdvertiesItem: action.payload.advertiesItem,
					open: action.payload.state
				};
				state.dialogAdverties.type = action.payload.type;
				state.dialogAdverties.imageLoading = action.payload.type === 'edit';
				if (action.payload.type === 'new') {
					state.dialogAdverties.locations = [];
				}
			},
			prepare: (advertiesItem: AdvertiesInterface.IAdvertiesBody, state: boolean, type: 'new' | 'edit') => ({
				payload: { advertiesItem, state, type }
			})
		},
		deleteDialogOpenState: {
			reducer: (state, action: any) => {
				state.deleteDialog = {
					id: action.payload.id,
					props: {
						open: action.payload.open
					},
					title: action.payload.title,
					loading: false
				};
			},
			prepare: (id?: string, title?: string, open?: boolean) => ({
				payload: { id, title, open }
			})
		},
		setDeleteLoading: {
			reducer: (state, action: any) => {
				state.deleteDialog.loading = action.payload;
			},
			prepare: (loading: boolean) => ({ payload: loading })
		},
		addLocations: {
			reducer: (state, action: any) => {
				state.dialogAdverties.locations.push(action.payload);
			},
			prepare: (location: IGlobalData.ILocation) => ({ payload: location })
		},
		addBulkLocations: {
			reducer: (state, action: any) => {
				state.dialogAdverties.locations = action.payload;
			},
			prepare: (location: IGlobalData.ILocation[]) => ({ payload: location })
		},
		removeLocation: {
			reducer: (state, action: any) => {
				console.log(action.payload);
				state.dialogAdverties.locations.splice(action.payload, 1);
			},
			prepare: ({ index }) => ({ payload: index })
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getAdvertisesList.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getAdvertisesList.fulfilled, (state, action) => {
				state.loading = false;
				state.entities = action.payload.data;
			})
			.addCase(getAdvertisesList.rejected, (state, action) => {
				state.loading = false;
				state.entities = [];
			});
		builder
			.addCase(getAdvertiseById.pending, (state, action) => {
				state.dialogAdverties.loading = true;
			})
			.addCase(getAdvertiseById.fulfilled, (state, action) => {
				state.dialogAdverties.loading = false;
				state.dialogAdverties.props.currentAdvertiesItem = action.payload.data;
			})
			.addCase(getAdvertiseById.rejected, (state, action) => {
				state.dialogAdverties.loading = false;
				state.dialogAdverties.props.currentAdvertiesItem = null;
			});
		builder
			.addCase(deleteAdverties.pending, (state, action) => {
				state.deleteDialog.loading = true;
			})
			.addCase(deleteAdverties.fulfilled, (state, action) => {
				state.deleteDialog.loading = false;
				state.deleteDialog = {
					id: '',
					loading: false,
					props: {
						open: false
					},
					title: ''
				};
			})
			.addCase(deleteAdverties.rejected, (state, action) => {
				state.deleteDialog = {
					id: '',
					loading: false,
					props: {
						open: false
					},
					title: ''
				};
			});
		builder.addCase(editAdverties.fulfilled, (state, action) => {
			const index = state.entities.findIndex(advertise => advertise.id === action.payload.dataAdverties.id);
			if (index >= 0) {
				state.entities[index] = action.payload.dataAdverties;
				state.entities[index].mediaFile.mediaFileId = action.payload.dataAdverties.mediaFile.mediaId;
			}
		});
	}
});

export const {
	dialogOpenState,
	setLoading,
	setLoadingDialog,
	setStatus,
	setStatusFilter,
	addLocations,
	deleteAdvertiesFromList,
	removeLocation,
	deleteDialogOpenState,
	setDeleteLoading,
	addBulkLocations,
	setImage,
	setImageLoading
} = advertiesSlice.actions;
export default advertiesSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ServicesApi } from 'api/Services';
import { showMessage } from 'app/store/fuse/messageSlice';
import { Template } from '../interfaces/props';
import { ServicesState, TemplateSettingsForm } from '../interfaces/states';
import i18n from 'i18next';

const initialState: ServicesState = {
	entities: [],
	loading: true,
	step: 0,
	secureLoading: {},
	serviceForm: {
		domain: { challengType: undefined, domain: '' },
		planId: '',
		serviceId: '',
		serviceName: '',
		templateId: '',
		templateName: '',
		reagentCode: ''
	},
	deleteDialog: {
		isOpen: false,
		domain: '',
		portalId: '',
		loading: false
	},
	changeDomainDialog: {
		isOpen: false,
		domain: '',
		portalId: '',
		loading: false
	},
	addDialog: {
		isOpen: false,
		loading: false,
		portalId: ''
	}
};

export const getServices = createAsyncThunk('servicesApp/services/getServices', async () => {
	const response = await ServicesApi.getServices();
	return response.data;
});

export const buyService = createAsyncThunk(
	'servicesApp/services/buyService',
	async (data: ServicesInterface.IAddService, { dispatch }) => {
		try {
			const response = await ServicesApi.addService(data);
			return response;
		} catch (e) {
			dispatch(showMessage({ message: e.message, variant: 'error' }));
			throw new Error(e.message);
		}
	}
);

export const deleteDomain = createAsyncThunk(
	'servicesApp/services/deleteDomain',
	async (data: ServicesInterface.DeleteDomainBody, { dispatch }) => {
		try {
			const resposne = await ServicesApi.deleteDomain(data);
			dispatch(
				showMessage({
					message: i18n.t('domain_deleted', { ns: 'servicesApp', domain: data.domain }),
					variant: 'success'
				})
			);
			return resposne;
		} catch (e) {
			dispatch(showMessage({ message: e.message, variant: 'error' }));
			throw new Error(e.message);
		}
	}
);

export const addDomain = createAsyncThunk(
	'servicesApp/services/addDomain',
	async (data: ServicesInterface.AddDomainBody, { dispatch }) => {
		try {
			const response = await ServicesApi.addDomain(data);
			dispatch(
				showMessage({
					message: i18n.t('domain_added', { ns: 'servicesApp', domain: data.domain }),
					variant: 'success'
				})
			);
			return { domain: response.data, portalId: data.portalId };
		} catch (e) {
			dispatch(showMessage({ message: e.message, variant: 'error' }));
			throw new Error(e.message);
		}
	}
);

export const changePrimaryDomain = createAsyncThunk(
	'servicesApp/services/changeDomain',
	async (data: ServicesInterface.ChangePrimaryDomainBody, { dispatch }) => {
		try {
			const response = await ServicesApi.changePrimaryDomain(data);
			return response;
		} catch (e) {
			dispatch(showMessage({ message: e.message, variant: 'error' }));
			throw new Error(e.message);
		}
	}
);

export const changeDomainSecure = createAsyncThunk(
	'servicesApp/services/changeDomainSecure',
	async (data: ServicesInterface.ChangeDomainSecureBody, { dispatch }) => {
		try {
			const response = await ServicesApi.changeDomainSecure(data);
			dispatch(
				showMessage({
					message: i18n.t(data.isSecure ? 'ssl_enabled' : 'ssl_disabled', {
						ns: 'servicesApp',
						domain: data.domain
					}),
					variant: 'success'
				})
			);
			return response;
		} catch (e) {
			dispatch(showMessage({ message: e.message, variant: 'error' }));
			throw new Error(e.message);
		}
	}
);

export const changeDomainRedirectUrl = createAsyncThunk(
	'servicesApp/services/changeDomainRedirectUrl',
	async (data: ServicesInterface.ChangeDomainRedirectUrl, { dispatch }) => {
		try {
			const response = await ServicesApi.changeDomainRedirectUrl(data);
			dispatch(
				showMessage({
					message: i18n.t('redirectUrl_changed', {
						ns: 'servicesApp',
						domain: data.domain,
						value: data.redirectUrl
					}),
					variant: 'success'
				})
			);
			return response;
		} catch (e) {
			dispatch(showMessage({ message: e.message, variant: 'error' }));
			throw new Error(e.message);
		}
	}
);

export const changeServiceTemplate = createAsyncThunk(
	'servicesApp/services/changeServiceTemplate',
	async (data: ServicesInterface.ChangeServiceTemplateBody, { dispatch }) => {
		try {
			const response = await ServicesApi.changeTemplate(data);
			dispatch(
				showMessage({
					message: i18n.t('template_changed', {
						ns: 'servicesApp'
					}),
					variant: 'success'
				})
			);
			return response;
		} catch (e) {
			dispatch(showMessage({ message: e.message, variant: 'error' }));
			throw new Error(e.message);
		}
	}
);

export const changeServiceStatus = createAsyncThunk(
	'servicesApp/services',
	async (data: ServicesInterface.ChangeServiceStatusBody, { dispatch }) => {
		try {
			const response = await ServicesApi.changeStatus(data);
			dispatch(
				showMessage({
					message: i18n.t('service_status_changed', {
						ns: 'servicesApp'
					}),
					variant: 'success'
				})
			);
			return response;
		} catch (e) {
			dispatch(showMessage({ message: e.message, variant: 'error' }));
			throw new Error(e.message);
		}
	}
);

export const getServiceById = createAsyncThunk('servicesApp/getServiceById', async (portalId: string) => {
	const response = await ServicesApi.getServiceById(portalId);
	if (!response.data) {
		throw new Error('No data');
	}
	return response.data;
});

const servicesSlice = createSlice({
	initialState,
	name: 'servicesApp/services',
	reducers: {
		setTemplate(state, action: PayloadAction<Template>) {
			state.serviceForm.templateId = action.payload.templateId;
			state.serviceForm.templateName = action.payload.templateName;
		},
		setStep(state, action: PayloadAction<number>) {
			state.step = action.payload;
		},
		nextStep(state) {
			state.step += 1;
		},
		setDomain(state, action: PayloadAction<{ domain: string; challengeType: any }>) {
			const { challengeType, domain } = action.payload;
			state.serviceForm.domain.domain = domain;
			state.serviceForm.domain.challengType = challengeType;
		},
		setPlanId(state, action: PayloadAction<string>) {
			state.serviceForm.planId = action.payload;
		},
		setTemplateSettings(state, action: PayloadAction<TemplateSettingsForm>) {
			state.serviceForm = { ...state.serviceForm, ...action.payload };
		},
		openDeleteDialog(state, action: PayloadAction<ServicesInterface.DeleteDomainBody>) {
			state.deleteDialog = { isOpen: true, loading: false, ...action.payload };
		},
		closeDeleteDialog(state) {
			state.deleteDialog.isOpen = false;
		},
		openChangeDomainDialog(state, action: PayloadAction<ServicesInterface.ChangePrimaryDomainBody>) {
			state.changeDomainDialog = { isOpen: true, loading: false, ...action.payload };
		},
		closeChangeDomainDialog(state) {
			state.changeDomainDialog.isOpen = false;
		},
		openAddDomainDialog(state, action: PayloadAction<string>) {
			state.addDialog.isOpen = true;
			state.addDialog.loading = false;
			state.addDialog.portalId = action.payload;
		},
		closeAddDomainDialog(state) {
			state.addDialog.isOpen = false;
		}
	},
	extraReducers: {
		[getServices.pending.toString()]: state => {
			state.loading = true;
		},
		[getServices.fulfilled.toString()]: (state, action: PayloadAction<ServicesInterface.IService[]>) => {
			state.entities = action.payload;
			state.loading = false;
		},
		[getServices.rejected.toString()]: state => {
			state.loading = false;
		},
		[buyService.fulfilled.toString()]: state => {
			state.serviceForm = { ...initialState.serviceForm };
			state.step = 0;
		},
		[deleteDomain.pending.toString()]: state => {
			state.deleteDialog.loading = true;
		},
		[deleteDomain.fulfilled.toString()]: (state, action) => {
			state.deleteDialog.loading = false;
			state.deleteDialog.isOpen = false;
			const { domain: selectedDomain, portalId } = action.meta.arg;
			const service = state.entities.find(service => service.id === portalId);
			service.domains = service.domains.filter(domain => domain.domain !== selectedDomain);
		},
		[deleteDomain.rejected.toString()]: state => {
			state.deleteDialog.loading = false;
		},
		[addDomain.pending.toString()]: state => {
			state.addDialog.loading = true;
		},
		[addDomain.rejected.toString()]: state => {
			state.addDialog.loading = false;
		},
		[addDomain.fulfilled.toString()]: (state, action) => {
			const { portalId, domain } = action.payload;
			const service = state.entities.find(service => service.id === portalId);
			service.domains.push(domain);
			state.addDialog.loading = false;
			state.addDialog.isOpen = false;
		},
		[changePrimaryDomain.pending.toString()]: state => {
			state.changeDomainDialog.loading = true;
		},
		[changePrimaryDomain.fulfilled.toString()]: (state, action) => {
			const { portalId, domain } = action.meta.arg;
			const service = state.entities.find(service => service.id === portalId);
			service.domains.find(d => d.domain === domain).isPrimary = true;
			state.changeDomainDialog.loading = false;
			state.changeDomainDialog.isOpen = false;
		},
		[changePrimaryDomain.rejected.toString()]: state => {
			state.changeDomainDialog.loading = false;
		},
		[changeDomainSecure.pending.toString()]: (state, action) => {
			const { domain } = action.meta.arg;
			state.secureLoading[domain] = true;
		},
		[changeDomainSecure.rejected.toString()]: (state, action) => {
			const { domain } = action.meta.arg;
			state.secureLoading[domain] = false;
		},
		[changeDomainSecure.fulfilled.toString()]: (state, action) => {
			const { domain, portalId } = action.meta.arg;
			state.secureLoading[domain] = false;
			const service = state.entities.find(service => service.id === portalId);
			const selectedDomain = service.domains.find(d => d.domain === domain);
			selectedDomain.isSecure = !selectedDomain.isSecure;
		},
		[changeDomainRedirectUrl.fulfilled.toString()]: (state, action) => {
			const { domain, portalId, redirectUrl } = action.meta.arg;
			const service = state.entities.find(service => service.id === portalId);
			const selectedDomain = service.domains.find(d => d.domain === domain);
			selectedDomain.redirectUrl = redirectUrl;
		},
		[changeServiceTemplate.fulfilled.toString()]: (state, action) => {
			const { portalId, templateId } = action.meta.arg;
			const service = state.entities.find(service => service.id === portalId);
			service.templateId = templateId;
		},
		[changeServiceStatus.fulfilled.toString()]: (state, action) => {
			const { portalId, status } = action.meta.arg;
			const service = state.entities.find(service => service.id === portalId);
			service.status = status;
		},
		[getServiceById.fulfilled.toString()]: (state, action: PayloadAction<ServicesInterface.IService>) => {
			const serviceIndex = state.entities.findIndex(service => service.id === action.payload.id);
			if (serviceIndex === -1) {
				state.entities.push(action.payload);
			} else {
				state.entities[serviceIndex] = action.payload;
			}
		}
	}
});

export const {
	setTemplate,
	nextStep,
	setDomain,
	setStep,
	setPlanId,
	setTemplateSettings,
	closeDeleteDialog,
	openDeleteDialog,
	closeChangeDomainDialog,
	openChangeDomainDialog,
	closeAddDomainDialog,
	openAddDomainDialog
} = servicesSlice.actions;
export default servicesSlice.reducer;

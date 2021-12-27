import { Http } from '../Http/index';
const prefix = `https://api.tarnamagostar.com/portal/api/Portal`;

export const ServicesApi = {
	addService: async (
		data: ServicesInterface.IAddService
	): Promise<IGlobalData.IServiceResult<ServicesInterface.IService>> => {
		let response: IGlobalData.IServiceResult<ServicesInterface.IService>;
		response = await Http.request('post', true, `${prefix}/AddPortal`, null, data);
		return response;
	},

	getServices: async (): Promise<IGlobalData.IServiceResult<ServicesInterface.IService[]>> => {
		let response: IGlobalData.IServiceResult<ServicesInterface.IService[]>;
		response = await Http.request('get', true, `${prefix}/GetUserPortals`);
		return response;
	},

	deleteDomain: async (data: ServicesInterface.DeleteDomainBody): Promise<IGlobalData.IServiceResult<void>> => {
		let response: IGlobalData.IServiceResult<void>;
		response = await Http.request('delete', true, `${prefix}/DeleteDomainFromPortal`, null, data);
		return response;
	},

	addDomain: async (
		data: ServicesInterface.AddDomainBody
	): Promise<IGlobalData.IServiceResult<ServicesInterface.Domain>> => {
		let response: IGlobalData.IServiceResult<ServicesInterface.Domain>;
		response = await Http.request('put', true, `${prefix}/AddDomainToPortal`, null, data);
		return response;
	},

	changePrimaryDomain: async (
		data: ServicesInterface.ChangePrimaryDomainBody
	): Promise<IGlobalData.IServiceResult<void>> => {
		let response: IGlobalData.IServiceResult<void>;
		response = await Http.request('put', true, `${prefix}/SetPortalDomainAsPrimary`, null, data);
		return response;
	},

	changeDomainSecure: async (
		data: ServicesInterface.ChangeDomainSecureBody
	): Promise<IGlobalData.IServiceResult<void>> => {
		let response: IGlobalData.IServiceResult<void>;
		response = await Http.request('put', true, `${prefix}/ChangePortalDomainSecure`, null, data);
		return response;
	},

	changeDomainRedirectUrl: async (
		data: ServicesInterface.ChangeDomainRedirectUrl
	): Promise<IGlobalData.IServiceResult<void>> => {
		let response: IGlobalData.IServiceResult<void>;
		response = await Http.request('put', true, `${prefix}/EditPortalDomainRedirectUrl`, null, data);
		return response;
	},

	changeTemplate: async (
		data: ServicesInterface.ChangeServiceTemplateBody
	): Promise<IGlobalData.IServiceResult<void>> => {
		let response: IGlobalData.IServiceResult<void>;
		response = await Http.request('put', true, `${prefix}/ChangePortalTemplate`, null, data);
		return response;
	},

	changeStatus: async (
		data: ServicesInterface.ChangeServiceStatusBody
	): Promise<IGlobalData.IServiceResult<void>> => {
		let response: IGlobalData.IServiceResult<void>;
		response = await Http.request('put', true, `${prefix}/ChangePortalStatus`, null, data);
		return response;
	},

	getServiceById: async (portalId: string) => {
		let response: IGlobalData.IServiceResult<ServicesInterface.IService>;
		response = await Http.request('get', true, `${prefix}/GetPortalById/${portalId}`);
		return response;
	}
};

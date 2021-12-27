import { Template } from './props';

export interface ServicesState {
	entities: ServicesInterface.IService[];
	loading: boolean;
	step: number;
	serviceForm: ServicesInterface.IAddService;
	secureLoading: { [domain: string]: boolean };
	deleteDialog: {
		isOpen: boolean;
		domain: string;
		portalId: string;
		loading: boolean;
	};
	changeDomainDialog: {
		isOpen: boolean;
		domain: string;
		portalId: string;
		loading: boolean;
	};
	addDialog: {
		isOpen: boolean;
		loading: boolean;
		portalId: string;
	};
}

export interface TemplateSettingsForm {
	title: string;
	description: string;
	serviceId: string;
	serviceName?: string;
	reagentCode?: string;
}

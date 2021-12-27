declare namespace ServicesInterface {
	interface Domain {
		domain: string;
		isPrimary: boolean;
		isSecure: boolean;
		redirectUrl: string;
		status: number;
		challengType: number;
		txtHash: string;
		nameServers: string[2];
	}

	interface IService {
		id: string;
		userId: string;
		serviceName: string;
		serviceId: string;
		domains: Domain[];
		planId: string;
		createdDateTime: string;
		persianCreatedDateTime: string;
		templateId: string;
		templateName: string;
		status: 1 | 2;
	}

	interface IAddService {
		serviceName: string;
		serviceId: string;
		domain: {
			domain: string;
			challengType: ChallengType;
		};
		templateName: string;
		templateId: string;
		planId: string;
		title?: string;
		description?: string;
		reagentCode?: string;
	}

	interface DeleteDomainBody {
		portalId: string;
		domain: string;
	}

	interface AddDomainBody {
		portalId: string;
		domain: string;
		challengType: ChallengType;
	}

	interface ChangePrimaryDomainBody {
		portalId: string;
		domain: string;
	}

	interface ChangeDomainSecureBody {
		portalId: string;
		domain: string;
		isSecure: boolean;
	}

	interface ChangeServiceTemplateBody {
		portalId: string;
		templateId: string;
		templateName: string;
	}

	interface ChangeDomainRedirectUrl {
		portalId: string;
		domain: string;
		redirectUrl: string;
	}

	interface ChangeServiceStatusBody {
		portalId: string;
		status: 1 | 2;
	}
}

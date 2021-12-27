export interface Template {
	templateId: string;
	templateName: string;
	templatePrev: string;
	templateDescription: string;
}

export interface Plan {
	planId: string;
	priceMonthly: number;
	priceYearly: number;
	name: string;
	options: string[];
}

export interface ServiceTypeForm {
	serviceId: string;
	serviceName: string;
}

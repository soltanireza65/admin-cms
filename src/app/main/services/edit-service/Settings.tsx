import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, setTemplateSettings } from '../store/servicesSlice';
import { TemplateSettingsForm } from '../interfaces/states';
import SettingsForm from '../service/SettingsForm';
import { ServiceTypeForm } from '../interfaces/props';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';

const servicesTypes: ServiceTypeForm[] = [
	{
		serviceName: 'خبری',
		serviceId: '1'
	},
	{
		serviceName: 'فروشگاهی',
		serviceId: '2'
	}
];

export default function Settings() {
	const dispatch = useDispatch();
	const { serviceId, title, description } = useSelector((store: any) => store.servicesApp.services.serviceForm);
	const { t } = useTranslation('servicesApp');
	const onSubmit = (values: TemplateSettingsForm) => {
		const { serviceName } = servicesTypes.find(service => service.serviceId === values.serviceId);
		dispatch(setTemplateSettings({ ...values, serviceName }));
		dispatch(nextStep());
	};

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<div className="text-lg py-10 font-bold">{t('website_management')}</div>
			</AccordionSummary>
			<AccordionDetails className="flex justify-center">
				<div className="flex-1 max-w-sm pb-8">
					<SettingsForm onSubmit={onSubmit} initialValues={{ serviceId, title, description }} />
				</div>
			</AccordionDetails>
		</Accordion>
	);
}

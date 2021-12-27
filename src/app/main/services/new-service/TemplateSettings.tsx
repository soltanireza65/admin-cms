import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, setTemplateSettings } from '../store/servicesSlice';
import { TemplateSettingsForm } from '../interfaces/states';
import SettingsForm, { servicesTypes } from '../service/SettingsForm';

export default function TemplateSettings() {
	const dispatch = useDispatch();
	const { serviceId, title, description } = useSelector((store: any) => store.servicesApp.services.serviceForm);

	const onSubmit = (values: TemplateSettingsForm) => {
		const { serviceName } = servicesTypes.find(service => service.serviceId === values.serviceId);
		dispatch(setTemplateSettings({ ...values, serviceName }));
		dispatch(nextStep());
	};

	return (
		<div className="mx-auto max-w-sm mt-10">
			<SettingsForm onSubmit={onSubmit} initialValues={{ serviceId, title, description }} isInitial />
		</div>
	);
}

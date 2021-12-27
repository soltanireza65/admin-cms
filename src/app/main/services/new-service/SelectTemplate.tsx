import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Template } from '../interfaces/props';
import { nextStep, setTemplate } from '../store/servicesSlice';
import TemplateForm from '../service/TemplateForm';

export default function SelectTemplate() {
	const dispatch = useDispatch();
	const selectedTemple = useSelector((store: any) => store.servicesApp.services.serviceForm.templateId);
	const { t } = useTranslation('servicesApp');

	const handleSelectTemplate = (template: Template) => {
		dispatch(setTemplate(template));
		dispatch(nextStep());
	};

	return (
		<div>
			<TemplateForm
				selectedTemple={selectedTemple}
				handleSelectTemplate={handleSelectTemplate}
				title={t('choose_fav_template')}
			/>
		</div>
	);
}

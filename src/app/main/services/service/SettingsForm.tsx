import { Button, TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { ServiceTypeForm } from '../interfaces/props';
import { ServiceType } from '../interfaces/ServiceType';
import { TemplateSettingsForm } from '../interfaces/states';

export const servicesTypes: ServiceTypeForm[] = [
	{
		serviceName: ServiceType.NEWS,
		serviceId: '1'
	},
	{
		serviceName: ServiceType.SHOP,
		serviceId: '2'
	}
];

interface Props {
	onSubmit: (values: TemplateSettingsForm) => void;
	initialValues: TemplateSettingsForm;
	isInitial?: boolean;
}

export default function SettingsForm({ initialValues, onSubmit, isInitial = false }: Props) {
	const { t } = useTranslation('servicesApp');
	const common = useTranslation('common');

	const { values, handleSubmit, handleChange, handleBlur, errors, touched } = useFormik({
		initialValues,
		onSubmit,
		validationSchema: Yup.object({
			title: Yup.string().required(common.t('field_required', { field: t('website_title') })),
			serviceId: Yup.string().required(common.t('field_required', { field: t('service_type') }))
		})
	});

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				placeholder={t('website_title')}
				label={t('website_title')}
				name="title"
				variant="outlined"
				value={values.title}
				onChange={handleChange}
				onBlur={handleBlur}
				fullWidth
				className="mb-12"
				error={touched.title && Boolean(errors.title)}
				helperText={touched.title ? errors.title : ''}
			/>
			<TextField
				placeholder={t('website_description')}
				label={t('website_description')}
				name="description"
				variant="outlined"
				value={values.description}
				onChange={handleChange}
				onBlur={handleBlur}
				fullWidth
				className="mb-12"
				error={touched.description && Boolean(errors.description)}
				helperText={touched.description ? errors.description : ''}
			/>
			{isInitial && (
				<TextField
					placeholder={t('reagent_code')}
					label={t('reagent_code')}
					name="reagentCode"
					variant="outlined"
					value={values.reagentCode}
					onChange={handleChange}
					onBlur={handleBlur}
					fullWidth
					className="mb-12"
				/>
			)}
			<div className="max-w-200 mb-16">
				<FormControl variant="outlined" fullWidth>
					<InputLabel id="demo-simple-select-outlined-label">{t('service_type')}</InputLabel>
					<Select
						name="serviceId"
						label={t('service_type')}
						value={values.serviceId}
						onChange={handleChange}
						error={Boolean(errors.serviceId) && touched.serviceId}
					>
						{servicesTypes.map(service => (
							<MenuItem key={service.serviceId} value={service.serviceId}>
								{t(service.serviceName.toLowerCase())}
							</MenuItem>
						))}
					</Select>
					<FormHelperText error>{touched.serviceId ? errors.serviceId : ''}</FormHelperText>
				</FormControl>
			</div>
			<Button type="submit" color="primary" variant="outlined" fullWidth>
				{t('register')}
			</Button>
		</form>
	);
}

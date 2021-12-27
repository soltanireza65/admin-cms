import {
	Button,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Radio,
	RadioGroup,
	TextField,
	Typography
} from '@material-ui/core';
import { Form, useFormik } from 'formik';
import React, { ReactChild } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { ChallengType } from '../interfaces/ChallengeType';

export interface Form {
	domain: string;
	challengeType: ChallengType;
}

interface Props {
	initialValues: Form;
	onSubmit: (values: Form) => void;
	actionButton: ReactChild;
}

export default function DomainForm({ initialValues, onSubmit, actionButton }: Props) {
	const { t } = useTranslation('servicesApp');
	const common = useTranslation('common');

	const { handleSubmit, values, handleChange, handleBlur, errors, touched } = useFormik({
		initialValues,
		onSubmit,
		validationSchema: Yup.object({
			domain: Yup.string().required(common.t('field_required', { field: t('domain') })),
			challengeType: Yup.number().required(t('select_option'))
		})
	});

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				variant="outlined"
				placeholder={t('domain')}
				label={t('domain')}
				fullWidth
				className="mb-28"
				name="domain"
				value={values.domain}
				onChange={handleChange}
				onBlur={handleBlur}
				helperText={(touched.domain && errors.domain) || t('domain_validation')}
				error={touched.domain && Boolean(errors.domain)}
			/>
			<Typography className="mb-12 mt-16" variant="subtitle1">
				{t('select_an_option')} :
			</Typography>
			<FormControl component="fieldset" className="mb-16">
				<RadioGroup name="challengeType" value={values.challengeType + ''} onChange={handleChange}>
					<FormControlLabel
						value={ChallengType.TxtRecord + ''}
						control={<Radio color="primary" />}
						label={<Typography variant="body2">{t('domain_option_1')}</Typography>}
					/>
					<FormControlLabel
						value={ChallengType.NameServer + ''}
						control={<Radio color="primary" />}
						label={<Typography variant="body2">{t('domain_option_2')}</Typography>}
					/>
				</RadioGroup>
				<FormHelperText error>{touched.challengeType ? errors.challengeType : ''}</FormHelperText>
			</FormControl>
			{actionButton}
		</form>
	);
}

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DomainForm, { Form } from '../service/DomainForm';
import { nextStep, setDomain } from '../store/servicesSlice';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';

export default function SelectDomain() {
	const dispatch = useDispatch();
	const { domain, challengType } = useSelector((store: any) => store.servicesApp.services.serviceForm.domain);
	const { t } = useTranslation('servicesApp');
	const onSubmit = (values: Form) => {
		dispatch(
			setDomain({
				domain: values.domain.replace(/^http(s)?(:\/\/)?(www.)?/, ''),
				challengeType: values.challengeType
			})
		);
		dispatch(nextStep());
	};
	return (
		<div className="max-w-sm mx-auto mt-20 pb-40">
			<DomainForm
				initialValues={{ domain, challengeType: challengType }}
				onSubmit={onSubmit}
				actionButton={
					<Button color="primary" variant="outlined" fullWidth type="submit">
						{t('add_domain')}
					</Button>
				}
			/>
		</div>
	);
}

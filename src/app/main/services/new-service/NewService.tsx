import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import SelectTemplate from './SelectTemplate';
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import SelectPayment from './SelectPayment';
import { setStep } from '../store/servicesSlice';
import TemplateSettings from './TemplateSettings';
import SelectDomain from './SelectDomain';

const steps = ['choose_template', 'template_setting', 'choose_domain', 'payment'];
const ServicesApp = () => {
	const dispatch = useDispatch();
	const pageLayout = useRef(null);
	const { t } = useTranslation('servicesApp');

	const { step, serviceForm } = useSelector((store: any) => store.servicesApp.services);

	const isCompleted = (step: number): boolean => {
		switch (step) {
			case 0:
				return !!serviceForm.templateId;
			case 1:
				return !!serviceForm.title;
			case 2:
				return !!serviceForm.domain.domain;
			default:
				return false;
		}
	};

	const canGotoStep = (newStep: number): boolean => {
		if (newStep < step) return true;
		switch (newStep) {
			case 1:
				return !!serviceForm.templateId;
			case 2:
				return !!serviceForm.title;
			case 3:
				return !!serviceForm.domain.domain;
			default:
				return false;
		}
	};

	const handleStep = (step: number) => {
		if (canGotoStep(step)) dispatch(setStep(step));
	};

	const getStep = () => {
		switch (step) {
			case 0:
				return <SelectTemplate />;
			case 1:
				return <TemplateSettings />;
			case 2:
				return <SelectDomain />;
			case 3:
				return <SelectPayment />;

			default:
				return <div></div>;
		}
	};

	return (
		<>
			<FusePageCarded
				classes={{
					root: 'w-full',
					header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136',
					content: 'max-h-full'
				}}
				content={
					<div className="mt-10 px-16 md:px-32">
						<Stepper nonLinear activeStep={step} className="px-0">
							{steps.map((label, index) => (
								<Step key={label} completed={isCompleted(index)}>
									<StepButton color="inherit" onClick={() => handleStep(index)}>
										<span className={index === step ? 'block' : 'hidden sm:block '}>
											{t(label)}
										</span>
									</StepButton>
								</Step>
							))}
						</Stepper>
						{getStep()}
					</div>
				}
				header={<Header />}
				ref={pageLayout}
				useFuseScrollBar={false}
			/>
		</>
	);
};
export default withReducer('servicesApp', reducer)(ServicesApp);

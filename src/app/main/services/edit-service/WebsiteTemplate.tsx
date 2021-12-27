import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Template } from '../interfaces/props';
import TemplateForm from '../service/TemplateForm';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch } from 'react-redux';
import { changeServiceTemplate } from '../store/servicesSlice';

interface Props {
	templateId: string;
	portalId: string;
}

const useStyles = makeStyles(theme => ({
	spinner: {
		top: '25%',
		left: '50%',
		transform: 'translate(-50%,-50%)',
		position: 'absolute',
		color: '#fff'
	},
	backdrop: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,0.5)'
	}
}));

export default function WebsiteTemplate({ portalId, templateId }: Props) {
	const { t } = useTranslation('servicesApp');
	const dispatch = useDispatch();
	const classes = useStyles();
	const [loading, setLoading] = useState<boolean>(false);

	const handleChangeTemplate = async (template: Template) => {
		if (!loading) {
			setLoading(true);
			await dispatch(
				changeServiceTemplate({
					templateId: template.templateId,
					templateName: template.templateName,
					portalId
				})
			);
			setLoading(false);
		}
	};

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<div className="text-lg py-10 font-bold">{t('template_management')}</div>
			</AccordionSummary>
			<AccordionDetails className="relative">
				<TemplateForm selectedTemple={templateId} handleSelectTemplate={handleChangeTemplate} />
				{loading && (
					<>
						<div className={classes.backdrop}></div>
						<div className={classes.spinner}>
							<CircularProgress color="inherit" />
						</div>
					</>
				)}
			</AccordionDetails>
		</Accordion>
	);
}

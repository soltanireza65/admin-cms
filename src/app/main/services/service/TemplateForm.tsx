import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Template } from '../interfaces/props';
import TemplateCard from './TemplateCard';

const templates: Template[] = [
	{
		templateId: '1',
		templateName: 'قالب 1',
		templatePrev: 'https://webzi.ir/static/0.0.1/themes/images/theme30.w_768,h_550,r_ct,s_n.jpg',
		templateDescription: 'این یک قالب خوب است'
	},
	{
		templateId: '2',
		templateName: 'قالب 2',
		templatePrev: 'https://webzi.ir/static/0.0.1/themes/images/theme21.w_768,h_550,r_ct,s_n.jpg',
		templateDescription: 'این یک قالب خوب است'
	},
	{
		templateId: '3',
		templateName: 'قالب 3',
		templatePrev: 'https://webzi.ir/static/0.0.1/themes/images/theme37.w_768,h_550,r_ct,s_n.jpg',
		templateDescription: 'این یک قالب خوب است'
	},
	{
		templateId: '5',
		templateName: 'قالب 5',
		templatePrev: 'https://webzi.ir/static/0.0.1/themes/images/theme21.w_768,h_550,r_ct,s_n.jpg',
		templateDescription: 'این یک قالب خوب است'
	},

	{
		templateId: '6',
		templateName: 'قالب 6',
		templatePrev: 'https://webzi.ir/static/0.0.1/themes/images/theme37.w_768,h_550,r_ct,s_n.jpg',
		templateDescription: 'این یک قالب خوب است'
	},
	{
		templateId: '4',
		templateName: 'قالب 4',
		templatePrev: 'https://webzi.ir/static/0.0.1/themes/images/theme30.w_768,h_550,r_ct,s_n.jpg',
		templateDescription: 'این یک قالب خوب است'
	}
];

interface Props {
	selectedTemple: string;
	handleSelectTemplate: (template: Template) => void;
	title?: string;
}

export default function TemplateForm({ handleSelectTemplate, selectedTemple, title }: Props) {
	const { t } = useTranslation('servicesApp');

	return (
		<div>
			<Typography className="my-20" variant="h6">
				{title}
			</Typography>
			<Grid container>
				{templates.map(template => (
					<Grid key={template.templateId} item xs={12} lg={4} sm={6} className="px-12 mb-20">
						<TemplateCard
							template={template}
							onClick={handleSelectTemplate}
							selectedTemple={selectedTemple}
						/>
					</Grid>
				))}
			</Grid>
		</div>
	);
}

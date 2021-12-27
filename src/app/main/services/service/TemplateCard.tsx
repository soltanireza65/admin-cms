import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Template } from '../interfaces/props';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';

interface Props {
	template: Template;
	onClick: (template: Template) => void;
	selectedTemple: string;
}

const useStyle = makeStyles({
	card: {
		transition: 'transform 0.2s',
		position: 'relative',
		'&:hover': {
			transform: 'translateY(-12px)'
		}
	},
	selected: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,0.25)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'green'
	}
});

export default function TemplateCard({ template, onClick, selectedTemple }: Props) {
	const classes = useStyle();

	return (
		<Paper
			className={`px-18 py-10 transform hover:translate-y-4 cursor-pointer ${classes.card}`}
			elevation={4}
			onClick={() => onClick(template)}
		>
			<img src={template.templatePrev} alt={template.templateName} />
			<div className="px-10">
				<Typography variant="subtitle1" className="font-bold mt-12">
					{template.templateName}
				</Typography>
				<Typography variant="body2" className="font-light mt-5">
					{template.templateDescription}
				</Typography>
			</div>
			{template.templateId === selectedTemple && (
				<div className={classes.selected}>
					<CheckCircleOutline color="inherit" style={{ fontSize: 60 }} />
				</div>
			)}
		</Paper>
	);
}

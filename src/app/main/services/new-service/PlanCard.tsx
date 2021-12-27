import { Button, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Plan } from '../interfaces/props';
import CheckIcon from '@material-ui/icons/Check';

interface Props {
	plan: Plan;
	onBuy: (plandId: string) => void;
}

const useStyles = makeStyles({
	card: {
		transition: 'transform 0.2s',
		position: 'relative',
		'&:hover': {
			transform: 'translateY(-12px)'
		}
	}
});

export default function PlanCard({ plan, onBuy }: Props) {
	const classes = useStyles();

	const onPayment = () => {
		onBuy(plan.planId);
	};

	return (
		<Paper className={`pt-32 pb-20 px-56 mt-10 ${classes.card}`} elevation={4}>
			<Typography variant="h6" className="text-center mb-20 text-gray-700">
				{plan.name}
			</Typography>
			<div className="mb-24 flex items-center">
				<Typography variant="caption" className="text-gray-600 mt-10">
					هزار تومان
				</Typography>
				<Typography variant="h3" className="mx-6">
					{plan.priceMonthly / 10000}
				</Typography>
				<Typography variant="caption" className="text-gray-600">
					/ در ماه
				</Typography>
			</div>
			<Typography variant="caption" className="text-gray-600 text-center mb-20 block">
				یک ساله به مبلغ {plan.priceYearly / 10000000} میلیون تومان
			</Typography>
			{plan.options.map((option, index) => (
				<Typography key={index} variant="body2" className="mb-8">
					<CheckIcon className="ml-6" fontSize="small" />
					{option}
				</Typography>
			))}
			<div className="text-center mt-32">
				<Button variant="outlined" fullWidth color="primary" onClick={onPayment}>
					پرداخت
				</Button>
			</div>
		</Paper>
	);
}

import { Backdrop, CircularProgress, Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import { foldedWith, navbarWidth } from 'app/fuse-layouts/layout1/components/NavbarWrapperLayout1';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Plan } from '../interfaces/props';
import { buyService } from '../store/servicesSlice';
import PlanCard from './PlanCard';

const plans: Plan[] = [
	{
		name: 'کسب و کار',
		planId: '1',
		priceMonthly: 1170000,
		priceYearly: 14000000,
		options: ['۳ گیگابایت فضای هاست', '۳۲ گیگابات پهنای باند', 'SSL', 'اخبار و مقالات', '۱۰ ایمیل اختصاصی']
	},
	{
		name: 'برندینگ',
		planId: '2',
		priceMonthly: 2500000,
		priceYearly: 30000000,
		options: ['۳ گیگابایت فضای هاست', '۳۲ گیگابات پهنای باند', 'SSL', 'اخبار و مقالات', '۱۰ ایمیل اختصاصی']
	},
	{
		name: 'کسب و کار',
		planId: '6',
		priceMonthly: 1170000,
		priceYearly: 14000000,
		options: ['۳ گیگابایت فضای هاست', '۳۲ گیگابات پهنای باند', 'SSL', 'اخبار و مقالات', '۱۰ ایمیل اختصاصی']
	},
	{
		name: 'برندینگ',
		planId: '5',
		priceMonthly: 2500000,
		priceYearly: 30000000,
		options: ['۳ گیگابایت فضای هاست', '۳۲ گیگابات پهنای باند', 'SSL', 'اخبار و مقالات', '۱۰ ایمیل اختصاصی']
	},
	{
		name: 'کسب و کار',
		planId: '1',
		priceMonthly: 1170000,
		priceYearly: 14000000,
		options: ['۳ گیگابایت فضای هاست', '۳۲ گیگابات پهنای باند', 'SSL', 'اخبار و مقالات', '۱۰ ایمیل اختصاصی']
	},
	{
		name: 'کسب و کار',
		planId: '4',
		priceMonthly: 1170000,
		priceYearly: 14000000,
		options: ['۳ گیگابایت فضای هاست', '۳۲ گیگابات پهنای باند', 'SSL', 'اخبار و مقالات', '۱۰ ایمیل اختصاصی']
	}
];

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff'
	}
}));

export default function SelectPayment() {
	const dispatch = useDispatch();
	const classes = useStyles();
	const history = useHistory();
	const folded = useSelector((store: any) => store.fuse.settings.defaults.layout.config.navbar.folded);
	const isDesktop = useMediaQuery('(min-width:1200px)');

	const form = useSelector((store: any) => store.servicesApp.services.serviceForm);
	const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

	const handlePayment = async (planId: string) => {
		setShowBackdrop(true);
		await dispatch(
			buyService({
				...form,
				planId
			})
		);
		history.replace(`/apps/services/list`);
		setShowBackdrop(false);
	};

	const getBackdropRightProperty = () => {
		if (isDesktop) {
			return folded ? foldedWith : navbarWidth;
		} else {
			return 0;
		}
	};

	return (
		<Grid container className="justify-center md:justify-between pb-32">
			<Backdrop open={showBackdrop} className={classes.backdrop} style={{ right: getBackdropRightProperty() }}>
				<CircularProgress color="inherit" />
			</Backdrop>
			{plans.map(plan => (
				<Grid key={plan.planId} item className="mb-12 mx-8">
					<PlanCard plan={plan} onBuy={handlePayment} />
				</Grid>
			))}
		</Grid>
	);
}

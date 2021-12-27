//**  this file will be JS file becuase 'fa' and 'JalaliUtils' not have type modules for typescript * /
import React, { useState } from 'react';
import DatePicker from '../../shared-components/datePicker/DatePicker';
import moment from 'moment-jalaali';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import Transition from '../../shared-components/Transition';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { closePublishDialog, publishNewsInTheFuture } from '../store/newsSlice';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2)
		}
	},
	fabProgress: {
		color: green[500]
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#000'
	}
}));
moment.loadPersian({ dialect: 'persian-modern' });
export default () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const dialogState = useSelector(({ newsApp }: any) => newsApp.news);
	const [selectedDate, setSelectedDate] = useState(moment());

	const { t } = useTranslation('newsApp');
	const handleClose = () => {
		dispatch(closePublishDialog({}));
	};
	const handleSubmit = () => {
		dispatch(
			publishNewsInTheFuture({
				newsId: dialogState.datePublishDialog.id,
				startPublishDateTimeString: selectedDate,
				titr: dialogState.datePublishDialog.title
			})
		);
	};
	const handleDateChange = date => {
		setSelectedDate(date);
	};
	return (
		<Dialog
			{...dialogState.datePublishDialog.props}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
			className="rtl"
		>
			<DialogTitle id="alert-dialog-slide-title">
				{t('date_publish_time')}
				{' -> '}
				{dialogState.datePublishDialog.title}
			</DialogTitle>
			<DialogContent>
				<Typography variant="subtitle1" gutterBottom>
					تاریخ انتشار:
				</Typography>
				<DatePicker onChange={handleDateChange} selectedDate={selectedDate} />
				<div className="flex mb-2 justify-content-center">
					<Button
						onClick={handleClose}
						variant="outlined"
						disabled={dialogState.loading}
						size="small"
						className="flex flex-1 ml-2"
					>
						بازگشت
					</Button>
					<Button
						onClick={handleSubmit}
						size="small"
						variant="outlined"
						color="primary"
						disabled={dialogState.loading}
						className="flex flex-1 mr-2"
					>
						ذخیره
					</Button>
					{dialogState.loading && (
						<div className={classes.root}>
							<LinearProgress color="secondary" />
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

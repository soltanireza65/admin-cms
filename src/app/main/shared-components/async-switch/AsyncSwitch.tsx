import { CircularProgress, FormControlLabel, makeStyles, Switch, Theme } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
	loadingSwitch: {
		opacity: 0.5,
		cursor: 'not-allowed'
	},
	spinner: {
		position: 'absolute',
		top: '50%',
		right: '50%',
		transform: 'translate(25%, -35%)',
		color: 'white'
	},
	disable: {
		transform: 'translate(-149%, -35%)'
	}
}));

export default function AsyncSwitch({ checked, handleChange, loading }) {
	const classes = useStyles();
	return (
		<div className="relative">
			<FormControlLabel
				control={
					<Switch
						disableRipple
						checked={checked}
						onChange={handleChange}
						value="checkedB"
						className={loading ? classes.loadingSwitch : ''}
					/>
				}
				label=""
			/>
			{loading && (
				<div className={`${classes.spinner} ${checked ? '' : classes.disable}`}>
					<CircularProgress color="primary" size={12} />
				</div>
			)}
		</div>
	);
}

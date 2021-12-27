import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgressProps } from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { BorderLinearProgress } from './styleDesign';

export default (props: LinearProgressProps & { value: number }) => {
	return (
		<Box display="flex" alignItems="center">
			<Box width="100%" mr={1}>
				<BorderLinearProgress variant="determinate" {...props} />
			</Box>
			<Box minWidth={35}>
				<Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
};

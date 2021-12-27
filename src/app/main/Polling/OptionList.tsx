import React, { useEffect, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			maxWidth: 360,
			backgroundColor: theme.palette.background.paper
		}
	})
);

interface IProps {
	options?: PollingInterface.IOption[];
}

const OptionList = ({ options }) => {
	const classes = useStyles();
	return (
		<div style={{ maxHeight: 200, overflow: 'auto' }}>
			<List className={classes.root}>
				{options &&
					options.length > 0 &&
					options.map((item, index) => {
						return (
							<ListItem key={index}>
								<ListItemText secondary={item.title} />
							</ListItem>
						);
					})}
			</List>
		</div>
	);
};

export default OptionList;

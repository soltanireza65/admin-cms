import { IconButton, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTranslation } from 'react-i18next';

interface Props {
	option: PollingInterface.IOption;
	onDelete: (optionId: string) => void;
	showVote?: boolean;
}

export default function OptionItem({ option, onDelete, showVote = true }: Props) {
	const { t } = useTranslation('PollingApp');

	return (
		<ListItem key={option.id}>
			<ListItemText primary={option.title} secondary={showVote ? `${option.voteCount} ${t('vote')}` : ''} />
			<ListItemSecondaryAction>
				<IconButton edge="end" aria-label="delete" onClick={() => onDelete(option.id)}>
					<DeleteIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
}

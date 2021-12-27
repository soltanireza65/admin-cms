import React from 'react';
import TagSuggestions from '../../shared-components/tags/TagTextBoxt';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

export default ({ handleChange, required, tagsSelected, isEdditingMode }) => {
	const { t } = useTranslation('newsApp');

	return (
		<div className="mt-10">
			{Boolean(required) && (
				<h3
					style={{
						color: 'red'
					}}
				>
					{t('three_labels_required')}
				</h3>
			)}
			<Typography variant="subtitle1" gutterBottom>
				{t('choose_labels')}
			</Typography>

			<TagSuggestions handleChange={handleChange} tagsSelected={tagsSelected} isEdditingMode={isEdditingMode} />
		</div>
	);
};

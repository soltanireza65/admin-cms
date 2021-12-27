import React from 'react';
import NewsSearch from '../../shared-components/newsSearch/NewsSearch';
import Typography from '@material-ui/core/Typography';
export default ({ handleChange }) => {
	return (
		<div className="mt-10">
			<Typography variant="subtitle1" gutterBottom>
				خبر(های) مرتبط:
			</Typography>
			<NewsSearch handleChange={handleChange} />
		</div>
	);
};

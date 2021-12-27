import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import rtl from 'jss-rtl';

function Breadcrumb(className: string, categories: ICategory.ICategoryData[]) {
	return (
		<Typography className={className}>
			{categories.map((item, index) => (
				<span key={index} className="flex items-center">
					<span>{item.title}</span>
					{categories.length - 1 !== index && <Icon>{rtl() ? 'chevron_left' : 'chevron_right'}</Icon>}
				</span>
			))}
		</Typography>
	);
}

export default Breadcrumb;

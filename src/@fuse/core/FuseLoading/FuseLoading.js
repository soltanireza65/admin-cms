import { useTimeout } from '@fuse/hooks';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function FuseLoading(props) {
	const [showLoading, setShowLoading] = useState(!props.delay);
	const { t } = useTranslation('categoryApp');

	useTimeout(() => {
		setShowLoading(true);
	}, props.delay);

	if (!showLoading) {
		return null;
	}

	return (
		<div className="flex flex-1 flex-col items-center justify-center">
			<Typography className="text-20 mb-16" color="textSecondary">
				{t('please_wait')} ...
			</Typography>
			<LinearProgress className="w-xs" color="secondary" />
		</div>
	);
}

FuseLoading.propTypes = {
	delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

FuseLoading.defaultProps = {
	delay: false
};

export default FuseLoading;

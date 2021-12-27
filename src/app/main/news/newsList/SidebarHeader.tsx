import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
function SidebarHeader() {
	const [selectedAccount, setSelectedCount] = useState('creapond');

	const { t } = useTranslation('newsApp');
	return (
		<div className="flex flex-col justify-center h-full p-24">
			<div className="flex items-center flex-1">
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<span className="text-24 mx-16">{t('sidebar_header_title')}</span>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default SidebarHeader;

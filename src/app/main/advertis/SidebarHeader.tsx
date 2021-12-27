import FuseAnimate from '@fuse/core/FuseAnimate';
import React from 'react';
import { useTranslation } from 'react-i18next';
function SidebarHeader() {
	const { t } = useTranslation('advertiesApp');
	return (
		<div className="flex flex-col justify-center h-full p-24">
			<div className="flex items-center flex-1">
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<span className="text-20 mx-16">{t('sidebar_header_title')}</span>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default SidebarHeader;

import FuseAnimate from '@fuse/core/FuseAnimate';
import React from 'react';
import { useTranslation } from 'react-i18next';
function Header() {
	const { t } = useTranslation('servicesApp');

	return (
		<div className="flex flex-col justify-center h-full p-24">
			<div className="flex items-center flex-1">
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<span className="text-24 mx-16">{t('services')}</span>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default Header;

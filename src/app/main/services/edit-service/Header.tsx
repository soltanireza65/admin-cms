import FuseAnimate from '@fuse/core/FuseAnimate';
import React, { ReactChild } from 'react';

interface Props {
	children: ReactChild;
}

function Header({ children }: Props) {
	return (
		<div className="flex flex-col justify-center h-full p-24">
			<div className="flex items-center flex-1">
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<span className="text-24 mx-16">{children}</span>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default Header;

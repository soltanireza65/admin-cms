import React, { ReactChild } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import HtmlTooltip from '../HtmlTooltip';

interface Props {
	children: ReactChild;
	title: string;
}

export default function ClickTooltip({ children, title }: Props) {
	const [open, setOpen] = React.useState(false);

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpen = () => {
		setOpen(true);
	};

	return (
		<ClickAwayListener onClickAway={handleTooltipClose}>
			<HtmlTooltip
				PopperProps={{
					disablePortal: true
				}}
				onClose={handleTooltipClose}
				open={open}
				disableFocusListener
				disableHoverListener
				disableTouchListener
				title={title}
			>
				<span onClick={handleTooltipOpen}>{children}</span>
			</HtmlTooltip>
		</ClickAwayListener>
	);
}

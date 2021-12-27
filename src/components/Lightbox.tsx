import React from 'react';

import { SRLWrapper } from 'simple-react-lightbox';

const options = {
	settings: {
		overlayColor: 'rgba(56, 56, 56, 0.75)',
		// autoplaySpeed: 1500,
		transitionSpeed: 900,
		disableKeyboardControls: true,
		disableWheelControls: true,
		disablePanzoom: true,
		hideControlsAfter: true
	},
	buttons: {
		backgroundColor: 'rgba(30,30,36,0.8)',
		iconColor: 'rgba(255, 255, 255, 0.8)',
		iconPadding: '10px',
		showAutoplayButton: true,
		showCloseButton: true,
		showDownloadButton: true,
		showFullscreenButton: true,
		showNextButton: false,
		showPrevButton: false,
		showThumbnailsButton: true,
		size: '40px'
	},
	caption: {
		captionAlignment: 'start',
		captionColor: '#FFFFFF',
		captionContainerPadding: '0',
		captionFontFamily: 'inherit',
		captionFontSize: 'inherit',
		captionFontStyle: 'inherit',
		captionFontWeight: 'inherit',
		captionTextTransform: 'inherit',
		showCaption: true
	},
	thumbnails: {
		showThumbnails: false
		// thumbnailsAlignment: 'center',
		// thumbnailsContainerBackgroundColor: 'transparent',
		// thumbnailsContainerPadding: '0',
		// thumbnailsGap: '0 1px',
		// thumbnailsIconColor: '#ffffff',
		// thumbnailsOpacity: 0.4,
		// thumbnailsPosition: 'bottom',
		// thumbnailsSize: ['100px', '80px']
	},
	progressBar: {
		backgroundColor: '#f2f2f2',
		fillColor: '#000000',
		height: '3px',
		showProgressBar: true
	}
};
const Lightbox = ({ children }) => {
	return <SRLWrapper options={options}>{children}</SRLWrapper>;
};

export default Lightbox;

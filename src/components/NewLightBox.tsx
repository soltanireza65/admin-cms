import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';

const NewLightBox = ({ imgSrc }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div>
			{isOpen && (
				<Lightbox
					mainSrc={imgSrc}
					// nextSrc={images[(photoIndex + 1) % images.length]}
					// prevSrc={images[(photoIndex + images.length - 1) % images.length]}
					onCloseRequest={() => setIsOpen(false)}
					// onMovePrevRequest={() =>
					// 	this.setState({
					// 		photoIndex: (photoIndex + images.length - 1) % images.length
					// 	})
					// }
					// onMoveNextRequest={() =>
					// 	this.setState({
					// 		photoIndex: (photoIndex + 1) % images.length
					// 	})
					// }
				/>
			)}
		</div>
	);
};

export default NewLightBox;

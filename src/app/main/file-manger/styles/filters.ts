import styled from 'styled-components';
import { _defaultVaraibles } from './variables';
export const FiltersDiv = styled.div`
	background-color: ${_defaultVaraibles.whiteColor};
	box-shadow: 0 3px 10px -3px rgba($color: #000000, $alpha: 0.04);
	font-size: 100% !important;
	padding: 15px 0;
	position: fixed;
	left: 0;
	z-index: 9999;
	right: 0;
	.innerfilter {
		display: flex;
		align-items: center;
		justify-content: center;

		.filter-list-group {
			display: inline-flex;
		}
	}
	.share-group-btn {
		position: absolute;
		left: 30px;
		top: 16px;
		display: inline-flex;
	}
`;

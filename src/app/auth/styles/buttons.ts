import styled from 'styled-components';
import { _defaultVaraibles } from './variables';

export const ButtonDiv = styled.div`
	.btn {
		display: inline-block;
		font-weight: 500;
		font-size: 100% !important;
		text-align: center;
		vertical-align: middle;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
		border: 1px solid transparent;
		padding: 0.5rem 1.2rem;
		font-size: 0.9rem;
		line-height: 1.5;
		border-radius: 5px;
		position: relative;
		height: 40px;
		&:hover {
			text-decoration: none;
		}
	}
	.btn-white {
		background-color: ${_defaultVaraibles.whiteColor};
		color: ${_defaultVaraibles.fontColor};
		&:hover {
			transition-timing-function: ease;
			transition-duration: 0.5s;
			background-color: ${_defaultVaraibles.backgrounColor};
		}
		&.active {
			transition-duration: 1.5s;
			transition-timing-function: ease;

			border: 1px solid ${_defaultVaraibles.secoundaryColor};
			color: ${_defaultVaraibles.secoundaryColor};
			background-color: ${_defaultVaraibles.whiteColor};
		}
	}
	.btn-icon {
		background-color: ${_defaultVaraibles.whiteColor};
		color: ${_defaultVaraibles.fontColor};
		width: 45px;
		padding: 0;
		.mdi {
			font-size: 22px;
		}
		&:hover {
			background-color: ${_defaultVaraibles.backgrounColor};
		}
	}
	.btn-default {
		background-color: ${_defaultVaraibles.primaryColor};
		margin: 10px;
		color: ${_defaultVaraibles.whiteColor};
		-webkit-transition: background-color 1s;
		&:hover {
			transition-timing-function: ease;
			transition-duration: 0.5s;
			background-color: ${_defaultVaraibles.secoundaryColor};
		}
		&:active {
			transition-duration: 0.5s;
			transition-timing-function: ease;

			background-color: ${_defaultVaraibles.primaryColor};
		}
	}
	.btn-default-outline {
		background-color: transparent;
		color: ${_defaultVaraibles.primaryColor};
		border: 1px solid ${_defaultVaraibles.primaryColor};
	}
`;

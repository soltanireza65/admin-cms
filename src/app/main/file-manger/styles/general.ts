import styled from 'styled-components';
import { _defaultVaraibles } from './variables';
export const BodyDiv = styled.div`
	font-family: ${_defaultVaraibles.bodyFont} !important;
	font-weight: 300;
	font-size: 100% !important;
	direction: rtl;
	margin: 0;
	background-color: ${_defaultVaraibles.backgrounColor};
	text-align: ${_defaultVaraibles.textRight};
`;

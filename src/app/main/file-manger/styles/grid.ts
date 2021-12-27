import styled from 'styled-components';
import { _defaultVaraibles } from './variables';
export const Container = styled.div`
	width: 100%;
	padding-right: ${_defaultVaraibles.paddingRight};
	padding-left: ${_defaultVaraibles.paddingLeft};
	font-size: 100% !important;
	margin-right: auto;
	margin-left: auto;

	@media (min-width: 576px) {
		max-width: 540px;
	}
	@media (min-width: 768px) {
		max-width: 720px;
	}
	@media (min-width: 992px) {
		max-width: 960px;
	}

	@media (min-width: 1200px) {
		max-width: 1350px;
	}
`;
export const FluidContainer = styled.div`
	width: 100%;
	padding-right: ${_defaultVaraibles.paddingRight};
	padding-left: ${_defaultVaraibles.paddingLeft};
	margin-right: auto;
	margin-left: auto;
`;
export const RowDiv = styled.div`
	display: -ms-flexbox;
	display: flex;
	-ms-flex-wrap: wrap;
	flex-wrap: wrap;
	margin-right: -15px;
	margin-left: -15px;
`;

import styled from 'styled-components';
import { _defaultVaraibles } from './variables';
import Card from '@material-ui/core/Card';
export const GridContainer = styled.div`
	margin: 100px 0;
	font-size: 100% !important;
`;
export const GridStyle = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start !important;
	flex-wrap: wrap;
`;
export const GridCardStyle = styled.div`
	flex-flow: wrap;
	display: flex;
	-ms-flex: 0 0 25%;
	flex: 0 0 25%;
	max-width: 25%;
	padding: 15px 10px 10px 10px;
	.file-name {
		margin: 10px 0 0 0;
		color: #444;
		font-size: 100% !important;
		font-weight: bold;
		max-height: 37px;
		margin: 5px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	@media (max-width: 1199px) {
		-ms-flex: 0 0 25%;
		flex: 0 0 25%;
		max-width: 25%;
	}
	@media (max-width: 998px) {
		-ms-flex: 0 0 33.33%;
		flex: 0 0 33.33%;
		max-width: 33.33%;
	}
	@media (max-width: 768px) {
		-ms-flex: 0 0 50%;
		flex: 0 0 50%;
		max-width: 50%;
	}
	@media (max-width: 557px) {
		-ms-flex: 0 0 100%;
		flex: 0 0 100%;
		max-width: 100%;
	}
`;
export const CardStyle = styled(Card)`
	background-color: ${_defaultVaraibles.whiteColor};
	margin: 10px;
	border-radius: 8px;
	.upload-image {
		height: 150px;
		width: 100%;
		overflow: hidden;
		text-align: -webkit-center;
		border-top-left-radius: 6px !important;
		border-top-right-radius: 6px !important;
		position: relative;
		margin: 0;
		.img-inner {
			position: absolute;
			top: 0;
			right: 0;
			width: 100%;
			height: 100%;
		}
		img {
			height: 140px;
			width: 270px;
			object-fit: cover;
		}
	}
	.card-icon {
		padding: 10px 0 0 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.icon-right {
			display: flex;
			max-width: 80%;
			align-items: center;
		}
		.btn-card-icon {
			background-color: transparent;
			width: 35px;
			height: 35px;
			border: none;
			cursor: pointer;
			&:hover {
				background-color: ${_defaultVaraibles.backgrounColor};
			}
		}
		.icon-left ul {
			display: flex;
			li {
				margin-right: 10px;
				span {
					font-size: 13px;
					font-weight: 500;
					margin-left: 3px;
					color: ${_defaultVaraibles.iconColor};
				}
			}
		}
	}
`;
export const LoadMoreButton = styled.div`
	padding: 10px 0 30px 0;
	.content {
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
		.btn-default-outline {
			background-color: transparent;
			color: ${_defaultVaraibles.primaryColor};
			border: 1px solid ${_defaultVaraibles.primaryColor};
			&:hover {
				background-color: #2db062;
				color: #fff;
			}
		}
		text-align: center;

		h6 {
			color: ${_defaultVaraibles.fontColor};
			font-size: 13px;

			margin: 5px;
		}
	}
`;

//LoadMore Button
export const LoadMore = styled.div`
	text-align: center;
	margin: 50px 0 0 0;

	.btn-seenMore {
		background-color: ${_defaultVaraibles.thirdColor};
		color: ${_defaultVaraibles.primaryColor};
		border-radius: 10px;
		border: none;
		padding: 15px 40px 15px 15px;
		position: relative;
		cursor: pointer;

		&:hover {
			background-color: #f8f8f8;
		}

		.mdi {
			font-size: 28px;
			line-height: 0;
			position: absolute;
			right: 10px;
			top: 25px;
			color: ${_defaultVaraibles.secoundaryColor};
		}
	}
`;

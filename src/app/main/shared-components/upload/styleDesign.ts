import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
export const DialogStyled = styled.div`
	margin: 50px !important;
	display: flex !important;
	display: -ms-flexbox !important;
	justify-content: center !important;
	flex-wrap: wrap !important;
	-ms-flex-wrap: wrap !important;
	box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.1) !important;
	padding: 30px !important;
	border-radius: 20px !important;
	box-sizing: border-box !important;
	background-color: #fff !important;
`;
export const SideBarBrowser = styled.div`
	flex: 1 0 100px;
	-ms-flex: 1 0 100px;
	text-align: center;
	border-left: 1px solid #eaeaea;
	padding-top: 45px;
	p {
		margin: 20px auto;
		color: #000;
		font-weight: bold;
		font-size: 1.1rem;
	}
	span {
		display: inline-block;
		width: 100%;
		color: #777;
		margin-bottom: 23px;
	}
`;
export const BrowseButton = styled.div`
	label {
		background: #ff768d;
		border-radius: 30px;
		cursor: pointer;
		color: #fff;
		padding: 5px 15px;
		font-weight: bold;
		border: 2px solid silver;
	}
`;
export const UploadIcon = styled.div`
	width: 100px;
	margin: 0 auto;
	border: 1.5px dashed #ff768d;
	padding: 19px;
	box-sizing: border-box;
	height: 100px;
	text-align: center;
	border-radius: 3px;
	cursor: pointer;
`;
export const FilesSection = styled.div`
	flex: 3 0 100px;
	-ms-flex: 3 0 100px;
	padding: 0 30px;
	box-sizing: border-box;
	height: 325px;
	overflow-y: auto;
	scrollbar-width: thin;
	scrollbar-color: #ff768d #cacaca;
	&::-webkit-scrollbar,
	.progress_subitems::-webkit-scrollbar {
		width: 8px;
	}
	&::-webkit-scrollbar-track,
	.progress_subitems ::-webkit-scrollbar-track {
		background: #cacaca;
	}
	&::-webkit-scrollbar-thumb,
	.progress_subitems ::-webkit-scrollbar-thumb {
		background-color: #ff768d;
		border-radius: 20px;
		border: 1px solid #fff;
	}
	h3 {
		font-size: 1.4rem;
	}
`;
export const FileItem = styled(Card)`
	display: flex;
	border-bottom: 1px solid #f3efef;
	padding: 10px 0 20px 0;
	position: relative;
	progress[value] {
		height: 9px;
		width: 400px;
		max-width: 100%;
	}
	label {
		color: #999;
		font-size: 0.8rem;
	}
	&:last-child {
		border-bottom: none;
	}
`;
export const FileItemDiv = styled.div`
	display: inline-block;
	width: 100vw;
	margin-right: 3px;
`;
export const RemoveIcon = styled.span`
	position: absolute !important;
	left: 0 !important;
	top: 25px !important;
	opacity: 0 !important;
	animation: arrowanimate 2s infinite !important;
`;

export const BorderLinearProgress = withStyles((theme: Theme) =>
	createStyles({
		root: {
			height: 10,
			borderRadius: 5,
			width: '100%',
			marginBottom: '10px'
		},
		colorPrimary: {
			backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
		},
		bar: {
			borderRadius: 5,
			backgroundColor: '#1a90ff'
		}
	})
)(LinearProgress);
export const ButtonAddSubFile = styled(Button)`
	border: 2px solid #0088cc;
	border-radius: 0.6em;
	margin-bottom: 20px;
	cursor: pointer;
	padding: 5px;
	font-weight: 700;
	width: 100%;
`;
export const SubDiv = styled.div`
	background: #fdf8f8;
	border-radius: 0 0 15px 15px;
	padding: 20px;
	height: 160px;
	overflow-y: auto;
	scrollbar-width: thin;
	scrollbar-color: #ff768d #cacaca;
	&::-webkit-scrollbar {
		width: 8px;
	}
	&::-webkit-scrollbar-track {
		background: #cacaca;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #ff768d;
		border-radius: 20px;
		border: 1px solid #fff;
	}
`;

export const ActionsButtons = styled.div`
	flex: 1 0 100%;
	margin-top: 5px;
	display: flex;
	flex-direction: row;
	padding-top: 23px;
	button {
		padding: 5px 10px;
		min-width: 85px;
		font-weight: bold;
		border-radius: 5px;
		border: 2px solid #ff768d;
		border-radius: 30px;
	}
`;

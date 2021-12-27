import styled from 'styled-components';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
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

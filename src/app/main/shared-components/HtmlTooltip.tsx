import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
const HtmlTooltip = withStyles(theme => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: '#000',
		maxWidth: 220,
		fontFamily: 'iranyekan',
		fontStyle: 'regular',
		fontSize: '15px',
		border: '1px solid #dadde9'
	}
}))(Tooltip);
export default HtmlTooltip;

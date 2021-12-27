import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
const ValidationTextField = withStyles({
	root: {
		'& input:valid + fieldset': {
			borderColor: 'green',
			borderWidth: 2
		},

		'& input:valid:focus + fieldset': {
			borderLeftWidth: 6,
			padding: '4px !important' // override inline-style
		}
	}
})(TextField);
export default ValidationTextField;

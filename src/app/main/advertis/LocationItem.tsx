import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		marginTop: '15px'
	},
	paper: {
		margin: 'auto',
		maxWidth: 500,
		'box-shadow':
			'0px 2px 12px 0px rgb(238 8 8 / 20%), 0px 1px 1px 0px rgb(62 187 244 / 14%), 0px 1px 3px 0px rgb(87 255 93 / 12%)'
	},
	image: {
		width: 128,
		height: 128
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%'
	},
	mainItem: {
		placeContent: 'center'
	},
	title: {
		width: '100%'
		// 'text-align': 'center'
	},
	imgElemnt: {
		'list-style-type': 'none !important'
	},
	cropImage: {
		color: 'white'
	},
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative'
	}
}));
interface IProps {
	location: IGlobalData.ILocation;
	deleteLocation: any;
	index: number;
}
export default ({ deleteLocation, location, index }: IProps) => {
	const classes = useStyles();
	const { t } = useTranslation('advertiesApp');
	return (
		<div className={classes.root}>
			<Grid container direction="row" spacing={2}>
				<Grid item xs={5}>
					<Typography className={classes.title} gutterBottom variant="subtitle1">
						{location.categoryTitle}
					</Typography>
				</Grid>
				<Grid item xs={5}>
					<Typography className={classes.title} variant="body2" gutterBottom>
						{location.title}
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Button
						variant="outlined"
						color="secondary"
						className="w-full"
						onClick={() => {
							deleteLocation(index);
						}}
					>
						{t('delete')}
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

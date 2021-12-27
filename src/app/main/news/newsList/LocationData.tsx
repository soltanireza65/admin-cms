import React, { useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import GridListTile from '@material-ui/core/GridListTile';
import { LocationItem } from '../interfaces/states';
import { useTranslation } from 'react-i18next';
import { deleteLocationFromNews } from '../store/locationsFormSlice';
import { useDispatch } from 'react-redux';
import { UrlImageGenerate } from 'utils/imgUtils';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		marginTop: '15px'
	},
	paper: {
		margin: '28px auto',
		maxWidth: 500,
		padding: '20px 0'
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
		width: '100%',
		'text-align': 'center'
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

export default function LocationData({
	categoryId,
	categoryTitle,
	locationCode,
	locationTitle,
	priority,
	newsId,
	mediaFiles2,
	titr
}: LocationItem) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { t } = useTranslation('newsApp');
	const [image, setImage] = useState<{ url: string; loading: boolean }>({ url: '', loading: true });

	useEffect(() => {
		console.log(mediaFiles2);

		const fetchImage = async () => {
			const url = await UrlImageGenerate(mediaFiles2[0]?.mediaFileId);
			if (url) setImage({ url, loading: false });
			else setImage({ url: 'assets/image/empty.png', loading: false });
		};
		mediaFiles2 && fetchImage();
	}, [mediaFiles2]);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper} elevation={4}>
				<Grid className={classes.mainItem} container>
					<Grid item xs={4} className="ml-10 mr-12">
						{image.loading ? (
							<Skeleton variant="rect" width="100%" height="100%" />
						) : (
							<img className={classes.img} alt={titr} src={image.url} />
						)}
					</Grid>
					<Grid item xs={8} sm container>
						<Grid item xs container direction="column" spacing={2}>
							<Grid item xs>
								<Typography className={classes.title} gutterBottom variant="subtitle1">
									{categoryTitle}
								</Typography>
								<Typography className={classes.title} variant="body2" gutterBottom>
									{locationTitle}
								</Typography>
								<Typography className={classes.title} variant="subtitle1" gutterBottom>
									اولویت: {priority ? priority : 1}
								</Typography>
							</Grid>
							<Grid item>
								<Button
									variant="outlined"
									color="secondary"
									className="w-full"
									onClick={() => {
										dispatch(deleteLocationFromNews({ categoryId, locationCode, newsId }));
									}}
								>
									{t('delete_button')}
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}

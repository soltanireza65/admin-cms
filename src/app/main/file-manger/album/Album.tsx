import React, { useState, useMemo } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AlbumItem from './AlbumItem';
import Grid from '@material-ui/core/Grid';
import FileManagerDialog from '../FileManagerDialogContainer';
import Paper from '@material-ui/core/Paper';
import { IFileManagerApp } from 'app/interfaces/fileManager';
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			marginTop: '40px'
		},
		gridList: {
			flexWrap: 'nowrap',
			// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
			transform: 'translateZ(0)',
			height: '220px',
			width: '100%'
		}
	})
);

export default ({ mediaType }: IFileManagerApp.IAlbumProps) => {
	const classes = useStyles();

	const albumData = useSelector(({ fuse }: any) => fuse.album);

	const [data, setData] = useState<IFileManagerApp.IAlbumData[]>(null);
	const [mainItem, setMainItem] = useState<IFileManagerApp.IAlbumData>(null);
	const [titleAlbum, setTitleAlbum] = useState<string>('');

	const { t } = useTranslation('fileManagerApp');
	useMemo(() => {
		if (mediaType === 3) {
			if (albumData.imagesEntities && albumData.imagesEntities.length > 0) {
				setMainItem(albumData.imagesEntities.find(x => x.mainItem == true));

				setData(albumData.imagesEntities.filter(x => x.mainItem != true));
			} else {
				setData([]);
			}

			setTitleAlbum(t('imageAlbum'));
		}
		if (mediaType === 4) {
			if (albumData.videoEntities && albumData.videoEntities.length > 0) {
				setMainItem(albumData.videoEntities.find(x => x.mainItem == true));

				setData(albumData.videoEntities.filter(x => x.mainItem != true));
			} else {
				setData([]);
			}
			setTitleAlbum(t('videoAlbum'));
		}
		if (mediaType === 2) {
			if (albumData.audioEntities && albumData.audioEntities.length > 0) {
				setMainItem(albumData.audioEntities.find(x => x.mainItem == true));
				setData(albumData.audioEntities.filter(x => x.mainItem != true));
			} else {
				setData([]);
			}
			setTitleAlbum(t('audioAlbum'));
		}
		if (mediaType === 1) {
			if (albumData.documentEntities && albumData.documentEntities.length > 0) {
				setMainItem(albumData.documentEntities.find(x => x.mainItem == true));
				setData(albumData.documentEntities.filter(x => x.mainItem != true));
			} else {
				setData([]);
			}
			setTitleAlbum(t('documetAlbum'));
		}
	}, [albumData]);
	return (
		<Paper className="bg-transparent shadow-0">
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<FileManagerDialog mediaType={mediaType} />
					<ListSubheader component="div">{titleAlbum}</ListSubheader>
				</Grid>
				<Grid item xs={12}>
					{mainItem && <AlbumItem {...mainItem} mediaType={mediaType} />}
				</Grid>
				<Grid item xs={12}>
					{data && (
						<GridList cellHeight={180} className={classes.gridList}>
							{data.length > 0 &&
								data.map((row, index) => {
									return <AlbumItem {...row} mediaType={mediaType} key={index} />;
								})}
						</GridList>
					)}
				</Grid>
			</Grid>
		</Paper>
	);
};

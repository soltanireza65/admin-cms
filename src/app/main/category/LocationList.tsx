import FuseAnimate from '@fuse/core/FuseAnimate';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import LocationItem from './LocationItem';
const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
	}
});

function LocationList(props) {
	const locations = useSelector(({ categoryApp }: any) => categoryApp.category);

	const classes = useStyles();

	if (!locations.selectedcategory) {
		return (
			<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
				<Typography className="text-20 mb-16" color="textSecondary">
					هیچ دسته بندی انتخاب نشده است.
				</Typography>
			</div>
		);
	}
	if (locations.loadingOne) {
		return (
			<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
				<Typography className="text-20 mb-16" color="textSecondary">
					لطفا منتظر بمانید ...
				</Typography>
				<LinearProgress className="w-xs" color="secondary" />
			</div>
		);
	}
	return (
		<FuseAnimate animation="transition.slideUpIn" delay={200}>
			<div className="file-details p-16 sm:p-24">
				<Typography variant="subtitle1" className="py-16">
					لیست جایگاه ها
				</Typography>

				<List className="p-0">
					{locations.selectedcategory.locations &&
						locations.selectedcategory.locations.length > 0 &&
						locations.selectedcategory.locations.map((item, index) => {
							return (
								<LocationItem
									key={index}
									{...item}
									categoryId={locations.selectedcategory.id}
									categoryTitle={locations.selectedcategory.title}
								/>
							);
						})}
				</List>
			</div>
		</FuseAnimate>
	);
}

export default LocationList;

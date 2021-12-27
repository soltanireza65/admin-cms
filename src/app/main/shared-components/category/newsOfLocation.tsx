import React, { useState, useEffect } from 'react';
import { useDebounce } from '@fuse/hooks';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { NewsApi } from 'api/News/index';
import { INewsOfLocation } from './props';
import Modal from '@material-ui/core/Modal';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { reorder } from 'utils/utils';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(theme => ({
	root: {
		width: 221,
		fontSize: 13
	},
	button: {
		width: '100%',
		'text-align': 'center',
		'&:hover,&:focus': {
			color: '#0366d6'
		},
		'& span': {
			width: '100%'
		},
		'& svg': {
			width: 16,
			height: 16
		}
	},

	popper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',

		border: '1px solid rgba(27,31,35,.15)',
		boxShadow: '0 3px 12px rgba(27,31,35,.15)',
		borderRadius: 3,
		color: '#586069'
	},
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #adadad',
		'border-radius': '15px',
		padding: theme.spacing(2, 4, 3)
	},
	header: {
		borderBottom: '1px solid #e1e4e8',
		padding: '8px 10px',
		fontWeight: 600
	},
	actionsButtons: {
		display: 'flex',
		'flex-direction': 'row',
		'place-content': 'space-between',
		marginTop: 19
	}
}));

const getItemStyle = (isDragging, draggableStyle) => ({
	// styles we need to apply on draggables
	...draggableStyle,

	...(isDragging && {
		background: 'rgb(235,235,235)'
	})
});
const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: '8px',
	width: '100%'
});
export default ({ categoryId, index, locationCode, currentNews, onIndexChange }: INewsOfLocation) => {
	const classes = useStyles();
	const [options, setOptions] = useState<INewsInterface.INewsDTO[]>([]);
	const [open, setOpen] = useState(false);
	const [indexNews, setIndex] = useState<number>(1);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({
		hasError: false,
		message: ''
	});
	const { t } = useTranslation('shareCategory');
	const callData = useDebounce(async () => {
		setLoading(true);
		let newsList: INewsInterface.INewsDTO[] = [];
		if (categoryId && locationCode && index) {
			const response = NewsApi.getLocationNews({ categoryId, locationCode, count: 10 });
			const { data, status, message } = await response;

			if (status === 1) {
				newsList = data;

				if (currentNews) newsList.splice(index - 1, 0, currentNews);
				setOptions(newsList);
				setLoading(false);
			}
		}
		setLoading(false);
		return;
	}, 200);
	useEffect(() => {
		if (open) {
			if (!categoryId || !locationCode) {
				setError({
					hasError: true,
					message: ''
				});
			} else {
				setError({
					hasError: false,
					message: ''
				});
			}
			if (currentNews) {
				const index = options.findIndex(x => x.id === currentNews.id);
				index == -1 && options.splice(0, 0, currentNews);
			}
			setLoading(true);
			callData();
		}
	}, [open]);
	const onDragEnd = result => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		//change the index of seleceted Item
		const items = reorder(options, result.source.index, result.destination.index);

		setIndex(result.destination.index + 1);
		onIndexChange(result.destination.index + 1);
		setOptions(items);
	};
	const handleClick = () => {
		setOptions([]);
		setOpen(true);
	};

	const handleClose = () => {
		setOptions([]);

		setOpen(false);
	};
	return (
		<div>
			<div className={classes.button}>
				<Button
					variant="outlined"
					color="primary"
					disableRipple
					className={classes.button}
					onClick={handleClick}
				>
					<span>
						{t('open_news_list')} {indexNews}
					</span>
				</Button>
			</div>

			<Modal id="select-location-index" open={open} onClose={handleClose} className={classes.popper}>
				<div className={classes.paper}>
					<div className={classes.header}>{t('select_location_description')}</div>
					{loading ? (
						<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
							<Typography className="text-20 mb-16" color="textSecondary">
								{t('please_wait')}
							</Typography>
							<LinearProgress className="w-xs" color="secondary" />
						</div>
					) : error.hasError ? (
						<div className="flex flex-1 flex-col h-full w-full items-center justify-center">
							<Typography className="text-20 mb-16" color="error">
								{t('error_location')}
							</Typography>
						</div>
					) : (
						options &&
						options.length > 0 && (
							<DragDropContext onDragEnd={onDragEnd}>
								<Droppable droppableId="droppable">
									{(provided, snapshot) => (
										<div
											{...provided.droppableProps}
											ref={provided.innerRef}
											style={getListStyle(snapshot.isDraggingOver)}
										>
											{options.map((item, index) => {
												return (
													item && (
														<Draggable key={item.id} draggableId={item.id} index={index}>
															{(provided, snapshot) => (
																<div
																	className="w-full"
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																	style={getItemStyle(
																		snapshot.isDragging,
																		provided.draggableProps.style
																	)}
																>
																	<ListItemText
																		primary={`${index + 1} -- ${item.titr}`}
																		secondary={item.lead}
																	/>
																</div>
															)}
														</Draggable>
													)
												);
											})}
											{provided.placeholder}
										</div>
									)}
								</Droppable>
							</DragDropContext>
						)
					)}
					<div className={classes.actionsButtons}>
						<Button onClick={handleClose} color="secondary" variant="outlined" className="w-1/3">
							{t('cancel')}
						</Button>
						<Button onClick={handleClose} color="primary" variant="outlined" className="w-1/3">
							{t('save')}
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

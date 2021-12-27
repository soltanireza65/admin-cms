import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
	CircularProgress,
	DialogActions,
	FormControl,
	Icon,
	InputAdornment,
	LinearProgress,
	List,
	TextField
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HtmlTooltip from '../shared-components/HtmlTooltip';
import { addOptionsToPolling, closePollingOptionsDialog, deleteOptionsFromPolling } from './store/pollingSlice';
import { useTranslation } from 'react-i18next';
import OptionItem from './OptionItem';
import { uuid } from 'uuidv4';
import { showMessage } from 'app/store/fuse/messageSlice';

const PollingOptionsDialog = () => {
	const { isOpen, pollingId, options } = useSelector(
		({ pollingApp }: any) => pollingApp.polling.pollingOptionsDialog
	);
	const dispatch = useDispatch();
	const [optionsToDelete, setOptionsToDelete] = useState<string[]>([]);
	const [optionToAdd, setOptionToAdd] = useState<string>('');
	const [newOptions, setNewOptions] = useState<PollingInterface.IOption[]>([...options]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setNewOptions([...options]);
	}, [options]);

	const { t } = useTranslation('PollingApp');
	const handleAdd = () => {
		if (optionToAdd) {
			setNewOptions(prev => [...prev, { title: optionToAdd, voteCount: 0, id: uuid() }]);
		}
		setOptionToAdd('');
	};

	const handleClose = () => {
		setLoading(false);
		dispatch(closePollingOptionsDialog());
		setOptionToAdd('');
		setOptionsToDelete([]);
		setNewOptions(options);
	};
	const handleSubmit = async () => {
		let optionsToAdd = newOptions.filter(option => options.findIndex(o => o.id == option.id) === -1);
		const optionsTitle = optionsToAdd.map(option => option.title);

		let optionsToRemove = optionsToDelete.filter(option => options.findIndex(o => o.id == option) !== -1);

		setLoading(true);
		await Promise.all([
			optionsTitle.length > 0 && dispatch(addOptionsToPolling({ pollingId, optionsTitle })),
			optionsToRemove.length > 0 && dispatch(deleteOptionsFromPolling({ pollingId, optionsId: optionsToRemove }))
		]);
		dispatch(showMessage({ message: t('options_changed'), variant: 'success' }));
		handleClose();
	};

	const handleDeleteOption = (optionId: string) => {
		const changeOptions = newOptions.filter(option => option.id != optionId);
		setNewOptions(changeOptions);
		setOptionsToDelete(options => [...options, optionId]);
	};

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
			className="rtl"
			maxWidth="sm"
		>
			<AppBar position="static" className="">
				<Toolbar className="flex justify-between w-full">
					<Typography variant="subtitle1" color="inherit">
						{t('polling_options')}
					</Typography>
				</Toolbar>
			</AppBar>
			<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0 ' }}>
				<div className="flex mb-12">
					<FormControl fullWidth>
						<TextField
							label={t('option')}
							name="title"
							autoFocus
							value={optionToAdd}
							onChange={e => setOptionToAdd(e.target.value)}
							fullWidth
							variant="outlined"
							onKeyUp={e => {
								if (e.key === 'Enter') {
									if (optionToAdd.length > 0) {
										handleAdd();
									}
									setOptionToAdd('');
								}
							}}
							required
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<HtmlTooltip
											style={{
												fontSize: '16px'
											}}
											title="title"
										>
											<Icon className="text-18">help</Icon>
										</HtmlTooltip>
									</InputAdornment>
								)
							}}
						/>
					</FormControl>
					<Button onClick={handleAdd}>
						<AddIcon />
					</Button>
				</div>
				<div style={{ maxHeight: 250, overflow: 'auto' }}>
					<List>
						{(newOptions &&
							newOptions.length > 0 &&
							newOptions.map((item, index) => {
								return <OptionItem option={item} key={item.id} onDelete={handleDeleteOption} />;
							})) || (
							<div className="flex flex-1 items-center justify-center h-full py-28">
								<Typography color="textSecondary" variant="subtitle1">
									{t('no_options')}
								</Typography>
							</div>
						)}
					</List>
				</div>
				<div className="mb-4">
					<DialogActions className="px-0">
						<Button
							variant="outlined"
							className="flex flex-1 ml-2"
							color="primary"
							onClick={handleSubmit}
							disabled={loading}
						>
							{t('save')}
						</Button>
						<Button variant="outlined" className="flex flex-1 mr-2" color="secondary" onClick={handleClose}>
							{t('cancel')}
						</Button>
					</DialogActions>
					{loading && (
						<div className="mt-2 mb-12">
							<LinearProgress color="secondary" />
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default PollingOptionsDialog;

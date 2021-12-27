import React, { useState, useEffect } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import HtmlTooltip from '../../shared-components/HtmlTooltip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { validateUrl } from 'utils/utils';
import { INewsFormProps } from '../interfaces/props';
import IOSSwitch from '../../shared-components/IosSwitch';
import PersonIcon from '@material-ui/icons/Person';
import LinkIcon from '@material-ui/icons/Link';
export default ({
	newsType,
	handleChange,
	required,
	isLockedForPublicView,
	isEdtingMode,
	linkUrl,
	authorUserFullName
}: INewsFormProps) => {
	const [isLocked, setIsLocked] = useState<boolean>(false);
	const { t } = useTranslation('newsApp');

	useEffect(() => {
		if (isEdtingMode) {
			setIsLocked(isLockedForPublicView);
		}
	}, [isEdtingMode]);
	const handleOnChange = ev => {
		handleChange(ev);
		setIsLocked(!isLocked);
	};

	return (
		<div className="mt-10">
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<IOSSwitch
								value={isLocked}
								checked={isLocked}
								onChange={handleOnChange}
								name="isLockedForPublicView"
							/>
						}
						label={t('setting_isLock')}
					/>
				</Grid>

				<Grid item xs={12}>
					{required == true && newsType == 0 && (
						<h3
							style={{
								color: 'red'
							}}
						>
							{t('news_type_required')}
						</h3>
					)}
					<Typography variant="subtitle1" gutterBottom>
						{t('content_type')}:
					</Typography>
					<FormControl className="w-full">
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							name="newsType"
							value={newsType}
							variant="outlined"
							onChange={handleChange}
						>
							<MenuItem value={1}>{t('news')}</MenuItem>
							<MenuItem value={2}>{t('video')}</MenuItem>
							<MenuItem value={3}>{t('podcast')}</MenuItem>
							<MenuItem value={4}>{t('image')}</MenuItem>
							<MenuItem value={5}>{t('infographic')}</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					{required == true && newsType !== 0 && (
						<h3
							style={{
								color: 'red'
							}}
						>
							{t('fields_required')}
						</h3>
					)}
					<FormControl className="mt-8 mb-16 w-full">
						<TextField
							className="mt-8 mb-16 w-full"
							label={t('setting_link')}
							name="linkUrl"
							value={linkUrl}
							variant="outlined"
							fullWidth
							onChange={handleChange}
							required
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<HtmlTooltip
											style={{
												fontSize: '16px'
											}}
											title={t('setting_link')}
										>
											<LinkIcon />
										</HtmlTooltip>
									</InputAdornment>
								)
							}}
						/>
					</FormControl>

					<FormControl className="mt-8 mb-16 w-full">
						<TextField
							className="mt-8 mb-16 w-full"
							// label={t('wirterName')}
							name="WriterFullName"
							variant="outlined"
							value={authorUserFullName}
							fullWidth
							disabled={isEdtingMode}
							onChange={handleChange}
							required
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<HtmlTooltip
											style={{
												fontSize: '16px'
											}}
											title={t('wirterName')}
										>
											<PersonIcon />
										</HtmlTooltip>
									</InputAdornment>
								)
							}}
						/>
					</FormControl>
				</Grid>
			</Grid>
		</div>
	);
};

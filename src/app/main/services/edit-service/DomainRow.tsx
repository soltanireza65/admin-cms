import {
	Button,
	Divider,
	Grid,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Typography,
	CircularProgress,
	TextField
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
	changeDomainRedirectUrl,
	changeDomainSecure,
	openChangeDomainDialog,
	openDeleteDialog
} from '../store/servicesSlice';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import HtmlTooltip from 'app/main/shared-components/HtmlTooltip';
import clsx from 'clsx';
import CopyIcon from '@material-ui/icons/FileCopy';
import InfoIcon from '@material-ui/icons/Info';
import ClickTooltip from 'app/main/shared-components/click-tooltip/ClickTooltip';
import { ChallengType } from '../interfaces/ChallengeType';
import LockIcon from '@material-ui/icons/Lock';
import OpenLockIcon from '@material-ui/icons/LockOpen';
import { green } from '@material-ui/core/colors';

const { REACT_APP_DNS_TXT_PREFIX, REACT_APP_DNS_VALUE } = process.env;
interface Props {
	domain: ServicesInterface.Domain;
	portalId: string;
}

export default function DomainRow({ domain, portalId }: Props) {
	const dispatch = useDispatch();

	const { t } = useTranslation('servicesApp');

	const { secureLoading } = useSelector((store: any) => store.servicesApp.services);
	const [redirectUrlLoading, setRedirectUrlLoading] = useState<boolean>(false);

	const [redirectUrl, setRedirectUrl] = useState<string>(domain.redirectUrl);

	const handleDeleteDomain = async (domain: string) => {
		dispatch(openDeleteDialog({ domain, portalId }));
	};

	const handleChangePrimaryDomain = (domain: string) => {
		dispatch(openChangeDomainDialog({ domain, portalId }));
	};

	const handleChangeDomainSecure = (domain: string, isSecure: boolean) => {
		dispatch(changeDomainSecure({ domain, isSecure: !isSecure, portalId }));
	};

	const handleChangeDomainRedirectUrl = async (domain: string, redirectUrl: string) => {
		if (redirectUrl) {
			setRedirectUrlLoading(true);
			await dispatch(changeDomainRedirectUrl({ domain, portalId, redirectUrl }));
			setRedirectUrlLoading(false);
		}
	};

	const handleCopy = (value: string) => {
		const el = document.createElement('textarea');
		el.value = value;
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
	};

	const getTxtName = (domain: string): string => {
		const rootDomain = domain.split('.').slice(-2).join('.');
		return `${REACT_APP_DNS_TXT_PREFIX}.${rootDomain}`;
	};

	return (
		<>
			<Paper elevation={3} className="mb-5 mb-20 px-16 md:px-28 py-16">
				<ListItem key={domain.txtHash} className="px-0">
					<ListItemText
						primary={<Typography variant="h6">{domain.domain}</Typography>}
						secondary={domain.isPrimary ? t('main_domain') : ''}
					/>
					<ListItemAvatar className="flex items-center">
						<>
							<span
								className={clsx({
									'mx-20': domain.isPrimary,
									'inline-flex': true
								})}
							>
								<span className="mx-12">{domain.status == 1 ? t('active') : t('disable')}</span>
								<div
									className={`w-16 h-16 rounded-full bg-${domain.status == 1 ? 'green' : 'red'}-400`}
								></div>
							</span>
							{!domain.isPrimary && (
								<HtmlTooltip title={t('change_primary_domain_tooltip')}>
									<IconButton
										onClick={() => handleChangePrimaryDomain(domain.domain)}
										className="mr-12"
									>
										<SwapHorizIcon />
									</IconButton>
								</HtmlTooltip>
							)}
							{secureLoading[domain.domain] ? (
								<div className="p-12">
									<CircularProgress size={24} />
								</div>
							) : (
								<HtmlTooltip title={domain.isSecure ? t('disable_ssl') : t('active_ssl')}>
									<IconButton
										onClick={() => handleChangeDomainSecure(domain.domain, domain.isSecure)}
									>
										{domain.isSecure ? (
											<LockIcon style={{ color: green[400] }} />
										) : (
											<OpenLockIcon />
										)}
									</IconButton>
								</HtmlTooltip>
							)}
							<IconButton onClick={() => handleDeleteDomain(domain.domain)}>
								<DeleteIcon />
							</IconButton>
						</>
					</ListItemAvatar>
				</ListItem>
				<div className="mt-16 mb-32 flex">
					<div className="flex-1 max-w-sm">
						<TextField
							variant="outlined"
							color="primary"
							placeholder="Redirect"
							label="Redirect"
							size="small"
							fullWidth
							value={redirectUrl}
							onChange={event => setRedirectUrl(event.target.value)}
						/>
					</div>
					{redirectUrlLoading ? (
						<div className="mx-24">
							<CircularProgress size={24} />
						</div>
					) : (
						<Button
							variant="outlined"
							color="primary"
							size="small"
							className="mx-12"
							onClick={() => handleChangeDomainRedirectUrl(domain.domain, redirectUrl)}
						>
							{t('register')}
						</Button>
					)}
				</div>
				{domain.challengType == ChallengType.TxtRecord && domain.status == 2 && (
					<>
						<Typography variant="body2" className="mb-28 mt-20 text-gray-800 font-bold">
							<InfoIcon color="primary" />
							<span className="mx-8">{t('register_domain')}</span>
						</Typography>

						<div dir="ltr" className="mt-10">
							<Grid container className="py-12 text-gray-700" alignItems="center">
								<Grid item xs={2}>
									Record
								</Grid>
								<Grid item xs={4} className="text-center sm:text-left">
									Name
								</Grid>
								<Grid item xs={6} className="text-center sm:text-left">
									Value
								</Grid>
							</Grid>
							<Divider />
							<Grid container className="py-12 font-bold" alignItems="center">
								<Grid item xs={2}>
									<div className="inline-block bg-blue-500 text-white p-4 rounded-4">CNAME</div>
								</Grid>
								<Grid item xs={4} className="text-center sm:text-left">
									{domain.domain}
									<ClickTooltip title={t('copied') + ' !'}>
										<IconButton className="ml-12" onClick={() => handleCopy(domain.domain)}>
											<CopyIcon />
										</IconButton>
									</ClickTooltip>
								</Grid>
								<Grid item xs={6} className="text-center sm:text-left">
									{REACT_APP_DNS_VALUE}
									<ClickTooltip title={t('copied') + ' !'}>
										<IconButton className="ml-12" onClick={() => handleCopy(REACT_APP_DNS_VALUE)}>
											<CopyIcon />
										</IconButton>
									</ClickTooltip>
								</Grid>
							</Grid>
							<Divider />
							<Grid container className="py-12 font-bold" alignItems="center">
								<Grid item xs={2} className="text-center sm:text-left">
									<div className="inline-block bg-blue-500 text-white p-4 rounded-4">TXT</div>
								</Grid>
								<Grid item xs={4}>
									{getTxtName(domain.domain)}
									<ClickTooltip title={t('copied') + ' !'}>
										<IconButton
											className="ml-12"
											onClick={() => handleCopy(getTxtName(domain.domain))}
										>
											<CopyIcon />
										</IconButton>
									</ClickTooltip>
								</Grid>
								<Grid item xs={6} className="text-center sm:text-left">
									{domain.txtHash}
									<ClickTooltip title={t('copied') + ' !'}>
										<IconButton className="ml-12" onClick={() => handleCopy(domain.txtHash)}>
											<CopyIcon />
										</IconButton>
									</ClickTooltip>
								</Grid>
							</Grid>
						</div>
					</>
				)}
				{domain.status == 2 && domain.challengType === ChallengType.NameServer && (
					<>
						<Typography variant="body1" className="mb-28 mt-20 flex text-gray-800 font-bold">
							<InfoIcon color="primary" />
							<div className="mx-8 leading-7">
								{t('change_ns_1')}.
								<br />
								{t('change_ns_2')}.
							</div>
						</Typography>
						<div className="flex flex-col items-start mx-28">
							<div className="text-lg font-bold mb-12">
								<div className="py-8 px-16 border-2 border-blue-800 rounded-8 inline-block">
									{domain.nameServers[0]}
								</div>

								<ClickTooltip title={t('copied') + ' !'}>
									<IconButton className="mx-12" onClick={() => handleCopy(domain.nameServers[0])}>
										<CopyIcon />
									</IconButton>
								</ClickTooltip>
							</div>
							<div className="text-lg font-bold mb-12">
								<div className="py-8 px-16 border-2 border-blue-800 rounded-8 inline-block">
									{domain.nameServers[1]}
								</div>
								<ClickTooltip title={t('copied') + ' !'}>
									<IconButton className="mx-12" onClick={() => handleCopy(domain.nameServers[1])}>
										<CopyIcon />
									</IconButton>
								</ClickTooltip>
							</div>
						</div>
					</>
				)}
			</Paper>
		</>
	);
}

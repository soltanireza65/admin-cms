import { Button, List, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getServiceById, openAddDomainDialog } from '../store/servicesSlice';
import DeleteDialog from './DeleteDialog';
import ChangePrimaryDomainDialog from './ChangePrimaryDomainDIalog';
import AddDomainDialog from './AddDomainDialog';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DomainRow from './DomainRow';

interface Props {
	domains: ServicesInterface.Domain[];
	portalId: string;
}

export default function Domains({ domains, portalId }: Props) {
	const dispatch = useDispatch();

	const { t } = useTranslation('servicesApp');

	const [checkLoading, setCheckLoading] = useState<boolean>(false);

	const onCheckDomains = async () => {
		setCheckLoading(true);
		await dispatch(getServiceById(portalId));
		setCheckLoading(false);
	};

	return (
		<>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<div className="text-lg py-10  font-bold">{t('domains_management')}</div>
				</AccordionSummary>

				<AccordionDetails>
					<div className="w-full md:px-12">
						<div className="mb-12">
							<Button
								variant="contained"
								onClick={() => dispatch(openAddDomainDialog(portalId))}
								color="primary"
							>
								{t('new_domain')}
							</Button>
							<Button
								variant="outlined"
								color="primary"
								endIcon={checkLoading ? <CircularProgress size={14} /> : <SearchIcon />}
								className="mx-8"
								onClick={onCheckDomains}
								disabled={checkLoading}
							>
								{t('check_domain')}
							</Button>
						</div>
						<List>
							{domains.map(domain => (
								<DomainRow key={domain.domain} domain={domain} portalId={portalId} />
							))}
						</List>
					</div>
				</AccordionDetails>
			</Accordion>
			<DeleteDialog />
			<ChangePrimaryDomainDialog />
			<AddDomainDialog />
		</>
	);
}

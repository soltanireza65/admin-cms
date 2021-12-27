import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useDebounce } from '@fuse/hooks';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NewsApi } from 'api/News/index';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
let relatedNewsId: string[] = [];
export default function NewsSearch({ handleChange }) {
	const dispatch = useDispatch();
	const { t } = useTranslation('newsApp');
	const [options, setOptions] = React.useState<INewsInterface.INewsDTO[]>([]);

	const handleChangeText = useDebounce(async (text: string) => {
		if (text.length < 3) {
			return null;
		}
		const request = await NewsApi.manageNews({ titr: text });
		const { status, data } = await request;

		if (data.length === 0) {
			setOptions([]);
		}
		setOptions(Object.keys(data).map(key => data[key]) as INewsInterface.INewsDTO[]);
	}, 200);
	const handleOnChnage = (event, value) => {
		value.map(x => {
			relatedNewsId.push(x.id);
		});
		if (value.length == 0) relatedNewsId = [];
		const ev = {
			target: {
				name: 'relatedNewsId',
				value: relatedNewsId
			}
		};
		handleChange(ev);
	};
	return (
		<Autocomplete
			multiple
			id="checkboxes-tags-demo"
			options={options}
			noOptionsText={t('suggestion_no_Options')}
			disableCloseOnSelect
			onChange={handleOnChnage}
			onInputChange={(event, value) => {
				handleChangeText(value);
			}}
			getOptionLabel={option => `${option.titr}-${option.newsCode}`}
			renderOption={(option, { selected }) => (
				<React.Fragment>
					<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
					{option.titr}-{option.newsCode}
				</React.Fragment>
			)}
			renderInput={params => <TextField {...params} variant="outlined" label={t('suggestion_t_title')} />}
		/>
	);
}

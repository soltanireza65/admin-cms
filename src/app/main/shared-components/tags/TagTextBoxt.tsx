/* eslint-disable no-use-before-define */
import React, { useState, useCallback, useEffect, useRef, ChangeEvent } from 'react';
import { getSuggestTagsByTitle, openNewTagDialog } from './store/tagsSlice';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { TagsApi } from 'api/Tags/index';
import { ITags } from 'api/Interfaces/tags';
import CircularProgress from '@material-ui/core/CircularProgress';
// import AsyncSelect from 'react-select/async-creatable';

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useDebounce } from '@fuse/hooks';

const filter = createFilterOptions();

let nullValue: ITags.ITagsDTO = {
	id: '0',
	title: '',
	label: ''
};
interface IProps {
	handleChange?: any;
	tagsSelected?: string[];
	isEdditingMode?: boolean;
}
let tags: string[] = [];

export default function TagSugestion({ handleChange, tagsSelected, isEdditingMode }: IProps) {
	const dispatch = useDispatch();
	const { t } = useTranslation('tagApp');

	const [tagOptions, setTagOptions] = useState<ITags.ITagsDTO[]>([]);
	const [selectedTags, setSelectedTags] = useState<ITags.ITagsDTO[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [searchedTag, setSearchedTag] = useState<string>('');

	const handleSearchChange = useDebounce((text: string) => {
		setSearchedTag(text);
	}, 250);

	useEffect(() => {
		setLoading(true);
		let promise = searchedTag ? TagsApi.getSuggestTagsByTitle({ title: searchedTag }) : TagsApi.getTags();
		promise
			.then(res => {
				let { data } = res;
				data = data.map(item => ({
					title: item.title,
					value: item.id
				}));
				setTagOptions(data);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [searchedTag]);

	useEffect(() => {
		let tagsValue = [];
		tagsSelected?.map((item, index) => tagsValue.push({ title: item, value: index.toString() }));
		setSelectedTags(tagsValue);
	}, [isEdditingMode]);

	useEffect(() => {
		const getTags = async () => {
			let tagsArray = [];
			const { data } = await TagsApi.getTags();
			console.log('data: ', data);
			data.forEach(item => {
				tagsArray.push({
					title: item.title,
					value: item.id
				});
			});
			setTagOptions([...tagsArray]);
		};
		getTags();
		console.log('tagOptions: ', tagOptions);
	}, []);

	const handleOnChnage = (event, newValue) => {
		if (newValue) {
			const ev = {
				target: {
					name: 'tags',
					value: newValue.map(value => value.title)
				}
			};
			const newTag = newValue[newValue.length - 1];
			if (newTag && newTag.inputValue) {
				dispatch(openNewTagDialog({ title: newTag.inputValue, callback: () => setTags(newValue, ev) }));
			} else {
				setTags(newValue, ev);
			}
		}
	};

	const setTags = (newValue: ITags.ITagsDTO[], event: any) => {
		setSelectedTags(newValue);
		handleChange(event);
	};

	return (
		<Autocomplete
			multiple
			id="tags"
			autoHighlight
			options={tagOptions}
			defaultValue={[]}
			limitTags={2}
			noOptionsText={t('no_data')}
			loadingText={t('searching')}
			filterSelectedOptions={true}
			loading={loading}
			renderOption={option => option.title}
			filterOptions={(options, params) => {
				const filtered = filter(options, params);

				if (params.inputValue !== '') {
					filtered.push({
						inputValue: params.inputValue,
						title: `${t('add_tag')} "${params.inputValue}"`
					});
				}

				return filtered;
			}}
			onChange={handleOnChnage}
			getOptionLabel={option => {
				if (typeof option === 'string') {
					return option;
				}
				if (option.inputValue) {
					return option.inputValue;
				}
				return option.title;
			}}
			value={selectedTags}
			renderInput={params => (
				<TextField
					{...params}
					variant="outlined"
					label={t('choose_labels')}
					placeholder={t('label')}
					value={searchedTag}
					onChange={ev => handleSearchChange(ev.target.value)}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? <CircularProgress color="inherit" size={20} /> : null}
								{params.InputProps.endAdornment}
							</>
						)
					}}
				/>
			)}
		/>
	);
}

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { ICategoryProps } from './props';
import { CategoryApi } from 'api/Category/index';

const CategoryComponent = ({
	handleChange,
	multiSelect,
	showLabel,
	options,
	selectedCategory,
	categroyId
}: ICategoryProps) => {
	console.log('selectedCategory: ', selectedCategory);
	const { t } = useTranslation('categoryApp');

	const [categories, setCategories] = useState([]);
	const [selected, setSelected] = useState<ICategory.ICategoryData>({
		title: '',
		value: ''
	});
	const SetValue = () => {
		if (selectedCategory) {
			setSelected({
				title: selectedCategory.title,
				value: selectedCategory.value
			});
		}
	};

	useEffect(() => {
		SetValue();
	}, []);
	// useEffect(() => {
	// 	SetValue();
	// }, [isEdditingMode]);

	useEffect(() => {
		SetValue();
	}, [selectedCategory]);

	useEffect(() => {
		const getCategories = async () => {
			let catArray = [];
			const { data } = await CategoryApi.getAllCategories();
			data.forEach(item => {
				catArray.push({
					title: item.title,
					value: item.id
				});
			});
			setCategories(catArray);
		};
		getCategories();
	}, []);
	return (
		<Autocomplete
			// multiple
			id="categories"
			getOptionLabel={option => option.title}
			noOptionsText="یافت نشد ..."
			// defaultValue={selectedCategory}
			options={categories}
			value={selectedCategory && selectedCategory}
			onChange={handleChange}
			disableClearable
			renderInput={params => (
				<TextField
					{...params}
					variant="outlined"
					label={t('d_default_service')}
					placeholder={t('d_default_service')}
				/>
			)}
		/>
	);
};
export default React.memo(CategoryComponent);

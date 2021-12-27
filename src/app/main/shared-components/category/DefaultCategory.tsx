import React, { useCallback, useEffect, useState } from 'react';
import Category from '../../shared-components/category/category';
import { useDebounce } from '@fuse/hooks';
import Typography from '@material-ui/core/Typography';
import { CategoryApi } from 'api/Category/index';
import { ICategoryProps } from './props';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

export default ({ handleChange, multiSelect, showLabel, isEdditingMode, selectedCategory }: ICategoryProps) => {
	const [categories, setCategories] = useState([]);
	const [selectedValue, setSelectedValue] = useState<ICategory.ICategoryData>();
	const { t } = useTranslation('categoryApp');

	const SetValue = () => {
		selectedCategory
			? setSelectedValue({ title: selectedCategory.title, value: selectedCategory.value })
			: setSelectedValue({ title: '', value: '' });
		// if (selectedCategory) {
		// 	setSelectedValue({
		// 		title: selectedCategory.title,
		// 		value: selectedCategory.value
		// 	});
		// }
	};
	useEffect(() => {
		SetValue();
	}, []);
	useEffect(() => {
		SetValue();
	}, [isEdditingMode]);

	useEffect(() => {
		const getCategories = async () => {
			let catArray = [];
			const { data } = await CategoryApi.getAllCategories();
			data.forEach(item => {
				catArray.push({
					// value: item.id,
					// label: item.title,
					title: item.title,
					value: item.id
				});
			});
			setCategories(catArray);
		};
		getCategories();
	}, []);

	// const mapOptions = useCallback((data: ICategory.ICategoryData[]) => {
	// 	return data.map(item => ({
	// 		value: item.id,
	// 		label: item.title
	// 	}));
	// }, []);

	// const handleChangeText = async (inputValue, callBack) => {
	// 	if (!inputValue) {
	// 		return callBack([]);
	// 	}
	// 	try {
	// 		const request = await CategoryApi.getAllCategories({ title: inputValue });

	// 		let { data } = await request;
	// 		console.log('data: ', data);

	// 		data = mapOptions(data);
	// 		callBack(data);
	// 	} catch {
	// 		callBack([]);
	// 	}
	// };

	const handleOnChnage = (event, value) => {
		console.log('value :', value);

		if (!multiSelect) {
			setSelectedValue(value);
			const ev = {
				target: {
					name: 'defaultCategoryID',
					value: value && value.value,
					categoryData: value
				}
			};
			handleChange(ev);
		} else {
			if (value) {
				setSelectedValue(value);
				handleChange(value);
			}
		}
	};
	return (
		<div className="mt-40 h-100">
			<Typography variant="subtitle1" gutterBottom>
				{t('default_service')}:
			</Typography>
			<Category
				options={categories}
				selectedCategory={selectedValue}
				handleChange={handleOnChnage}
				multiSelect={multiSelect}
				showLabel={showLabel}
				// handleChangeText={handleChangeText}
				isEdditingMode={isEdditingMode}
			/>

			{/* <Select
				// isMulti
				onChange={handleOnChnage}
				// inputValue={inputValue}
				value={selectedCategories}
				// name="categories"
				placeholder="انتخاب سرویس پیش فرض"
				options={categories}
			/> */}
		</div>
	);
};

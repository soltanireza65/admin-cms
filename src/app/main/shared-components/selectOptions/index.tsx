import React, { useEffect, useState } from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
interface IProps {
	handleChange: any;
	name: string;
	listOptions?: {
		value: any;
		title: string;
	}[];
	title: string;
	selectedOption: any;
}
export default ({ handleChange, listOptions, name, selectedOption, title }: IProps) => {
	return (
		<FormControl className="w-full mb-20">
			<InputLabel id={name} className="text-black">{title}</InputLabel>
            <Select id="selectoptions" className="text-black" name={name} value={selectedOption && selectedOption.value} onChange={handleChange}>
				{listOptions &&
					listOptions.length > 0 &&
					listOptions.map((item, index) => (
						<MenuItem key={index} value={item.value}>
							{item.title}
						</MenuItem>
					))}
			</Select>
		</FormControl>
	);
};

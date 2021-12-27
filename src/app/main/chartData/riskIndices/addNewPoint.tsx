import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';
import { addNewPoint } from '../store/riskIndexSlice';
export default ({ categoryID, categoryTitle, dispatch, isDaily }) => {
	const [value, setValue] = useState<number>(0);

	return (
		<div className="flex items-center justify-center">
			<IconButton
				onClick={() => {
					setValue(parseFloat(value.toString()) + 5);
				}}
			>
				<Icon>add</Icon>
			</IconButton>
			<TextField
				id="standard-number"
				type="number"
				value={value}
				onChange={x => setValue(parseFloat(x.target.value))}
				InputLabelProps={{
					shrink: true
				}}
			/>
			<IconButton
				onClick={() => {
					setValue(parseFloat(value.toString()) - 5);
				}}
			>
				<Icon>remove</Icon>
			</IconButton>

			<IconButton
				onClick={ev => {
					ev.stopPropagation();
					dispatch(
						addNewPoint({
							riskIndexNumber: value,
							categoryID: categoryID,
							categoryTitle: categoryTitle,
							isDaily
						})
					);
				}}
			>
				<Icon style={{ color: green[500] }}>save</Icon>
			</IconButton>
		</div>
	);
};

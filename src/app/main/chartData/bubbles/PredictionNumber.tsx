import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import { red, green, grey } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import HtmlToolTip from 'app/main/shared-components/HtmlTooltip';
import { addNewPoint, addZeroPoint } from '../store/bubbleSlice';
export default ({ number, row, dispatch }) => {
	const [value, setValue] = useState(number ? number : 0);

	return (
		<div className="flex items-center">
			<IconButton
				onClick={() => {
					setValue(parseFloat(value) + 5);
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
					setValue(parseFloat(value) - 5);
				}}
			>
				<Icon>remove</Icon>
			</IconButton>

			<IconButton
				onClick={ev => {
					ev.stopPropagation();
					dispatch(
						addNewPoint({
							bubbleEdge: value,
							currentBazaar: 1,
							categoryID: row.categoryID,
							categoryTitle: row.categoryTitle
						})
					);
				}}
			>
				<Icon style={{ color: green[500] }}>save</Icon>
			</IconButton>

			<IconButton
				onClick={ev => {
					ev.stopPropagation();
					setValue(0);
					dispatch(
						addZeroPoint({
							bubbleEdge: 0,
							currentBazaar: 0,
							categoryID: row.categoryID,
							categoryTitle: row.categoryTitle
						})
					);
				}}
			>
				<Icon style={{ color: red[500] }}>delete</Icon>
			</IconButton>
		</div>
	);
};

import React, { useState } from 'react';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import JalaliUtils from '@date-io/jalaali';
import InputAdornment from '@material-ui/core/InputAdornment';
import { InsertInvitation } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { IDateProps } from './props';
import Clear from '@material-ui/icons/Clear';
export default ({ onChange, selectedDate, setNull }: IDateProps) => {
	return (
		<MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
			<DateTimePicker
				name="startdate"
				className="rtl w-full mb-10"
				InputLabelProps={{
					shrink: true
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment position="start">
							<IconButton>
								<InsertInvitation />
							</IconButton>
							<IconButton onClick={setNull}>
								<Clear />
							</IconButton>
						</InputAdornment>
					)
				}}
				value={selectedDate}
				onChange={onChange}
				inputVariant="outlined"
				okLabel="تایید"
				cancelLabel="لغو"
			/>
		</MuiPickersUtilsProvider>
	);
};

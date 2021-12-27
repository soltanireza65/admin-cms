import React from 'react';

interface IProps {
	label?: string;
	placeholder?: string;
	id?: string;
	autoFocus?: boolean;
	name?: string;
	type?: string;
	value?: any;
	onChange?: any;
	required?: boolean;
	fullWidth?: boolean;
	toolTip?: any;
}

const AppInputField = ({
	label,
	placeholder,
	id,
	autoFocus,
	name,
	type,
	value,
	onChange,
	required,
	fullWidth,
	toolTip
}: IProps) => {
	const isFullWith = fullWidth ? 'w-full' : '';
	return (
		<div className="mb-4">
			{label && (
				<label className="block text-gray-700 mb-2" htmlFor="username">
					{label}
				</label>
			)}
			<input
				className={`${isFullWith} shadow h-40 p-20 appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline`}
				id={id && id}
				type={type}
				placeholder={placeholder && placeholder}
				autoFocus={autoFocus}
				required={required}
				onChange={onChange}
				value={value}
				name={name}
				
			/>
		</div>
	);
};

export default AppInputField;

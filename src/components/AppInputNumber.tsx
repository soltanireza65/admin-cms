import React from 'react';

interface IProps {
	label?: string;
	placeholder?: string;
	id?: string;
	autoFocus?: boolean;
	name?: string;
	value?: any;
	onChange?: any;
	required?: boolean;
	fullWidth?: boolean;
	toolTip?: any;
}

const AppInputNumber = ({
	label,
	placeholder,
	id,
	autoFocus,
	name,
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
				className={`${isFullWith} shadow h-40 appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline`}
				id={id && id}
				type="number"
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

export default AppInputNumber;

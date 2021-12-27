import _ from '@lodash';
import { useCallback, useState } from 'react';

function useForm<A>(initialState?, onSubmit?, editor?) {
	const [form, setForm] = useState<A>(initialState);

	const handleChange = useCallback((event, editor?, isCK?) => {
		let value = null;
		let name = null;
		if (isCK) {
			name = 'content';
			value = editor.getData();
		} else if (!isCK) {
			name = event.target.name ? event.target.name : event.target.id;
			if (event.persist instanceof Function) event.persist();
			if (event.target.type === 'checkbox') value = event.target.checked;
			else if (event.target.type === 'number') value = parseInt(event.target.value);
			else if (event.target.getContent instanceof Function) {
				value = event.target.getContent();
			}
			// else if (editor.getData instanceof Function) {
			// 	value = editor.getData();
			// }
			else {
				value = event.target.value;
			}

			if (Array.isArray(value)) {
				value = _.uniqBy(value, x => x);
			}
		}

		setForm(_form => ({ ..._form, [name]: value }));
	}, []);
	const resetForm = useCallback(() => {
		if (!_.isEqual(initialState, form)) {
			setForm(initialState);
		}
	}, [form, initialState]);

	const setInForm = useCallback((name, value) => {
		setForm(_form => ({ ..._form, [name]: value }));
	}, []);

	const handleSubmit = useCallback(
		event => {
			if (event) {
				event.preventDefault();
			}
			if (onSubmit) {
				onSubmit();
			}
		},
		[onSubmit]
	);

	return {
		form,
		handleChange,
		handleSubmit,
		resetForm,
		setForm,
		setInForm
	};
}

export default useForm;

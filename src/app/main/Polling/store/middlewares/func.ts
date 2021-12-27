const func = ({ dispatch, getState }) => next => action => {
	typeof action === 'function' ? action(dispatch, getState) : next(action);
	// if (typeof action === 'function') {
	// 	action();
	// } else {
	// 	next(action);
	// }

	// next(action);
};

export default func;

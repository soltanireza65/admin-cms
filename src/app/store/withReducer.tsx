import { injectReducer } from 'app/store/index';
import React from 'react';

const withReducer = (key: any, reducer: any) => (WrappedComponent: any) => {
	injectReducer(key, reducer);

	return props => <WrappedComponent {...props} />;
};

export default withReducer;

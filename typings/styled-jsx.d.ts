import 'react';
// Working with Other JavaScript Libraries

declare module 'react' {
	interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
		jsx?: boolean;
		global?: boolean;
	}
}

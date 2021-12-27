import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default ({ handeOnChange, id, content }) => {
	return (
		<CKEditor
			name="editor"
			id={id}
			editor={ClassicEditor}
			data={content}
			onReady={editor => {
				// You can store the "editor" and use when it is needed.
				console.log('Editor is ready to use!', editor);
			}}
			// onChange={(event, editor) => {
			// 	const data = editor.getData();
			// 	console.log({ event, editor, data });
			// }}
			onChange={(event, editor) => {
				// const data = editor.getData();
				// console.log({ event, editor, data });
				handeOnChange(event, editor, true);
				// event, editor?, isCK?
			}}
			onBlur={(event, editor) => {
				console.log('Blur.', editor);
			}}
			onFocus={(event, editor) => {
				console.log('Focus.', editor);
			}}
		/>
	);
};

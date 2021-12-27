import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
export default ({ handeOnChange, id, content }) => {
	return (
		<Editor
			id={id}
			apiKey="3dma6tfpafa3uuaencsucwkzty3ibepfru2gatkpukazg20u"
			// initialValue="<p></p>"
			initialValue={content}
			init={{
				content_css: 'writer',
				directionality: 'rtl',
				language: 'fa',
				height: 500,
				menubar: true,
				plugins: [
					'advlist autolink lists link image charmap print preview anchor',
					'searchreplace visualblocks code fullscreen',
					'insertdatetime media table paste code help wordcount'
				],
				toolbar:
					'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | image media| searchplace | paste | table'
			}}
			outputFormat="html"
			onChange={handeOnChange}
		/>
	);
};

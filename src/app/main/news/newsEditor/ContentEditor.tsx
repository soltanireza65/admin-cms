import React, { useEffect, useState } from 'react';
import _ from '@lodash';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import ValidationTextField from '../../shared-components/ValidationTextField';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '../../shared-components/tinymce';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import BrokenImage from '@material-ui/icons/BrokenImage';
import VideoCall from '@material-ui/icons/VideoCall';
import AudioTrack from '@material-ui/icons/Audiotrack';
import FileCopy from '@material-ui/icons/FileCopy';
import Album from 'app/main/file-manger/album/Album';
import { INewsFormProps } from '../interfaces/props';
import { slugify } from 'utils/slug';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/fa';
import CK from 'app/main/shared-components/CK';

export default ({ rotitr, titr, lead, shortContent, SeoTitr, handleChange, content }: INewsFormProps) => {
	const dispatch = useDispatch();
	const newsForm = useSelector(({ newsApp }: any) => newsApp.news);

	const { t, i18n } = useTranslation('newsApp');

	const [tabValue, setTabValue] = useState(0);
	const [editorContent, setEditorContent] = useState('');

	// console.log('content: ', content);
	// console.log('editorContent: ', editorContent);

	useEffect(() => {
		setEditorContent(content);
		console.log('editorContent: ', editorContent);
	}, [content]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}
	const checkError = (id: string, value?: string) => {
		if (
			newsForm.errorList.keys &&
			newsForm.errorList.keys.findIndex(x => x.toLowerCase() === id.toLowerCase()) > -1
		) {
			return true;
		} else {
			return false;
		}
		if (value && value.length > 0) {
			return false;
		}
	};
	const handleTitleChange = e => {
		handleChange(e);
		const ev = {
			target: {
				name: 'SeoTitr',
				value: slugify(e.target.value.toString())
			}
		};
		handleChange(ev);
	};
	const handleContentChange = (event, editor) => {
		// const data = editor.getData();
		// console.log('event: ', event, 'editor: ', editor);

		// console.log('editorContent: ', editorContent);
		// handleChange(event, editor, true);
		setEditorContent(editor.getData());
		const data = editor.getData();
		const ev = {
			target: {
				name: 'content',
				value: data
			}
		};
		handleChange(ev);
	};
	return (
		<>
			<ValidationTextField
				className="mt-8 mb-16"
				label={t('edit_rotitr')}
				autoFocus
				name="rotitr"
				id="rotitr"
				value={rotitr}
				onChange={handleChange}
				variant="outlined"
				fullWidth
			/>
			<ValidationTextField
				className="mt-8 mb-16"
				required
				error={checkError('titr', titr)}
				label={t('edit_titr')}
				helperText={t('field_required')}
				name="titr"
				id="titr"
				value={titr}
				onChange={handleTitleChange}
				variant="outlined"
				fullWidth
			/>
			<ValidationTextField
				className="mt-8 mb-16"
				label={t('edit_lead')}
				name="lead"
				id="lead"
				value={lead}
				onChange={handleChange}
				variant="outlined"
				fullWidth
			/>
			<ValidationTextField
				className="mt-8 mb-16"
				// error={newsForm.requiredError === 'shortContent'}
				label={t('edit_short_titr')}
				name="shortContent"
				id="shortContent"
				value={shortContent}
				onChange={handleChange}
				variant="outlined"
				fullWidth
			/>
			<ValidationTextField
				className="mt-8 mb-16"
				label={t('setting_seotitr')}
				name="SeoTitr"
				id="SeoTitr"
				value={slugify(titr)}
				variant="outlined"
				fullWidth
			/>
			{checkError('content', content) == true && (
				<h3
					style={{
						color: 'red'
					}}
				>
					{t('content_required')}
				</h3>
			)}
			{/* <Editor id="content" handeOnChange={handleChange} content={content}></Editor> */}
			{/* <CK id="content" handeOnChange={handleChange} content={content} /> */}
			<CKEditor
				name="editor"
				id="content"
				style={{ height: '300px' }}
				editor={ClassicEditor}
				data={content}
				key={i18n.language}
				config={{
					language: i18n.language

					// content: 'fa'
				}}
				onReady={editor => {
					// editor.data = content;
					// setEditorContent(editor.getData());
					// You can store the "editor" and use when it is needed.
					console.log('Editor is ready to use!', editor);
					console.log('editorContent: ', editorContent);
				}}
				onChange={(event, editor) => {
					handleContentChange(event, editor);
				}}
			/>
			<Paper className="mt-20">
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64 normal-case" icon={<BrokenImage />} label={t('image_tab')} />
					<Tab className="h-64 normal-case" icon={<VideoCall />} label={t('video_tab')} />
					<Tab className="h-64 normal-case" icon={<AudioTrack />} label={t('audio_tab')} />
					<Tab className="h-64 normal-case" icon={<FileCopy />} label={t('documents_tab')} />
				</Tabs>
			</Paper>
			{checkError('MediaFiles') == true && (
				<h3
					style={{
						color: 'red'
					}}
				>
					{t('select_main_image')}
				</h3>
			)}
			{tabValue == 0 && <Album mediaType={3} />}
			{tabValue == 1 && <Album mediaType={4} />}
			{tabValue == 2 && <Album mediaType={2} />}
			{tabValue == 3 && <Album mediaType={1} />}
		</>
	);
};

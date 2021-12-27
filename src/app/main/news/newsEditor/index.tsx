import React, { useEffect, useState } from 'react';
import ContentEditor from './ContentEditor';
import NewsSettings from './NewsSetting';
import TagBox from './TagBox';
import NewsCodes from './NewsCodes';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { useForm } from '@fuse/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { INewsFormProps } from '../interfaces/props';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import withReducer from 'app/store/withReducer';
import reducer from '../store/index';
import { useParams } from 'react-router-dom';
import useDeepCompareEffect from '@fuse/hooks/useDeepCompareEffect';
import { createNews, getNewsById, editNews, manageNews, setError, getPublishedNews } from '../store/newsSlice';
import DefaultCategory from '../../shared-components/category/DefaultCategory';
import { addFile, deleteAllFiles } from 'app/store/fuse/albumSlice';
import { useHistory } from 'react-router-dom';
import { NewsApi } from 'api/News';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useTranslation } from 'react-i18next';

const initialValues: INewsFormProps = {
	rotitr: '',
	titr: '',
	shortContent: '',
	content: '',
	lead: '',
	id: '',
	newsType: 0,
	SeoTitr: '',
	relatedNewsId: [],
	writerFullName: '',
	linkUrl: '',
	source: '',
	defaultCategoryTitle: '',
	mediaFiles: [],
	isLockedForPublicView: false,
	isEdtingMode: false
};

enum MediaType {
	mainPhoto = 1,
	photoGalley = 2,
	mainVideo = 3,
	videoGallery = 4,
	mainAudio = 5,
	audioGallery = 6,
	document = 7,
	writerPhoto = 8
}

const NewsEditor = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	const { form, handleChange, setForm } = useForm<INewsFormProps>(initialValues);
	const routeParams = useParams();
	const mediaFilesData = useSelector(({ fuse }: any) => fuse.album);
	const newsForm = useSelector(({ newsApp }: any) => newsApp.news);
	const { t } = useTranslation('newsApp');

	useEffect(() => {
		const { imagesEntities, videoEntities, audioEntities, documentEntities } = mediaFilesData;
		form.mediaFiles = [];
		imagesEntities.map((file, index) => {
			form.mediaFiles.push({
				mediaId: file.item.mediaFileId,
				attachments: file.item.attachments,
				mediaCropParam: file.item.mediaCropParam,
				mediaFileType: file.mainItem == true ? MediaType.mainPhoto : MediaType.photoGalley,
				order: index
			});
		});
		videoEntities.map((file, index) => {
			form.mediaFiles.push({
				mediaId: file.item.mediaFileId,
				attachments: file.item.attachments,
				mediaCropParam: file.item.mediaCropParam,
				mediaFileType: file.mainItem == true ? MediaType.mainVideo : MediaType.videoGallery,
				order: index
			});
		});
		audioEntities.map((file, index) => {
			form.mediaFiles.push({
				mediaId: file.item.mediaFileId,
				attachments: file.item.attachments,
				mediaCropParam: file.item.mediaCropParam,
				mediaFileType: file.mainItem == true ? MediaType.mainAudio : MediaType.audioGallery,
				order: index
			});
		});
		documentEntities.map((file, index) => {
			form.mediaFiles.push({
				mediaId: file.item.mediaFileId,
				attachments: file.item.attachments,
				mediaCropParam: file.item.mediaCropParam,
				mediaFileType: MediaType.document,
				order: index
			});
		});
	}, [mediaFilesData]);

	useDeepCompareEffect(() => {
		function updateNewsState() {
			const params: any = routeParams;

			if (params.newsid) {
				console.log('url params:', params);
				dispatch(getNewsById({ id: params.newsid }));
			}
		}
		updateNewsState();
	}, [dispatch, routeParams]);

	useDeepCompareEffect(() => {
		if (newsForm && newsForm.currentNews && newsForm.currentNews.id && !form.isEdtingMode) {
			// TODO update news type from server
			setForm({ ...newsForm.currentNews, mediaFiles: [], newsType: 1, isEdtingMode: true });

			const images = newsForm.currentNews.mediaFiles.filter(x => x.mediaFileType === 1 || x.mediaFileType === 2);
			const video = newsForm.currentNews.mediaFiles.filter(x => x.mediaFileType === 3 || x.mediaFileType === 4);
			const audio = newsForm.currentNews.mediaFiles.filter(x => x.mediaFileType === 5 || x.mediaFileType === 6);
			/**
			 *
		photo = 3,
		video = 4,
		audio = 2,
		document = 1,
		
			 */
			images.map((item: IGlobalData.IMedaiFiles, index) => {
				dispatch(
					addFile(
						{
							id: index + 1,
							extension: '.png',
							mediaFileId: item.mediaFileId,
							filePath: item.filePath,
							attachments: item.attachments,
							fileType: item.mediaFileType,
							isVideo: false,
							caption: item.caption,
							url: ''
						},
						3,
						true
					)
				);
			});
			video.map((item: IGlobalData.IMedaiFiles, index) => {
				dispatch(
					addFile(
						{
							id: index + 1,
							extension: '.png',
							mediaFileId: item.mediaFileId,
							filePath: item.filePath,
							attachments: item.attachments,
							fileType: item.mediaFileType,
							isVideo: false,
							caption: item.caption,
							url: ''
						},
						4,
						true
					)
				);
			});
			audio.map((item: IGlobalData.IMedaiFiles, index) => {
				dispatch(
					addFile(
						{
							id: index + 1,
							extension: '.png',
							mediaFileId: item.mediaFileId,
							filePath: item.filePath,
							attachments: item.attachments,
							fileType: item.mediaFileType,
							isVideo: false,
							caption: item.caption,
							url: ''
						},
						2,
						true
					)
				);
			});
		}
	}, [dispatch, newsForm, newsForm.currentNew]);
	const handleSubmit = async () => {
		if (!form.isEdtingMode) {
			// dispatch(createNews({ ...form }));
			const request = await NewsApi.createNews({ ...form });
			const { data, status, errors, message } = await request;
			if (status == 1) {
				dispatch(
					showMessage({
						message: `خبر شماره ${data.newsCode} با عنوان ${data.titr} در سیستم ثبت شد.`,
						variant: 'success'
					})
				);
				history.push('/apps/news/list');
				dispatch(deleteAllFiles({}));
				dispatch(manageNews({}));
			} else {
				dispatch(setError(errors));
				dispatch(
					showMessage({
						message: message,
						variant: 'error'
					})
				);
			}

			// history.push('/apps/news/list');
		} else {
			delete form.isEdtingMode;
			form.mediaFiles = [];
			const { imagesEntities, videoEntities, audioEntities, documentEntities } = mediaFilesData;
			form.mediaFiles = [];
			imagesEntities.map((file, index) => {
				form.mediaFiles.push({
					mediaId: file.item.mediaFileId,
					attachments: file.item.attachments,
					mediaCropParam: file.item.mediaCropParam,
					mediaFileType: file.mainItem == true ? MediaType.mainPhoto : MediaType.photoGalley,
					order: index
				});
			});
			videoEntities.map((file, index) => {
				form.mediaFiles.push({
					mediaId: file.item.mediaFileId,
					attachments: file.item.attachments,
					mediaCropParam: file.item.mediaCropParam,
					mediaFileType: file.mainItem == true ? MediaType.mainVideo : MediaType.videoGallery,
					order: index
				});
			});
			audioEntities.map((file, index) => {
				form.mediaFiles.push({
					mediaId: file.item.mediaFileId,
					attachments: file.item.attachments,
					mediaCropParam: file.item.mediaCropParam,
					mediaFileType: file.mainItem == true ? MediaType.mainAudio : MediaType.audioGallery,
					order: index
				});
			});
			documentEntities.map((file, index) => {
				form.mediaFiles.push({
					mediaId: file.item.mediaFileId,
					attachments: file.item.attachments,
					mediaCropParam: file.item.mediaCropParam,
					mediaFileType: MediaType.document,
					order: index
				});
			});

			// dispatch(editNews({ ...form }));
			const request = await NewsApi.editNews({ ...form });
			const { data, status } = await request;
			if (status == 1) {
				dispatch(
					showMessage({
						message: `ویرایش خبر ${form.titr} انجام شد.`,
						variant: 'success'
					})
				);
				dispatch(getPublishedNews({}));
				history.push('/apps/news/list');
			} else {
				dispatch(
					showMessage({
						message: `ثبت خبر با مشکل مواجه شد`,
						variant: 'error'
					})
				);
			}
		}
	};
	const checkError = (id: string) => {
		if (
			newsForm.errorList.keys &&
			newsForm.errorList.keys.findIndex(x => x.toLowerCase() === id.toLowerCase()) > -1
		) {
			return true;
		} else {
			return false;
		}
	};
	return (
		<div className="h-full p-20">
			<Grid container spacing={4}>
				<Grid item xs={12} lg={9} md={9}>
					<ContentEditor
						rotitr={form.rotitr}
						titr={form.titr}
						SeoTitr={form.SeoTitr}
						lead={form.lead}
						shortContent={form.shortContent}
						content={form.content}
						handleChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} lg={3} md={3}>
					{/* <DatePublish /> */}
					<Divider className="mb-10" />
					<NewsSettings
						newsType={form.newsType}
						handleChange={handleChange}
						required={checkError('NewsType')}
						isEdtingMode={form.isEdtingMode}
						linkUrl={form.linkUrl}
						authorUserFullName={form.authorUserFullName}
					/>
					<Divider className="mb-10" />

					<DefaultCategory
						handleChange={handleChange}
						multiSelect={false}
						showLabel={true}
						isEdditingMode={form.isEdtingMode}
						selectedCategory={{
							// value: form.defaultCategoryID,
							// label: form.defaultCategoryTitle,
							title: form.defaultCategoryTitle,
							value: form.defaultCategoryID
						}}
					/>

					<Divider className="mb-10" />
					{
						<TagBox
							handleChange={handleChange}
							required={checkError('Tags')}
							tagsSelected={form.tags}
							isEdditingMode={form.isEdtingMode}
						/>
					}
					{/*<Divider className="mb-10" />*/}
					{/* <NewsCodes handleChange={handleChange} /> */}
					<Divider className="mb-10" />
					<div className="mt-10">
						<Button onClick={handleSubmit} variant="contained" color="primary" className="w-full">
							{t('save_button')}
						</Button>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};
export default withReducer('newsApp', reducer)(NewsEditor);

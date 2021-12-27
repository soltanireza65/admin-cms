import { string } from 'prop-types';

namespace ITags {
	interface ITagsDTO {
		id?: string;
		title?: string;
		label?: string;
		value?: string;
		description?: string;
		createdDateTim?: string;
		callback?: () => any;
	}
	interface ITag {
		id?: string;
		title?: string;
		label?: string;
		createdDateTime?: string;
		ownerUserId?: string;
		description?: string;
		contents: {
			moduleType: number;
			totalCount: number;
			lastUsageDateTime: string;
		}[];
		summary: {
			moduleType: number;
			totalCount: number;
			lastUsageDateTime: string;
		}[];
	}
	interface ITagsParams {
		label?: string;
		title?: string;
		description?: string;
		moduleType?: number;
		orderByFieldName?: string;
		orderByDescending?: boolean;
		fromDateTime?: dateTime;
		tillDateTime?: dateTime;
		count?: number;
		page?: number;
		totalPage?: number;
	}
}

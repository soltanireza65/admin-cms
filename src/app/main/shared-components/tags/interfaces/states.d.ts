import { ITags } from 'api/Interfaces/tags';

export interface ITagsStates {
	entities: ITags.ITagsDTO[];
	tagDialog: {
		type: string;
		props: any;
		data: any;
	};
	loading: boolean;
	submitLoading: boolean;
}

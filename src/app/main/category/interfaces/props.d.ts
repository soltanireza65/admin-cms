import { ITickers } from 'api/bourseApi/Interfaces/tickers';
export interface IDialogCategory extends ICategory.ICategoryData {
	saveMessage?: string;
	editMessage?: string;
	deleteMessage?: string;
	cancelMessage?: string;
}
export interface IOptionsData {
	label: string;
	value: ITickers.ITicker;
}

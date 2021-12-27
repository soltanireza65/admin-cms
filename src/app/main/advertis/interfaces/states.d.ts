export interface IState {
	entities: AdvertiesInterface.IAdvertiesBody[];
	loading: boolean;
	status: number;
	deleteDialog: {
		loading: boolean;
		id: string;
		title: string;
		props: {
			open: boolean;
		};
	};
	dialogAdverties: {
		loading: boolean;
		locations: IGlobalData.ILocation[];
		image: IFileManager.IFile;
		type: 'edit' | 'new';
		props: {
			currentAdvertiesItem: AdvertiesInterface.IAdvertiesBody;
			open: boolean;
		};
		imageLoading: boolean;
	};
}

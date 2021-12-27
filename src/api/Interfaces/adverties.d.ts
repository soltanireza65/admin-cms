declare namespace AdvertiesInterface {
	enum Status {
		active = 1,
		disactive = 2
	}
	interface IAdvertiesBody {
		id?: string;
		title?: string;
		linkUrl?: string;
		status?: Status;
		urlFile?: string;
		createdDateTime?: string;
		lastModifiedDateTime?: string;
		mediaFile?: IGlobalData.IMedaiFiles;
		limitFromDateTime?: string;
		limitTillDateTime?: string;
		hasLimiTime?: boolean;
		locations?: IGlobalData.ILocation[];
		persianCreatedDateTime?: string;
		persianLastModifiedDateTime?: string;
		hitCount?: number;
	}
	interface IFilterAdverties extends IGlobalData.IFilterBase {
		Id?: string;
		title?: string;
		linkUrl?: string;
		FromCreatedDateTime?: string;
		TillCreatedDateTime?: string;
	}
}

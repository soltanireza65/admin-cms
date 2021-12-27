declare module '@fuse/core/FuseLoading' {
	interface Props {
		className?: any;
		ref?: any;
		delay: number;
	}
	export default function FuseLoading(props: Props): JSX.Element;
}

declare module '@fuse/core/FusePageSimple' {
	interface Props {
		leftSidebarHeader?: any;
		leftSidebarContent?: any;
		leftSidebarVariant?: any;
		rightSidebarHeader?: any;
		rightSidebarContent?: any;
		rightSidebarVariant?: any;
		header?: any;
		ref?: any;
		content?: any;
		classes?: any;
		className?: any;
		contentToolbar?: any;
		sidebarInner?: any;
		innerScroll?: any;
	}
	export default function FusePageSimple(props: Props): JSX.Element;
}

declare module '@fuse/core/FuseChipSelect' {
	export default function FuseChipSelect(props: Props): JSX.Element;
}

declare module '@fuse/core/FusePageCarded' {
	interface Props {
		leftSidebarHeader?: any;
		leftSidebarContent?: any;
		leftSidebarVariant?: any;
		rightSidebarHeader?: any;
		rightSidebarContent?: any;
		rightSidebarVariant?: any;
		header?: any;
		ref?: any;
		content?: any;
		classes?: any;
		className?: any;
		contentToolbar?: any;
		sidebarInner?: any;
		innerScroll?: any;
		useFuseScrollBar: boolean;
	}
	export default function FusePageCarded(props: Props): JSX.Element;
}

declare module '@fuse/core/NavLinkAdapter' {
	export default function NavLinkAdapter(props: any): JSX.Element;
}
declare module '@fuse/core/FuseAnimate' {
	interface Props {
		loadingProps?: any;
		children?: any;
		className?: any;
		animation?: string;
		ref?: any;
		runOnMount?: boolean;
		targetQuerySelector?: any;
		interruptBehavior?: string;
		visibility?: string;
		duration?: number;
		delay?: number;
		easing?: any;
		display?: any;
		setRef?: any;
	}
	export default function FuseAnimate(props: Props): JSX.Element;
}

declare module '@fuse/core/FuseSuspense' {
	interface Props {
		className?: any;
		ref?: any;
		loadingProps: any;
	}
	export default function FuseSuspense(props: Props): JSX.Element;
}
declare module '@fuse/utils' {
	export default class FuseUtils {
		static filterArrayByString(mainArr: Array, searchText: string): Array;
		static searchInObj(itemObj: Object, searchText: string);
		static searchInArray(arr: Array, searchText: string);
		static searchInString(value: string, searchText: string);
		static generateGUID();
		static toggleInArray(item: any, array: Array);
		static handleize(text: string);
		static setRoutes(config: any, defaultAuth: any);
		static generateRoutesFromConfigs(configs, defaultAuth?);
		static findById(obj, id);
		static getFlatNavigation(navigationItems, flatNavigation = []);
		static randomMatColor(hue);
		static difference(object, base);
		static updateNavItem(nav, id, item);
		static removeNavItem(nav, id);
		static prependNavItem(nav, item, parentId);
		static appendNavItem(nav, item, parentId);
		static hasPermission(authArr, userRole);
	}
}

import jwtDecoded from 'jwt-decode';
export const setWithExpiry = (key, value, ttl) => {
	const now = new Date();
	const item = {
		value: value,
		expiry: Math.floor(now.getTime() / 1000) + ttl
	};
	localStorage.setItem(key, JSON.stringify(item));
};
export const getWithExpiry = key => {
	const itemStr = localStorage.getItem(key);
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null;
	}
	const item = JSON.parse(itemStr);
	const now = new Date();
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key);
		return null;
	}
	return item.value;
};

export const validateToken = (key): { token: boolean; isExpired: boolean } => {
	try {
		const itemStr = localStorage.getItem(key);
		if (!itemStr) {
			return { token: false, isExpired: false };
		}

		const item = JSON.parse(itemStr);
		const now = Math.floor(Date.now() / 1000);
		const { exp }: any = jwtDecoded(item.value);
		console.log(`time diff : ${now.valueOf() - exp}`);
		if (now > exp) {
			return { token: true, isExpired: true };
		}
		return { token: true, isExpired: false };
	} catch (e) {
		return { token: false, isExpired: false };
	}
};

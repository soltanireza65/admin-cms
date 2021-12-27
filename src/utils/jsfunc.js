export function makeEnum(enumObject) {
	var all = [];
	for (var key in enumObject) {
		all.push(enumObject[key]);
	}
	console.log(all);
	return all;
}

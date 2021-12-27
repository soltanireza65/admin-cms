import XRegExp from 'xregexp';

function dasherize(value) {
	const dashedString = value.replace(/\s/g, '-');
	return dashedString;
}

export function slugify(value) {
	let cleanReg = XRegExp('\\p{S}|\\p{P}', 'g');
	let cleanedString = XRegExp.replace(value, cleanReg, '');
	cleanedString = cleanedString.trim();
	cleanedString = cleanedString.toLowerCase();
	cleanedString = cleanedString.replace(/\s{2,}/g, ' ');
	const slugifiedString = dasherize(cleanedString);

	return slugifiedString;
}

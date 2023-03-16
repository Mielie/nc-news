export function formatDate(string) {
	let date = new Date(string);
	return date.toLocaleDateString();
}

export function wordCount(string) {
	return string.split(/\s+/).length;
}

export function capitaliseFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.substring(1);
}

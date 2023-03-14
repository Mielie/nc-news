export function formatDate(string) {
	let date = new Date(string);
	return date.toLocaleDateString();
}

export function wordCount(string) {
	return string.split(/\s+/).length;
}

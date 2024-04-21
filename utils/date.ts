export function formatDate(date: Date) {
	if (!(date instanceof Date)) {
		date = new Date(date); // Convert to Date object if not already
	}

	let year = date.getFullYear(); // Gets the full year (4 digits)
	let month: string | number = date.getMonth() + 1; // Gets month of the year (0-11), add 1 for (1-12)
	let day: string | number = date.getDate(); // Gets day of the month (1-31)

	// Pad the month and day with zeros if necessary
	month = month < 10 ? `0${month}` : month;
	day = day < 10 ? `0${day}` : day;

	return `${year}-${month}-${day}`; // Combine into final format
}

export const validateCheckIn = (checkIn: string, date: string): boolean => {
	// Get the current date and time
	const currentDate = new Date();
	const selectedDate = new Date(date);
	if (selectedDate >= currentDate) {
		return true;
	}
	// Create a date string for today with the time set to 'checkIn'
	// Format: 'YYYY-MM-DD'
	const checkInDateTime = new Date(
		`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${checkIn}`
	);
	// Compare the constructed check-in date-time with the current date-time
	return checkInDateTime.getTime() >= currentDate.getTime();
};

export const validateCheckOut = (checkIn: string, checkOut: string): boolean => {
	// Compare the constructed check-in date-time with the current date-time
	return checkIn <= checkOut;
};

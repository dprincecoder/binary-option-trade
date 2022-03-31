//format date in full with country code
export const formatDate = (date) => {
	const formated = date.toLocaleString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
	return formated;
};

//another date format
export const formatDate2 = (date) => {
	var d = new Date(date),
		month = "" + (d.getMonth() + 1),
		day = "" + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = "0" + month;
	if (day.length < 2) day = "0" + day;

	return [year, month, day].join("-");
};

export const formatDate3 = (date) => {
	//return date in words
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const dateObj = new Date(date);
	const day = days[dateObj.getDay()];
	const month = months[dateObj.getMonth()];
	const year = dateObj.getFullYear();
	const dateInWords = `${day}, ${month} ${dateObj.getDate()}, ${year}`;
	return dateInWords;
};

export const formatAmount = (amount) => {
	const formated = amount.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
	return formated;
};

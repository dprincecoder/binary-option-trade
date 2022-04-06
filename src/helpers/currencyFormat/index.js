export const formatAmount = (amount) => {
	let amountToFormat;
	if( amount == null || undefined){
		amountToFormat = 0.00
	}else{
		amountToFormat = amount
	}
	const formated = amountToFormat.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
	return formated;
};

//return coin amount relative to the amount user has in the wallet
export const formatCoin = (coinAmount, purchaseAmount) => {
	const coinAmountFloat = parseFloat(coinAmount);
	const purchaseAmountFloat = parseFloat(purchaseAmount);
	const coinAmountFloatDivided = purchaseAmountFloat / coinAmountFloat;
	const coinAmountFloatDividedRounded = coinAmountFloatDivided.toFixed(5);
	return coinAmountFloatDividedRounded;
};

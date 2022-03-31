export const tradingPackages = [
	{
		id: 1,
		title: "level 1 plan",
		percentage: 3,
		percentSymbol: "%",
		time: "daily for 24 hours",
		rate: { from: 150, to: 599, currency: "$" },
		options: {
			info1: "Principal included at maturity",
			info2: "Earning on Calendar Days",
		},
	},
	{
		id: 2,
		title: "level 2 plan",
		percentage: 10,
		percentSymbol: "%",
		time: "daily for 36 hours",
		rate: { from: 600, to: 5999, currency: "$" },
		options: {
			info1: "Principal included at maturity",
			info2: "Earning on Calendar Days",
		},
	},
	{
		id: 3,
		title: "level 3 plan",
		percentage: 15,
		percentSymbol: "%",
		time: "daily for 36 hours",
		rate: { from: 6000, to: 100000, currency: "$" },
		options: {
			info1: "Principal included at maturity",
			info2: "Earning on Calendar Days",
		},
	},
	{
		id: 4,
		title: "fixed deposit",
		percentage: 20,
		percentSymbol: "%",
		time: "daily for 30 days",
		rate: { from: 1500, to: 10000, currency: "$" },
		options: {
			info1: "Principal included at maturity",
			info2: "Earning on Calendar Days",
		},
	},
];

export const miningPackages = [
	{
		id: 1,
		title: "Bronze plan",
		percentage: 10,
		percentSymbol: "%",
		time: "daily for 3 days",
		rate: { from: 200, to: 900, currency: "$" },
		options: {
			info1: "10000 GH/s Hash Power",
			info2: "24/7 Customer Service",
		},
	},
	{
		id: 2,
		title: "silver plan",
		percentage: 20,
		percentSymbol: "%",
		time: "daily for 3 days",
		rate: { from: 1000, to: 5900, currency: "$" },
		options: {
			info1: "10000 GH/s Hash Power",
			info2: "24/7 Customer Service",
		},
	},
	{
		id: 3,
		title: "gold plan",
		percentage: 33,
		percentSymbol: "%",
		time: "daily for 5 days",
		rate: { from: 6000, to: 500000, currency: "$" },
		options: {
			info1: "10000 GH/s Hash Power",
			info2: "24/7 Customer Service",
		},
	},
	{
		id: 4,
		title: "fixed deposit",
		percentage: 45,
		percentSymbol: "%",
		time: "daily for 30 days",
		rate: { from: 1500, to: 10000, currency: "$" },
		options: {
			info1: "10000 GH/s Hash Power",
			info2: "24/7 Customer Service",
		},
	},
];

import React from "react";

const Coins = ({ data }) => {
	const {
		image,
		name,
		symbol,
		current_price,
		total_volume,
		market_cap,
		price_change_percentage_24h,
	} = data;
	const priceChange = price_change_percentage_24h;
	const volume = total_volume;
	const marketcap = market_cap;

	const price = current_price;

	return (
		<div className="coin-container">
			<div className="coin-row">
				<div className="coin">
					<img src={image} alt="crypto" className="" />
					<h1>{name}</h1>
					<div className="coin-symbol">{symbol}</div>
				</div>
				<div className="coin-data">
					<p className="coin-price">{price}</p>
					<p className="coin-volume">{volume.toLocaleString()}</p>
					{priceChange < 0 ? (
						<p className="coin-percent red">{priceChange.toFixed(2)}%</p>
					) : (
						<p className="coin-percent green">{priceChange.toFixed(2)}%</p>
					)}
					<p className="coin-market-cap">
						Mkt Cap: {marketcap.toLocaleString()}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Coins;

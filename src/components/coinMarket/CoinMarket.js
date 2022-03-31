import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Coins from "./coins/Coins";
import "./coins.css";
const link =
	"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
const CoinMarket = () => {
	const [coins, setCoins] = useState([]);
	useEffect(() => {
		axios
			.get(link)
			.then((res) => {
				setCoins(res.data);
			})
			.catch((err) => console.log(err));
	}, []);
	console.log(coins);
	return (
		<div className="coin-market">
			{coins.map((item) => (
				<Coins data={item} key={item.id} />
			))}
		</div>
	);
};

export default CoinMarket;

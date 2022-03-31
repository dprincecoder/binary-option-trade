import React from "react";
import "./patners.css";
const Patners = () => {
	return (
		<div className="patners">
			<marquee behavior="scroll" direction="left">
				<div className="imgs">
					<img src="assets/btc-logo.jpeg" alt="btc" className="marquee-img" />
					<img src="assets/eth.png" alt="ethereum" className="marquee-img" />
					<img src="assets/peftmoni.jpeg" alt="perfect-money" className="marquee-img" />
					<img src="assets/pay.png" alt="payeer" className="marquee-img" />
					<img src="assets/btc-cash.png" alt="bitcoin-cash" className="marquee-img" />
					<img src="assets/dogecoin.png" alt="doge coin" className="marquee-img" />
					<img src="assets/bnb.png" alt="binance coin" className="marquee-img" />
					<img src="assets/tether.png" alt="tether" className="marquee-img" />
					<img src="assets/sol.png" alt="solana" className="marquee-img" />
					<img src="assets/ripple.jpeg" alt="ripple" className="marquee-img" />
				</div>
			</marquee>
		</div>
	);
};

export default Patners;

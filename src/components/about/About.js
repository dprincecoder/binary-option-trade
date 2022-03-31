import React from "react";
import "./about.css";
import GppGoodIcon from "@mui/icons-material/GppGood";

const About = () => {
	return (
		<div className="about">
			<div className="about-grid">
				<div className="about-right">
					<div className="about-right-details">
						<div className="about-right-details-fl">
							<h1>About Us</h1>
							<div className="about-right-detail-fl"></div>
						</div>
						<h2>We are making beautiful impact revolution to your finance</h2>
						<p>
							Get 100% Of Your First Deposit On Your Welcome Bonus When You
							Invest With Bitcoin Cypto. We Offer Trade On Forex, Stocks,
							Commodities, Crypto. You need not to worry about site design and
							other technial issue. We provide these attractive service as a
							bonus. Let's have a talk together for your next investment.
						</p>
					</div>
					<div className="about-right-trust">
						<div className="about-right-trust-left">
							<div className="about-right-trust-left-icon">
								<GppGoodIcon />{" "}
								<span className="about-right-trust-left-icon-span">
									24/7 Customer support
								</span>
							</div>
							<div className="about-right-trust-left-icon">
								<GppGoodIcon />{" "}
								<span className="about-right-trust-left-icon-span">
									Cross browser compatiabilty
								</span>
							</div>
							<div className="about-right-trust-left-icon">
								<GppGoodIcon />{" "}
								<span className="about-right-trust-left-icon-span">
									Experts on what we do
								</span>
							</div>
						</div>
						<div className="about-right-trust-right">
							<div className="about-right-trust-right-icon">
								<GppGoodIcon />{" "}
								<span className="about-right-trust-right-icon-span">
									Best trading sessions
								</span>
							</div>
							<div className="about-right-trust-right-icon">
								{" "}
								<GppGoodIcon />{" "}
								<span className="about-right-trust-right-icon-span">
									10x return of your Investment
								</span>
							</div>
							<div className="about-right-trust-right-icon">
								<GppGoodIcon />{" "}
								<span className="about-right-trust-right-icon-span">
									Premium services and support
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="about-left">
					<img src="assets/trade.jpg" alt="about" className="about-left-img" />
				</div>
			</div>
		</div>
	);
};

export default About;

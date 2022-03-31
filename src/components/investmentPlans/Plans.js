import React from "react";
import { tradingPackages, miningPackages } from "./packages";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./plans.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
const Plans = () => {
	const { currentUser } = useSelector(mapState);

	return (
		<div className="plans">
			<div className="plans-tl">
				<h1>Investment Packages</h1>
				<div className="plans-tl-btm"></div>
			</div>
			<div className="trading-plans">
				{tradingPackages.map((plan) => {
					const { title, id, percentage, percentSymbol, rate, time, options } =
						plan;
					const { from, to, currency } = rate;
					const { info1, info2 } = options;
					return (
						<div className="trading-plans-card" key={id}>
							<div className="trading-plans-card-top-effect"></div>
							<div className="trading-plans-card-wrapper">
								<h3>{title}</h3>
								<div className="percent">
									<div className="percent-no">{percentage}</div> {percentSymbol}
								</div>
								<div className="trading-plan-time-frame">{time}</div>
								<div className="trading-plans-price-list">
									<div className="trading-plans-price-list-span">
										{currency}
										{from}
									</div>
									-
									<div className="trading-plans-price-list-right-span">
										{currency}
										{to}
									</div>
								</div>
								<div className="trading-plans-icons-holder">
									<div className="trading-plans-icon">
										<CheckCircleIcon />
										<span className="trading-plans-icon-span">{info1}</span>
									</div>
									<div className="trading-plans-icon">
										<CheckCircleIcon />
										<span className="trading-plans-icon-span">{info2}</span>
									</div>
								</div>
								{currentUser ? (
									<Link
										to={`/dashboard/user/${
											currentUser ? currentUser.id : "not-found"
										}`}>
										<div className="btn-start">Invest</div>
									</Link>
								) : (
									<Link to="/signup">
										<div className="btn-start">Invest</div>
									</Link>
								)}
							</div>
						</div>
					);
				})}
			</div>
			<div className="plans-tl">
				<h1>Mining Packages</h1>
				<div className="plans-tl-btm"></div>
			</div>
			<div className="mining-plans">
				{miningPackages.map((plan) => {
					const { title, id, percentage, percentSymbol, rate, time, options } =
						plan;
					const { from, to, currency } = rate;
					const { info1, info2 } = options;
					return (
						<div className="mining-plans-card" key={id}>
							<div className="mining-plans-card-top-effect"></div>
							<div className="mining-plans-card-wrapper">
								<h3>{title}</h3>
								<div className="percent">
									<div className="percent-no">{percentage}</div> {percentSymbol}
								</div>
								<div className="mining-plan-time-frame">{time}</div>
								<div className="mining-plans-price-list">
									<div className="mining-plans-price-list-span">
										{currency}
										{from}
									</div>
									-
									<div className="mining-plans-price-list-right-span">
										{currency}
										{to}
									</div>
								</div>
								<div className="mining-plans-icons-holder">
									<div className="mining-plans-icon">
										<CheckCircleIcon />
										<span className="mining-plans-icon-span">{info1}</span>
									</div>
									<div className="mining-plans-icon">
										<CheckCircleIcon />
										<span className="mining-plans-icon-span">{info2}</span>
									</div>
								</div>
								{currentUser ? (
									<Link
										to={`/dashboard/user/${
											currentUser ? currentUser.id : "not-found"
										}`}>
										<div className="btn-start">Invest</div>
									</Link>
								) : (
									<Link to="/signup">
										<div className="btn-start">Invest</div>
									</Link>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Plans;

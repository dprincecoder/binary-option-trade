import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Typical from "react-typical";
import "./header.css";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const Header = () => {
	const { currentUser } = useSelector(mapState);
	// const { userId, uid } = currentUser || null;
	// const userMainId = userId || uid;
	// const dispatch = useDispatch();

	return (
		<div className="hero">
			<div className="hero-grid">
				<div className="hero-left">
					<Typical
						steps={[
							"Secure",
							1000,
							"Smart",
							1000,
							"Effortless",
							1000,
							"Guarantee",
							1000,
						]}
						loop={Infinity}
						wrapper="b"
					/>
					<h1>Cryptocurrency Investment Platform</h1>
					<p>
						Invest in a Bundle of the top cryptocurrencies, Bitcoin, Ethereum
						and more. <b>binaryoptiontrading.org</b> is one of the stop roof for
						investors who which to create passive income in crypto markets
						without exposing towards any master skills. At{" "}
						<b>binaryoptiontrading.org</b> we trust in keeping things simple,
						steady, and transparent. Experience the best at{" "}
						<b>binaryoptiontrade.org</b> and thank us later.
					</p>
					<div className="hero-left-details">
						{!currentUser && (
							<Link to="/login">
								<h3 className="hero-left-login">Login</h3>
							</Link>
						)}
						<div className="hero-left-start">
							{currentUser ? (
								<Link
									to={`/dashboard/user/${currentUser ? currentUser.id : ""}`}>
									<h3>Start Trading</h3>
								</Link>
							) : (
								<Link to="/signup">
									<h3>Get Started</h3>
								</Link>
							)}
						</div>
					</div>
				</div>
				<div className="hero-right">
					<img src="assets/btc.jpg" alt="cypto" className="hero-right-img" />
				</div>
			</div>
		</div>
	);
};

export default Header;

import React from "react";
import "./footer.css";
const Footer = () => {
	return (
		<div className="footer">
			<div className="footer-items">
				<div className="footer-grid">
					<div className="footer-grid-items img-wrapper">
						<img src="assets/logo.jpg" alt="footer" className="footer-img" />
					</div>
					<div className="footer-grid-items footer-about">
						<h2>About</h2>
						<ul className="footer-list">
							<li className="footer-list-item">About</li>
							<li className="footer-list-item">Affliate</li>
							<li className="footer-list-item">Support</li>
							<li className="footer-list-item">Contact Us</li>
						</ul>
					</div>
					<div className="footer-grid-items quick-links">
						<h2>Quick Links</h2>
						<ul className="footer-list">
							<li className="footer-list-item">The News</li>
							<li className="footer-list-item">FAQs</li>
							<li className="footer-list-item">Privacy Policy</li>
							<li className="footer-list-item">Terms & Conditions</li>
						</ul>
					</div>
					<div className="footer-grid-items contact">
						<h2>Contact Info</h2>
						<ul className="footer-list">
							<li className="footer-list-item">
								Address:{" "}
								<small>
									1800 W Hillcrest Dr Newbury Park, California(CA), 91320
								</small>
							</li>
							<li className="footer-list-item">
								Email:{" "}
								<small>
									<a href="mailto:Kelvinwilliam9680@gmail.com" className="mail">
										Contact@binaryoptionstrading.com
									</a>
								</small>
							</li>
						</ul>
					</div>
				</div>
				<div className="footer-year">
					<p>All Right Reserved © 2022 | Binary Options</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;

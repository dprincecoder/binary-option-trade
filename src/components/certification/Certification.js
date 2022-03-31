import React from "react";
import "./cert.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Registration = () => {
	return (
		<div className="registration">
			<div className="plans-tl">
				<h1>We are Certified</h1>
				<div className="plans-tl-btm"></div>
			</div>
			<div className="registration-container">
				<div className="registration-grid">
					<div className="registration-left">
						<div className="registration-cert-container">
							<img
								src="assets/cert.jpg"
								alt="registration-cert"
								className="registration-cert"
							/>
						</div>
					</div>
					<div className="registration-Right">
						<p>LEGAL ENTITY REGISTRATION NO: 13187960</p>
						<h1>
							<b>Binary Options</b>
							Limited
                        </h1>
                        <small>

						Binary Options Trading is a certified company based in the United
						State of America (USA), with the business number #13187960. Binary
						Options Trading Company Nature (SIC) is Activities of financial
						services holding companies #54305.
                        </small>
						<div className="verified">
							Entity Verified <CheckCircleIcon />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Registration;

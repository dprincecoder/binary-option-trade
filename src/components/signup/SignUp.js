import React, { useEffect, useState } from "react";
import InputForm from "../../helpers/forms/input/Input";
import ButtonHandler from "../../helpers/forms/button/ButtonHandler";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InputCheckbox from "../../helpers/forms/checkbox/InputCheckbox";
import { Alert, AlertTitle } from "@mui/material";

import "./signup.css";
import Nav from "../header/nav/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	googleSignInStart,
	signUpUserStart,
	userErrorStart,
	userSuccessStart,
} from "../../redux/user/user.actions";
import { NavigateNextTwoTone } from "@mui/icons-material";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
	userError: user.userError,
	userSuccess: user.userSuccess,
});
const SignUp = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentUser, userError, userSuccess } = useSelector(mapState);
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (currentUser) {
			navigate("/");
		}
	}, [currentUser, navigate]);

	useEffect(() => {
		return () => dispatch(userErrorStart({}));
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(userErrorStart({}));
		dispatch(userSuccessStart({}));
		dispatch(
			signUpUserStart({
				fullName,
				username,
				email,
				password,
				confirmPassword,
			})
		);
	};

	const signUpWithGoogle = () => {
		dispatch(userErrorStart({}));
		dispatch(userSuccessStart({}));

		dispatch(googleSignInStart());
	};

	return (
		<div className="signup">
			<Nav />
			<div className="signup-grid">
				<div className="signup-left">
					<p>Great! Let's start your Adventure!</p>
					<h1>Access binaryoptionstrade.com</h1>
					<div className="signup-left-options">
						<div className="signup-left-icon">
							<CheckCircleIcon />
							<span className="signup-left-icon-span">
								Secured Registration Process.
							</span>
						</div>
						<div className="signup-left-icon">
							<CheckCircleIcon />
							<span className="signup-left-icon-span">
								It's free and always will be.
							</span>
						</div>
						<div className="signup-left-icon">
							<CheckCircleIcon />
							<span className="signup-left-icon-span">
								Access binary options from anywhere.
							</span>
						</div>
						<div className="signup-left-icon">
							<CheckCircleIcon />
							<span className="signup-left-icon-span">
								Extraordinary secured Vault.
							</span>
						</div>
						<div className="signup-left-icon">
							<CheckCircleIcon />
							<span className="signup-left-icon-span">
								Unity of valuable determination!
							</span>
						</div>
					</div>
					<Link to="/login">
						<ButtonHandler text="Already Registered?" variant="outlined" />
					</Link>
				</div>
				<div className="signup-Right">
					{userError.length > 0 && (
						<>
							{userError.map((err, index) => (
								<Alert severity="error" key={index}>
									<AlertTitle>{err.title}</AlertTitle>
									{err.message}
								</Alert>
							))}
						</>
					)}
					<form onSubmit={handleSubmit}>
						<div className="signup-right-top">
							<h2 className="signup-details">General Details</h2>
							<div className="signup-right-top-container">
								<InputForm
									label="Full Name"
									type="text"
									handleChange={(e) => setFullName(e.target.value)}
									required
								/>
								<InputForm
									label="Username"
									type="text"
									required
									handleChange={(e) => setUsername(e.target.value)}
								/>
								<InputForm
									label="Email"
									type="email"
									required
									handleChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>
						<div className="signup-right-bottom">
							<h2 className="signup-details"> Security Details</h2>
							<div className="signup-right-bottom-wrapper">
								<InputForm
									label="Password"
									type="password"
									required
									handleChange={(e) => setPassword(e.target.value)}
								/>
								<InputForm
									label="Confirm Password"
									type="password"
									required
									handleChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</div>
						</div>
						<InputCheckbox
							bool={checked}
							label={"I agree to terms & conditions"}
							onCheck={() => setChecked(!checked)}
						/>
						<div className="signup-btn">
							<ButtonHandler
								text="Signup"
								variant="contained"
								type="submit"
								disabled={!checked || !fullName}
							/>
							<ButtonHandler
								text="continue with Google"
								variant="standard"
								disabled={!checked || fullName}
								onClick={signUpWithGoogle}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;

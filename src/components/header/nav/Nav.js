import React, { useState } from "react";
import "./nav.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserStart } from "../../../redux/user/user.actions";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
const Nav = () => {
	const dispatch = useDispatch();
	const [toggle, setToggle] = useState(false);
	const { currentUser } = useSelector(mapState);

	const logoutUser = () => {
		dispatch(signOutUserStart());
	};
	return (
		<div className={`nav ${toggle ? "active" : ""}`}>
			{currentUser?.userRoles?.includes("admin") && (
				<div className="my-admin-nav">
					<Link to="/admin/manage-users">my admin</Link>
				</div>
			)}
			<div className="nav-items">
				<Link to="/" className="nav-logo">
					<h1>Binary</h1>
					<div>
						<h2 className="sml-txt">Options trade</h2>
					</div>
				</Link>
				<ul className="nav-ul">
					<Link to="/" className="nav-list active">
						Home
					</Link>
					<Link to="/contact" className="nav-list active">
						Contact us
					</Link>
					{!currentUser && (
						<Link to="/login" className="nav-list active login">
							Login
						</Link>
					)}
					{currentUser ? (
						<div className="register" onClick={logoutUser}>
							<li className="nav-lis ">Logout</li>
						</div>
					) : (
						<Link to="/signup" className="register">
							<li className="nav-lis ">Get Started</li>
						</Link>
					)}
				</ul>
				<div className="bar" onClick={() => setToggle(!toggle)}>
					<MenuIcon />
				</div>
			</div>
		</div>
	);
};

export default Nav;

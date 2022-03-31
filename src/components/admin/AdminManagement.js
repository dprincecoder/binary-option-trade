import React from "react";
import "./admin.css";
import ButtonHandler from "../../helpers/forms/button/ButtonHandler";
import Nav from "../header/nav/Nav";
import {
	AdminPanelSettings,
	CallToAction,
	Group,
	NotAccessibleOutlined,
	TipsAndUpdates,
} from "@mui/icons-material";

const AdminManagement = () => {
	return (
		<div className="admin">
			<Nav />
			<div className="admin-panel">
				<div className="leftbar">
					<h1 className="leftbar-title">Admin Panel</h1>
					<div className="leftbar-wrapper">
						<h3 className="leftbar-wrapper-title">
							User Management Tips <TipsAndUpdates className="tipicon" />
						</h3>
						<ul className="leftbar-list">
							<li className="leftbar-list-item">
								All registered users will be shown here
							</li>
							<li className="leftbar-list-item">Manage users</li>
							<li className="leftbar-list-item">Delete users</li>
							<li className="leftbar-list-item">Block users</li>
							<li className="leftbar-list-item">
								See users investment history
							</li>
						</ul>
					</div>
				</div>
				<div className="rightbar">
					<div className="right-cover">
						<h2 className="rightbar-title">
							Admin Welcome <AdminPanelSettings style={{ color: "green" }} />
						</h2>
						<h3 className="rightbar-title">
							Actions <NotAccessibleOutlined style={{ color: "red" }} />
						</h3>
					</div>
					<div className="rightbar-wrapper">
						<div className="rightbar-wrappercon">
							<h3 className="right-wrapper-title">
								Users <Group style={{ color: "gold" }} />{" "}
							</h3>
							<div className=""></div>
						</div>
						{[1, 2, 3].map((itm, id) => (
							<div className="rightbar-user-container" key={id}>
								<div className="user-details-wrapper">
									<div className="user-image-wrapper">
										<img
											src="/assets/bg-trade.jpg"
											alt="user avatar"
											className="userimg"
										/>
									</div>
									<div className="username-wrapper">
										<h2>Client 1</h2>
										<p>IP: (1324.5687.90)</p>
										<p>Location: (United States)</p>
									</div>
								</div>
								<div className="usermore-action-btn">
									<div className="user-investment-details">
										<div className="user-investment-details-amount">
											<h4>Amount invested up to date</h4>
											<h3>$50,000</h3>
										</div>
										<div className="user-investment-details-coins">
											<h4>All Coins</h4>
											<div className="coins-wrapper">
												<p>0.5 (btc)</p>
												<p>0.02 (eth)</p>
												<p>1.6 (usdt)</p>
											</div>
										</div>
									</div>
									<div className="usermore-action-delete-btn">
										<ButtonHandler
											text="Delete User"
											variant="contained"
											themeColor="error"
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminManagement;

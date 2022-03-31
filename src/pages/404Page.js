import React from "react";
import Nav from "../components/header/nav/Nav";

const PageNotFound = () => {
	return (
		<>
			<Nav />
			<div id="wrapper">
				<img
					src="	https://miro.medium.com/max/1400/1*DeBkx8vjbumpCO-ZkPE9Cw.png"
					alt="oh crap 404"
				/>
				<div id="info" style={{ textAlign: "center" }}>
					<h2>Page not found</h2>
				</div>
			</div>
		</>
	);
};

export default PageNotFound;

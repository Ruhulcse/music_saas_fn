import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ scrollY }) {
	return (
		<header id="header" className={`${scrollY >= 80 ? "fixed" : ""}`}>
			<div className="row ">
				<div className="container">
					<div className="header-wrapper">
						<div className="main-header-logo">
							<Link to="/">
								<img src="images/logo.png" alt="logo" />
							</Link>
						</div>
						<div className="header-button">
							<Link to="/" className="aibeat-button">
								Contact Us
							</Link>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

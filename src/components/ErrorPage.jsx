import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ErrorPage() {
	const navigate = useNavigate();
	return (
		<div className="error-404 not-found container">
			<div id="content-area">
				<small className="sections-title">
					<strong>404</strong> ERROR
				</small>
				<h2 className="main-title section-para">
					Hey there mate! Your lost treasure is not found here...
				</h2>
				<p className="grve-subtitle section-para">
					Sorry! The page you are looking for wasn't found!
				</p>
			</div>
			<br />
			<div className="content-element">
				<Link to="/" className="aibeat-button pink-button">
					HOME
				</Link>

				<button
					onClick={() => {
						navigate("/", { replace: true });
					}}
					className="aibeat-button pink-button"
				>
					HOME
				</button>
			</div>
		</div>
	);
}

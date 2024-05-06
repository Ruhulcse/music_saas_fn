import React from "react";
import { useNavigate } from "react-router-dom";
import FillButton from "./FillButton";

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
				<FillButton
					onClick={() => {
						navigate("/", { replace: true });
						window.location.reload();
					}}
				>
					HOME
				</FillButton>
			</div>
		</div>
	);
}

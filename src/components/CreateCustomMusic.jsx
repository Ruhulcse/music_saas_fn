import React from "react";
import FillButton from "./FillButton";

export default function CreateCustomMusic({ title, description, button: { name, action } }) {
	return (
		<>
			<div className="banner-section-wrapper">
				<div className="banner-section-content">
					<h2 className="sections-title">{title}</h2>
				</div>
				<div className="banner-section-para">
					<p className="section-para">{description}</p>
				</div>
			</div>
			<div className="section-button">
				<FillButton onClick={action}>{name}</FillButton>
			</div>
		</>
	);
}

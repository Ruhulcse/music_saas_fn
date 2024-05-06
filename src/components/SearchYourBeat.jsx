import React from "react";

export default function SearchYourBeat({ title, onSubmit, inputText, inputSubmit }) {
	return (
		<div className="banner-box">
			<div className="banner-box-content">
				<div className="banner-box-heading">
					<h3>{title}</h3>
				</div>
				<div className="banner-box-input">
					<div className="banner_box_input">
						<form onSubmit={onSubmit}>
							<div className="banner-input-wrapper">
								<input {...inputText} />
								<div className="banner-input-submit">
									<input {...inputSubmit} />
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

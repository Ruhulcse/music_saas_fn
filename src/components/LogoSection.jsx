import React from "react";

export default function LogoSection({ logoSection }) {
	const icons = logoSection.map((icon) => (
		<li className="logo-image-1 logo_list-images">
			<a onClick={icon?.navigate} style={{ cursor: "pointer" }}>
				<img {...icon?.image} />
			</a>
		</li>
	));
	return (
		<>
			<section className="logo-section">
				<div className="row">
					<div className="container">
						<div className="logo-container">
							<div className="logo-images">
								<ul className="logo-list">{icons}</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

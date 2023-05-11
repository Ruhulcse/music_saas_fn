import React from "react";

export default function AboutSection({ image, about: { title, paras } }) {
	const paragraph = paras.map((para) => (
		<React.Fragment key={para.id}>
			<p className="section-para">{para.text}</p>
		</React.Fragment>
	));
	return (
		<section className="about-section">
			<div className="row">
				<div className="container">
					<div className="about-container">
						<div className="about-wrapper">
							<div className="about-section-img-container colamu-6">
								<div className="about-section-heading section-mobile-con">
									<h2 className="sections-title small-section-title section-mobile">
										{title}
									</h2>
								</div>
								<div className="about-section-img">
									<img {...image} />
								</div>
							</div>
							<div className="about-section-content-container colamu-6">
								<div className="about-section-content-wrapper">
									<div className="about-section-heading">
										<h2 className="sections-title small-section-title section-desktop">
											{title}
										</h2>
									</div>
									<div className="about-section-para">{paragraph}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

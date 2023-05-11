import React from "react";

export default function Top10Beats({ title, top10 }) {
	const top10Contents = top10.map((item) => (
		<div key={item?.id} className={`beats-gallery-box${item?.id} beats-gallery-box`}>
			<div className={`beats-gallery-img${item?.id} beats-gallery-img`}>
				<img {...item.image} style={{ cursor: "pointer" }} />
			</div>
			<div className={`gallery-content-box${item?.id} gallery-content-box`}>
				<p className="section-para">{item?.title}</p>
			</div>
		</div>
	));
	return (
		<section className="beats-section">
			<div className="row">
				<div className="container">
					<div className="beats-section-inner-wrapper">
						<div className="beats-heading-container">
							<div className="beats-heading">
								<h2 className="sections-title">{title}</h2>
							</div>
						</div>
						<div className="beats-gallery-container">
							<div className="beats-gallery-wrapper">{top10Contents}</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

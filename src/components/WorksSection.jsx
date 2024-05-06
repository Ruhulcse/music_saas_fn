import React from "react";
import { Link } from "react-router-dom";

export default function WorksSection({ title, navigate, works }) {
	const worksContents = works.map((work, i) => (
		<React.Fragment key={work?.id}>
			<div
				className={`works-box works-box-${work?.id} ${
					works.length - 1 === i ? "" : "works-before-img"
				} `}
			>
				<div className="works-box-inner">
					<div className="works-box-img">
						<img {...work?.image} />
					</div>
					<div className="works-box-content">
						<div className="works-box-heading">
							<h3>{work?.title}</h3>
						</div>
						<div className="works-box-para">
							<p className="section-para">{work?.description}</p>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	));
	return (
		<section className="works-section">
			<div className="row">
				<div className="container">
					<div className="works-heading-container">
						<div className="works-heading">
							<h2 className="small-section-title sections-title">{title}</h2>
						</div>
					</div>
					<div className="works-box-container">
						<div className="works-box-wrapper">{worksContents}</div>
					</div>
					<div className="works-section-button">
						<div className="works-button-container">
							<Link to={navigate} className="aibeat-button">
								Create Yours Now!
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

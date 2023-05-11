import React from "react";
import FillButton from "./FillButton";

export default function CreateSection({ image, title, description, button }) {
	return (
		<section className="create-section">
			<div className="row">
				<div className="container">
					<div className="create-inner-conatainer">
						<div className="create-inner-wrapper">
							<div className="create-img-conatiner">
								<img {...image} />
							</div>
							<div className="create-content-container">
								<div className="create-content-wrapper">
									<div className="create-content-heading">
										<h2 className="sections-title">{title}</h2>
									</div>
									<div className="create-content-para">
										<p className="section-para">{description}</p>
									</div>
									<div className="create-section-button">
										<div className="create-button">
											{/* <a href="#" className="aibeat-button pink-button">
												Create Yours Now!
											</a> */}
											<FillButton
												type={button?.type}
												onClick={button?.action}
											>
												{button?.title}
											</FillButton>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

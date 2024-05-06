import React from "react";
import CreateCustomMusic from "./CreateCustomMusic";
import SearchYourBeat from "./SearchYourBeat";

export default function BannerSection({ createCustomMusic, searchYourBeat }) {
	return (
		<section className="banner-section">
			<div className="row">
				<div className="container">
					<div className="banner-main-container colamu-6">
						<CreateCustomMusic {...createCustomMusic} />
						<SearchYourBeat {...searchYourBeat} />
					</div>
				</div>
			</div>
		</section>
	);
}

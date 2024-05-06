import React from "react";

export default function SubscriptionCard({ subscription, subscriptionHandle }) {
	const subscriptionContent = subscription?.map((item) => (
		<div key={item?._id} className="wrapper">
			<div className="table basic" style={{ backgroundColor: "#f1f1f1" }}>
				<div>
					<div className="aj_p">{item?.name}</div>
				</div>
				<div>
					<p>{item?.description}</p>
				</div>
				<div className="price-section">
					<div className="price-area">
						<div className="inner-area">
							<span className="price">${item?.price}</span>
						</div>
					</div>
				</div>

				<div className="package-name"></div>
				<ul className="features">
					<div>
						<button type="button" onClick={() => subscriptionHandle(item)}>
							Subscribe
						</button>
					</div>
				</ul>
			</div>
		</div>
	));
	return (
		<section id="subscription">
			<div className="works-heading-container">
				<div className="works-heading">
					<h2
						className="small-section-title sections-title"
						style={{
							textAlign: "center",
						}}
					>
						<strong>Subscription</strong>
					</h2>
				</div>
			</div>
			<div className="subscription">
				{subscriptionContent}
				<br />
				<br />
			</div>
		</section>
	);
}

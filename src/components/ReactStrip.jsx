import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const ReactStrip = () => {
	const [item, setItem] = useState();

	useEffect(() => {
		if (localStorage.getItem("item")) {
			const itemData = JSON.parse(localStorage.getItem("item"));
			setItem(itemData);
		}
	}, []);

	return (
		<section style={{ height: "100vh", display: "flex" }}>
			<div
				className="banner-main-container colamu-6"
				style={{
					backgroundColor: "white",
					padding: 25,
					margin: 25,
					borderRadius: 20,
					display: "flex",
				}}
			>
				{item && (
					<div key={item?._id} className="wrapper">
						<div
							className="table basic"
							style={{ backgroundColor: "#f1f1f1", padding: 30 }}
						>
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
						</div>
					</div>
				)}
			</div>
			<div
				className="banner-main-container colamu-6"
				style={{
					backgroundColor: "white",
					padding: "30px",
					margin: 25,
					borderRadius: 20,
					display: "flex",
					// alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div style={{ width: "100%" }}>
					<Elements stripe={stripePromise}>
						<CheckoutForm />
					</Elements>
				</div>
			</div>
		</section>
	);
};

export default ReactStrip;

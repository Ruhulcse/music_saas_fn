import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import "../static/css/index.css";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const ReactStrip = () => {
	const location = useLocation();

	console.log({ location });

	const options = {
		mode: "payment",
		amount: 20,
		currency: "usd",
	};
	return (
		<section>
			<div
				style={{ height: "70vh", backgroundColor: "white", padding: "40px" }}
				className="banner-main-container colamu-6"
			>
				<div key={location.state?._id} className="wrapper">
					<div className="table basic" style={{ backgroundColor: "#f1f1f1" }}>
						<div>
							<div className="aj_p">{location.state?.name}</div>
						</div>
						<div>
							<p>{location.state?.description}</p>
						</div>
						<div className="price-section">
							<div className="price-area">
								<div className="inner-area">
									<span className="price">${location.state?.price}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				style={{ height: "70vh", backgroundColor: "white", padding: "40px" }}
				className="banner-main-container colamu-6"
			>
				<Elements stripe={stripePromise} options={options}>
					<CheckoutForm />
				</Elements>
			</div>
		</section>
	);
};

export default ReactStrip;

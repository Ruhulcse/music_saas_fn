import {
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosServices from "../utils/axiosServices";
const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "black" },
			"::placeholder": { color: "black" },
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "black",
		},
	},
};
export default function CheckoutForm() {
	// collect data from the user
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [priceId, setPriceId] = useState("");
	const navigate = useNavigate();
	// stripe items
	const stripe = useStripe();
	const elements = useElements();

	// main function
	const createSubscription = async (e) => {
		e.preventDefault();
		try {
			// // create a payment method
			const paymentMethod = await stripe?.createPaymentMethod({
				type: "card",
				card: elements?.getElement(CardCvcElement, CardExpiryElement, CardNumberElement),
				billing_details: {
					name,
					email,
				},
			});

			// console.log("paymentMethod error", paymentMethod?.error);
			// console.log("paymentMethod", paymentMethod?.paymentMethod);

			// call the backend to create subscription
			const response = await axiosServices.post("/create_subscription", {
				paymentMethod: paymentMethod?.paymentMethod?.id,
				name,
				email,
				priceId,
			});

			if (!stripe || !elements) {
				// Stripe.js hasn't yet loaded.
				// Make sure to disable form submission until Stripe.js has loaded.
				return;
			}

			const { error } = await stripe.confirmPayment({
				elements,
				confirmParams: {
					// Make sure to change this to your payment completion page
					return_url: "http://localhost:3000",
				},
			});
			if (error) {
				toast("Something wrong. Please try again.");
			}
		} catch (error) {
			toast(error.message);
		}
	};

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		const item = JSON.parse(localStorage.getItem("item"));

		if (user && item) {
			setEmail(user.email);
			setName(user.name);
			setPriceId(item.api_id);
		} else {
			navigate("/login");
		}
	}, []);

	return (
		<div style={{ width: "100%" }}>
			<form onSubmit={createSubscription}>
				{/* <LinkAuthenticationElement  onChange={(e) => setEmail(e.target.value)} /> */}
				Or
				<br />
				<br />
				{/* <PaymentElement /> */}
				{/* <CardElement
					id="card-element"
					options={{
						style: {
							base: {
								fontSize: "16px",
								color: "#424770",
								"::placeholder": {
									color: "#aab7c4",
								},
							},
							invalid: {
								color: "#9e2146",
							},
						},
					}}
				/> */}
				<fieldset className="FormGroup">
					<div className="FormRow">
						<CardNumberElement />
					</div>
				</fieldset>
				<fieldset className="FormGroup">
					<div className="FormRow">
						<CardExpiryElement />
					</div>
				</fieldset>
				<fieldset className="FormGroup">
					<div className="FormRow">
						<CardCvcElement />
					</div>
				</fieldset>
				<button disabled={!stripe}>Submit</button>
			</form>
		</div>
	);
}

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosServices from "../utils/axiosServices";
export default function CheckoutForm() {
	// collect data from the user
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [priceId, setPriceId] = useState("");
	const navigate = useNavigate();
	// stripe items
	const stripe = useStripe();
	const elements = useElements();
	const [errorMessage, setErrorMessage] = useState();
	const [loading, setLoading] = useState(false);

	const handleError = (error) => {
		setLoading(false);
		setErrorMessage(error.message);
	};

	// main function
	const createSubscription = async (event) => {
		try {
			event.preventDefault();
			if (!stripe) {
				// Stripe.js hasn't yet loaded.
				// Make sure to disable form submission until Stripe.js has loaded.
				return;
			}
			setLoading(true);
			// Trigger form validation and wallet collection
			const { error: submitError } = await elements.submit();
			if (submitError) {
				handleError(submitError);
				return;
			}

			// call the backend to create subscription
			const response = await axiosServices.post("/create_subscription", {
				paymentMethod: paymentMethod?.paymentMethod?.id,
				name,
				email,
				priceId,
			});

			const confirmPayment = await stripe?.confirmPayment({
				elements,
				clientSecret,
				confirmParams: {
					return_url: "https://example.com/order/123/complete",
				},
			});

			if (confirmPayment?.error) {
				alert(confirmPayment.error.message);
			} else {
				alert("Success! Check your email for the invoice.");
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));

		if (user) {
			setEmail(user.email);
			setName(user.name);
		} else {
			navigate("/login");
		}
	}, []);

	return (
		<div>
			<form onSubmit={createSubscription}>
				<PaymentElement />
				<br />
				<br />
				<br />
				<br />

				<button type="submit" disabled={!stripe}>
					Subscribe
				</button>
			</form>
		</div>
	);
}

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
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

	// main function
	const createSubscription = async () => {
		try {
			// create a payment method
			const paymentMethod = await stripe?.createPaymentMethod({
				type: "card",
				card: elements?.getElement(CardElement),
				billing_details: {
					name,
					email,
				},
			});

			console.log("paymentMethod error", paymentMethod?.error);
			console.log("paymentMethod", paymentMethod?.paymentMethod);

			// call the backend to create subscription
			const response = await axiosServices.post("/create_subscription", {
				paymentMethod: paymentMethod?.paymentMethod?.id,
				name,
				email,
				priceId,
			});

			const confirmPayment = await stripe?.confirmCardPayment(
				response.data.data.clientSecret,
			);

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
			<CardElement />

			<button onClick={createSubscription} disabled={!stripe}>
				Submit
			</button>
		</div>
	);
}

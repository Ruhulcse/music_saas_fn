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
import { styled } from "styled-components";
import { ReactComponent as Generic } from "../static/images/generic.svg";
import { ReactComponent as Mastercard } from "../static/images/mastercard.svg";
import { ReactComponent as Paypal } from "../static/images/paypal.svg";
import { ReactComponent as Visa } from "../static/images/visa.svg";
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
	const createSubscription = async (e) => {
		e.preventDefault();
		try {
			// create a payment method
			const paymentMethod = await stripe?.createPaymentMethod({
				type: "card",
				card: elements?.getElement(CardCvcElement, CardExpiryElement, CardNumberElement),
				billing_details: {
					name,
					email,
				},
			});

			if (!stripe || !elements) {
				// Stripe.js hasn't yet loaded.
				// Make sure to disable form submission until Stripe.js has loaded.
				return;
			}

			console.log({ name });

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
				toast("Something wrong. Please try again.");
			} else {
				toast("Subscription Successful.");
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

	const handleChange = (e) => {
		const { value } = e.target;
		setEmail(value);
	};

	return (
		<div style={{ width: "100%" }}>
			<div
				style={{
					marginBottom: 20,
					display: "flex",
					alignItems: "center",
					padding: "10px 15px",
					backgroundColor: "#f1f1f1",
					width: "25%",
					borderRadius: 10,
					cursor: "pointer",
				}}
			>
				<span style={{ fontSize: 25, fontWeight: 500 }}>Card</span>

				<Generic style={{ width: "50%", marginLeft: 10 }} />
			</div>

			<form onSubmit={createSubscription}>
				<div style={{ margin: "0px 0px 5px 15px" }}>Email</div>
				<EmailWrapper>
					<input
						style={{
							margin: 0,
							padding: 0,
							border: "none",
							color: "gray",
							backgroundColor: "transparent",
						}}
						type="email"
						name="email"
						placeholder="Email"
						onChange={handleChange}
					/>
				</EmailWrapper>
				<br />

				<div
					style={{
						margin: "0px 0px 5px 15px",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<div style={{ width: "50%" }}>Card Number</div>
					<div style={{ textAlign: "end", width: "50%" }}>
						<Visa style={{ width: "10%", margin: "0px 3px 0px 3px" }} />
						<Mastercard style={{ width: "10%", margin: "0px 3px 0px 3px" }} />
						<Paypal style={{ width: "10%", margin: "0px 30px 0px 3px" }} />
					</div>
				</div>
				<CardInputWrapper>
					<CardNumberElement
						options={{
							style: {
								base: inputStyle,
							},
						}}
					/>
				</CardInputWrapper>
				<br />

				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<div style={{ width: "100%" }}>
						<div style={{ margin: "0px 0px 5px 15px" }}>MM / YY</div>
						<CardExpiryElementWrapper>
							<CardExpiryElement
								options={{
									style: {
										base: inputStyle,
									},
								}}
							/>
						</CardExpiryElementWrapper>
					</div>
					<div style={{ width: "100%" }}>
						<div style={{ margin: "0px 0px 5px 15px" }}>CVC</div>
						<CardCvcElementWrapper>
							<CardCvcElement
								options={{
									style: {
										base: inputStyle,
									},
								}}
							/>
						</CardCvcElementWrapper>
					</div>
				</div>
				<br />
				<div style={{ textAlign: "center" }}>
					<button type="submit" disabled={!stripe}>
						Pay
					</button>
				</div>
			</form>
		</div>
	);
}

const EmailWrapper = styled.div`
	border: 1px solid gray;
	border-radius: 25px;
	padding: 0px 15px;
	color: gray;
	fontweight: 500;
	input:-internal-autofill-selected,
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active,
	textarea:-webkit-autofill,
	textarea:-webkit-autofill:hover,
	textarea:-webkit-autofill:focus,
	textarea:-webkit-autofill:active,
	select:-webkit-autofill,
	select:-webkit-autofill:hover,
	select:-webkit-autofill:focus,
	select:-webkit-autofill:active {
		-webkit-box-shadow: 0 0 0 1000px white inset !important;
		-webkit-background-clip: text !important;
		-webkit-text-fill-color: gray;
	}
	input::selection {
		background-color: #8ab4f8;
		color: white;
	}
`;
const CardInputWrapper = styled.div`
	border: 1px solid gray;
	border-radius: 25px;
	padding: 15px 15px;
	input::selection {
		background-color: #8ab4f8;
		color: white;
	}
`;

const CardExpiryElementWrapper = styled.div`
	border: 1px solid gray;
	border-radius: 25px;
	padding: 15px 15px;
	margin: 0px 5px 0px 0px;
	input::selection {
		background-color: #8ab4f8;
		color: white;
	}
`;
const CardCvcElementWrapper = styled.div`
	border: 1px solid gray;
	border-radius: 25px;
	padding: 15px 15px;
	margin: 0px 0px 0px 5px;
	input::selection {
		background-color: #8ab4f8;
		color: white;
	}
`;

const inputStyle = {
	showIcon: true,
	color: "gray",
	fontWeight: "500",
	fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
	fontSize: "16px",
	fontSmoothing: "antialiased",
	":-webkit-autofill": {
		color: "red",
		backgroundColor: "transparent",
	},
	"::placeholder": {
		color: "gray",
	},
};

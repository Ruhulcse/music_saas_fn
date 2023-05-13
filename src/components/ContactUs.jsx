import React, { useState } from "react";
import { toast } from "react-toastify";
import { contactUs } from "../utils/apiCall";

export default function ContactUs({ ref }) {
	const [form, setForm] = useState({
		fullname: "",
		email: "",
		message: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleSignup = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await contactUs(form);
			if (res.status === 200) {
				toast("Your message sent successfully");
				setIsLoading(false);
				setForm({});
			}
		} catch (e) {
			toast(e.message);
			setIsLoading(false);
		}
	};

	const onChange = (e) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	return (
		<div ref={ref} style={{ justifyContent: "center", display: "flex" }}>
			<div className="banner-main-container colamu-6">
				<h2
					className="small-section-title sections-title"
					style={{
						textAlign: "center",
					}}
				>
					<strong>ContactUs</strong>
				</h2>
				<br />
				<br />
				{/* Signup form */}
				<form onSubmit={(e) => handleSignup(e)}>
					{/* Form fields */}
					<input
						type="text"
						value={form.fullname}
						name="firstname"
						onChange={(e) => onChange(e)}
						placeholder="First name"
						required
					/>

					<br />
					<br />
					<input
						type="email"
						value={form.email}
						name="email"
						onChange={(e) => onChange(e)}
						placeholder="Email"
						required
					/>
					<br />
					<br />
					<textarea
						type=""
						rows={4}
						value={form.message}
						name="message"
						onChange={(e) => onChange(e)}
						placeholder="Message"
						required
					></textarea>
					<br />
					<br />
					{/* Submit button */}
					<button disabled={isLoading} type="submit">
						Submit
					</button>
					<br />
					<br />
				</form>
			</div>
		</div>
	);
}

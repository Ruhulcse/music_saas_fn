// Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../utils/apiCall";

const Signup = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleSignup = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await signup(form);
			if (res.status === 200) {
				toast("SignUp successfully");
				setIsLoading(false);
				setForm({});
				navigate("/login");
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
		<div>
			<section className="banner-section" style={{ height: "100vh" }}>
				<div className="row">
					<div
						className="container"
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<div className="banner-main-container colamu-6">
							<h2
								className="small-section-title sections-title"
								style={{
									textAlign: "center",
								}}
							>
								<strong>Signup</strong>
							</h2>
							<br />
							<br />
							{/* Signup form */}
							<form onSubmit={(e) => handleSignup(e)}>
								{/* Form fields */}
								<input
									type="text"
									value={form.firstname}
									name="firstname"
									onChange={(e) => onChange(e)}
									placeholder="First name"
									required
								/>
								<br />
								<br />
								<input
									type="text"
									value={form.lastname}
									name="lastname"
									onChange={(e) => onChange(e)}
									placeholder="Last name"
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
								<input
									type="password"
									value={form.password}
									name="password"
									onChange={(e) => onChange(e)}
									placeholder="Password"
									required
								/>
								<br />
								<br />
								{/* Submit button */}
								<button disabled={isLoading} type="submit">
									Signup
								</button>
							</form>
							{/* Link to login page */}
							<p className="section-para">
								Already have an account?{" "}
								<Link
									to="/login"
									className="section-para"
									style={{ color: "blue" }}
								>
									Login
								</Link>
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Signup;

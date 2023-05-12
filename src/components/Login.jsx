// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginFun } from "../utils/apiCall";

const Login = () => {
	const navigate = useNavigate();
	const [login, setLogin] = useState({
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const handleLogin = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await loginFun(login);
			const { token, ...user } = res.data.data;
			localStorage.setItem("serviceToken", token);
			localStorage.setItem("user", JSON.stringify(user));
			setIsLoading(false);
			setLogin({});
			toast(res.data.message);
			navigate("/");
		} catch (e) {
			toast(e.message);
			setIsLoading(false);
		}
	};

	const onChange = (e) => {
		setLogin((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div style={{ height: "100vh" }}>
			<section className="banner-section">
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
								<strong>Login</strong>
							</h2>
							<br />
							<br />
							{/* Login form */}
							<form onSubmit={(e) => handleLogin(e)}>
								{/* Form fields */}
								<input
									type="email"
									value={login.email}
									name="email"
									onChange={(e) => onChange(e)}
									placeholder="Email"
								/>
								<br />
								<br />
								<input
									type="password"
									value={login.password}
									name="password"
									onChange={(e) => onChange(e)}
									placeholder="Password"
								/>
								{/* Submit button */}
								<br />
								<br />
								<button disabled={isLoading} type="submit">
									Login
								</button>
							</form>
							{/* Link to signup page */}
							<p className="section-para">
								Don't have an account?{" "}
								<Link
									to="/signup"
									className="section-para"
									style={{ color: "blue" }}
								>
									Signup
								</Link>
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Login;

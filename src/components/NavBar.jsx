import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SubscriptionCard from "../components/SubscriptionCard";
import { getPlan } from "../utils/apiCall";
export default function NavBar({ scrollY }) {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(false);
	const [user, setUser] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [subscription, setSubscription] = useState([]);
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	useEffect(() => {
		const userInfo = localStorage.getItem("user");
		if (userInfo) {
			setUser(JSON.parse(userInfo));
			setIsLogin(true);
		} else {
			setIsLogin(false);
			setUser({});
		}
	}, []);

	const logout = () => {
		localStorage.clear();
		setIsLogin(false);
		navigate("/login");
	};

	let navBae;
	if (localStorage.getItem("user")) {
		navBae = (
			<>
				<Link onClick={logout} className="aibeat-button">
					logout
				</Link>
			</>
		);
	} else {
		navBae = (
			<Link to="/login" className="aibeat-button">
				Login
			</Link>
		);
	}

	useEffect(() => {
		const init = async () => {
			const subscriptionPla = await getPlan();
			setSubscription(subscriptionPla);
		};
		init();
	}, []);

	return (
		<header id="header" className={`${scrollY >= 80 ? "fixed" : ""}`}>
			<div className="row ">
				<div className="container">
					<div className="header-wrapper">
						<div className="main-header-logo">
							<Link to="/">
								<img src="images/logo.png" alt="logo" />
							</Link>
						</div>
						<div className="header-button">
							<Link
								to="/"
								className="aibeat-button"
								style={{ margin: "0px 10px 0px 10px" }}
							>
								Contact Us
							</Link>
							<Link
								onClick={showModal}
								className="aibeat-button"
								style={{ margin: "0px 10px 0px 10px" }}
							>
								Subscription
							</Link>
							{navBae}
						</div>
					</div>
				</div>
			</div>
			<Modal
				title="Subscription"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				width={"90%"}
			>
				<SubscriptionCard subscription={subscription} />
			</Modal>
		</header>
	);
}

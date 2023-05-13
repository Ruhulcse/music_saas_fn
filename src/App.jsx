import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

export default function App({ children }) {
	const [scrollY, setScrollY] = useState(0);
	const contactFormRef = useRef(null);
	useEffect(() => {
		function handleScroll() {
			setScrollY(window.scrollY);
		}

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<>
			<NavBar scrollY={scrollY} />
			{children}
			{/* <ContactUs /> */}
			<Footer />
			<ToastContainer />
			<button
				onClick={scrollToTop}
				id="myBtn"
				title="Go to top"
				style={{ display: scrollY >= 100 ? "flex" : "none" }}
			/>
		</>
	);
}

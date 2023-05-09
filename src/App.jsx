import React, { useEffect, useState } from "react";
import AudioCard from "./components/AudioCard";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import horseAudio from "./easy-lifestyle-137766.mp3";
export default function App({ children }) {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		function handleScroll() {
			setScrollY(window.scrollY);
		}

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
	return (
		<>
			<NavBar scrollY={scrollY} />
			<AudioCard audioUrl={horseAudio} />
			{children}
			<Footer />
			<button
				onClick={scrollToTop}
				id="myBtn"
				title="Go to top"
				style={{ display: scrollY >= 100 ? "flex" : "none" }}
			/>
		</>
	);
}

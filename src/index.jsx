import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./pages/Home";
import Subscription from "./pages/Subscription";
import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ErrorBoundary>
				<App>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/signup" element={<Signup />} />
						<Route exact path="/subscription" element={<Subscription />} />
					</Routes>
				</App>
			</ErrorBoundary>
		</BrowserRouter>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

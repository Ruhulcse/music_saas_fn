import React from "react";
import ErrorPage from "./ErrorPage";

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error, info) {
		console.error(error, info);
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return <ErrorPage />;
		}
		return this.props.children;
	}
}

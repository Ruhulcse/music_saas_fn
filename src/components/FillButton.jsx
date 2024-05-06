import React from "react";

export default function FillButton({ children, ...rest }) {
	return (
		<>
			<button className="aibeat-button pink-button" {...rest}>
				{children}
			</button>
		</>
	);
}

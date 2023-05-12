import React from "react";

const Drawer = ({ isOpen, children }) => {
	return <div className={`drawer ${isOpen ? "open" : ""}`}>{children}</div>;
};

export default Drawer;

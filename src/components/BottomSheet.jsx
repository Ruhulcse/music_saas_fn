import React from "react";

const BottomSheet = ({ isOpen, children }) => {
	return <div className={`bottom-sheet ${isOpen ? "open" : ""}`}>{children}</div>;
};

export default BottomSheet;

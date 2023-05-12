import React, { useState } from "react";
import horseAudio from "../easy-lifestyle-137766.mp3";
import AudioCard from "./AudioCard";
import BottomSheet from "./BottomSheet";
export default function Sample({ children }) {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
	return (
		<div>
			<button onClick={() => setBottomSheetOpen(!bottomSheetOpen)}>
				Toggle Bottom Sheet
			</button>

			<BottomSheet isOpen={bottomSheetOpen}>
				<i class="icon-play"></i>
				<AudioCard audioUrl={horseAudio} />
			</BottomSheet>
		</div>
	);
}

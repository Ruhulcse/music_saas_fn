import React from "react";
import AudioCard from "./AudioCard";

export default function AudioList({ audioList }) {
	let audioContent;

	if (Array.isArray(audioList) && audioList?.length > 0) {
		audioContent = audioList.map((audio) => (
			<div key={audio?.id} id={audio?.id}>
				<AudioCard {...audio} />
			</div>
		));
	}

	return (
		<section className="audio-section" id="waveform">
			{audioContent}
		</section>
	);
}

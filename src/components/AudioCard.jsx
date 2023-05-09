import React, { useCallback, useMemo, useRef } from "react";
import { WaveForm, WaveSurfer } from "wavesurfer-react";

export default function AudioCard({ audioUrl }) {
	const plugins = useMemo(() => {
		return [].filter(Boolean);
	}, []);

	const wavesurferRef = useRef();
	const handleWSMount = useCallback(
		(waveSurfer) => {
			if (waveSurfer.markers) {
				waveSurfer.clearMarkers();
			}

			wavesurferRef.current = waveSurfer;

			if (wavesurferRef.current) {
				wavesurferRef.current.load(audioUrl);
			}
		},
		[audioUrl],
	);

	const play = useCallback(() => {
		wavesurferRef.current.playPause();
	}, []);

	return (
		<div
			style={{
				fontFamily: "sans-serif",
				textAlign: "center",
			}}
		>
			<WaveSurfer plugins={plugins} onMount={handleWSMount}>
				<WaveForm id="waveform" cursorColor="red" />
			</WaveSurfer>
			<button onClick={play}>Play / Pause</button>
		</div>
	);
}

import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import horseAudio from "../easy-lifestyle-137766.mp3";
const Playlist = () => {
	const playlist = [
		horseAudio,
		horseAudio,
		horseAudio,
		// Add more audio URLs here
	];

	const wavesurferRef = useRef(null);
	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

	useEffect(() => {
		// Initialize WaveSurfer when the component mounts

		// Load the initial track
		loadTrack(currentTrackIndex);

		return () => {
			// Clean up WaveSurfer instance when the component unmounts
			wavesurferRef.current.destroy();
		};
	}, [currentTrackIndex]);

	const loadTrack = (index) => {
		wavesurferRef.current = WaveSurfer.create({
			container: "#waveform",
			waveColor: "gray",
			progressColor: "black",
		});
		if (wavesurferRef.current) {
			wavesurferRef.current.load(playlist[index]);
			wavesurferRef.current.on("ready", () => {
				wavesurferRef.current.play();
			});
		}
	};

	const handleTrackChange = (index) => {
		setCurrentTrackIndex(index);
		loadTrack(index);
	};

	const renderPlaylist = () => {
		return playlist.map((track, index) => (
			<div
				key={index}
				onClick={() => handleTrackChange(index)}
				className={index === currentTrackIndex ? "active" : ""}
			>
				{track}
			</div>
		));
	};

	return (
		<div>
			<div id="waveform"></div>
			<div className="playlist">{renderPlaylist()}</div>
		</div>
	);
};

export default Playlist;

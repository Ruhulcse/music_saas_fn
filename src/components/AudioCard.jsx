import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WaveForm, WaveSurfer } from "wavesurfer-react";
import { isUserLogin } from "../utils/helper";
export default function AudioCard({ id, title, description, audio, image }) {
	const navigate = useNavigate();
	const wavesurferRef = useRef();
	const [currentTime, setCurrentTime] = useState(0);
	const [isMuted, setIsMuted] = useState(false);
	const [isPlay, setIsPlay] = useState(false);
	const [totalDuration, setTotalDuration] = useState("");
	const [volume, setVolume] = useState(1);

	const plugins = useMemo(() => {
		return [].filter(Boolean);
	}, []);

	const handleWSMount = useCallback(
		(waveSurfer) => {
			if (waveSurfer.markers) {
				waveSurfer.clearMarkers();
			}

			wavesurferRef.current = waveSurfer;

			if (wavesurferRef.current) {
				wavesurferRef.current.load(audio?.audioUrl, null, "auto");

				wavesurferRef.current.on("ready", () => {
					const durationInSeconds = wavesurferRef.current.getDuration();

					// Convert duration to minutes and seconds
					const minutes = Math.floor(durationInSeconds / 60);
					const seconds = Math.floor(durationInSeconds % 60);

					// Format the duration as "mm:ss"
					const formattedDuration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

					// Update the state with the formatted duration
					setTotalDuration(formattedDuration);
				});
			}
		},
		[audio?.audioUrl],
	);

	const play = useCallback(() => {
		wavesurferRef.current.playPause();
		const playing = wavesurferRef.current.isPlaying();
		handleIsPlaying(playing);
	}, []);

	const handleToggleMute = () => {
		const wavesurfer = wavesurferRef.current;
		const muted = wavesurfer.getMute();

		// Toggle mute status
		wavesurfer.setMute(!muted);
		setIsMuted(!muted);
	};

	const handleVolumeChange = (event) => {
		setVolume(event.target.value);
		const volume = parseFloat(event.target.value);
		wavesurferRef.current.setVolume(volume);
	};

	const handleIsPlaying = (playing) => {
		setIsPlay(playing);
	};

	useEffect(() => {
		const wavesurfer = wavesurferRef.current;
		if (wavesurfer) {
			// Get initial mute status and volume
			setIsMuted(wavesurfer.getMute());
			// setVolume(wavesurfer.getVolume());

			wavesurfer.on("finish", handleFinish);

			wavesurfer.on("audioprocess", handleTimeUpdate);
		}

		return () => {
			wavesurfer.un("finish", handleFinish);
			wavesurfer.un("audioprocess", handleTimeUpdate);
			wavesurfer.destroy();
		};
	}, []);

	const handleTimeUpdate = () => {
		const wavesurfer = wavesurferRef.current;
		const time = wavesurfer.getCurrentTime();
		setCurrentTime(time);
	};

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	const handleFinish = () => {
		setIsPlay(false);
	};

	const handleDownload = (audioFile) => {
		if (isUserLogin()) {
			const downloadUrl = audioFile?.downloadPath;
			const filename = String(title).toLocaleLowerCase().split(" ").join("-") + ".mp3";
			if (!downloadUrl) {
				console.error("Invalid download URL");
				return;
			}
			const link = document.createElement("a");
			link.href = downloadUrl;
			link.download = filename;
			link.click();
		} else {
			navigate("/login");
		}
	};

	return (
		<div className="row" style={{ marginBottom: 20 }}>
			<div className="container">
				<div className="banner-main-container">
					<div className="waveSurfer">
						<div className="audio-info">
							<button
								className={`${isPlay ? "audio-stop" : "audio-play"}`}
								onClick={play}
							/>
							<img className="audio-icon" {...image} />
							<div className="basic-info">
								<p className="title">{title}</p>
								<p className="title_sub">{description}</p>
							</div>
						</div>

						<div className={"waveSurfer__wave " + id}>
							<WaveSurfer key={id} plugins={plugins} onMount={handleWSMount}>
								<WaveForm
									id={`waveform${id}`}
									className="waveform"
									progressColor={"#3b0264"}
									height={50}
									hideCursor={true}
								>
									<canvas ref={wavesurferRef} />
								</WaveForm>
							</WaveSurfer>
						</div>
						<div className="audio-info-right">
							<div className="audio-time" style={{ marginRight: 50 }}>
								{currentTime ? formatTime(currentTime) : totalDuration}
							</div>
							<div className="volume-basic">
								<button
									className={`${isMuted ? "audio-unmute" : "audio-mute"}`}
									onClick={handleToggleMute}
								/>

								<input
									className="volume"
									type="range"
									min="0"
									max={"1"}
									step="0.001"
									value={volume}
									onChange={handleVolumeChange}
								/>
							</div>

							<Button
								style={{ marginLeft: "10px" }}
								onClick={() => handleDownload(audio)}
								size="large"
								icon={<DownloadOutlined style={{ fontSize: "15px" }} />}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

import React, { useEffect, useRef } from "react";

const WaveformGenerator = ({ audioUrl }) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		const width = canvas.width;
		const height = canvas.height;
		const margin = 10;

		// Function to draw the waveform
		const drawWaveform = (audioBuffer) => {
			const data = audioBuffer.getChannelData(0);
			const step = Math.ceil(data.length / width);
			const amp = height / 2 - margin;

			ctx.clearRect(0, 0, width, height);
			ctx.beginPath();
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = 1;

			for (let i = 0; i < width; i++) {
				let min = 1.0;
				let max = -1.0;

				for (let j = 0; j < step; j++) {
					const value = data[i * step + j];
					if (value < min) min = value;
					if (value > max) max = value;
				}

				const x = i;
				const y = (1 + min) * amp + margin;
				const h = Math.max(1, (max - min) * amp);

				ctx.moveTo(x, y);
				ctx.lineTo(x, y + h);
			}

			ctx.stroke();
		};

		// Function to fetch audio file and generate waveform
		const generateWaveform = async () => {
			try {
				const response = await fetch(audioUrl);
				const arrayBuffer = await response.arrayBuffer();

				// Create a new AudioContext
				const ac = new (window.AudioContext || window.webkitAudioContext)();

				// Decode audio data using the Web Audio API
				ac.decodeAudioData(arrayBuffer, function (buffer) {
					// Draw waveform
					drawWaveform(buffer);
				});
			} catch (error) {
				console.error("Error fetching audio file:", error);
			}
		};

		// Call generateWaveform when the component mounts
		generateWaveform();
	}, [audioUrl]);

	return <canvas ref={canvasRef} />;
};

export default WaveformGenerator;

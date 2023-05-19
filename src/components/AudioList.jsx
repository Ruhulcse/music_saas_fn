import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AudioCard from "./AudioCard";

export default function AudioList({ audioList, setAudioList }) {
	const [pagination, setPagination] = useState({
		data: [],
		hasMore: true,
		total: 1,
		max: 9,
	});
	const [isAudioProcess, setIsAudioProcess] = useState(false);

	const handleChange = () => {
		if (audioList.length <= pagination.data.length) {
			setPagination((prev) => ({
				...prev,
				hasMore: false,
			}));
			return;
		} else {
			setTimeout(() => {
				setPagination((prev) => ({
					...prev,
					data: [...prev.data, ...audioList.slice(prev.max, prev.max + 10)],
					max: prev.max + 10,
				}));
			}, 500);
		}
	};

	const handleHasPlaying = (id, isPlay) => {
		setAudioList((prev) =>
			prev.map((el) => {
				if (el.id === id) {
					if (el.wavesurferRef.current.isPlaying()) {
						el.wavesurferRef.current.pause();
						el.isPlaying = false;
					} else {
						el.wavesurferRef.current.play();
						el.isPlaying = isPlay;
					}
				} else {
					el.wavesurferRef.current.pause();
					el.isPlaying = false;
				}
				return el;
			}),
		);
	};

	const onChange = (id, value) => {
		setAudioList((prev) =>
			prev.map((el) => {
				if (el.id === id) {
					el.wavesurferRef.current = value;
				}
				return el;
			}),
		);
	};

	let audioContent;
	if (Array.isArray(audioList) && audioList?.length > 0) {
		audioContent = audioList.map((audio, i) => (
			<div key={audio?.id} id={audio?.id}>
				<AudioCard
					{...audio}
					handleHasPlaying={handleHasPlaying}
					isAudioProcess={isAudioProcess}
					setIsAudioProcess={setIsAudioProcess}
					onChange={onChange}
				/>
			</div>
		));
	}

	return (
		<section className="audio-section">
			{audioList.length > 0 && (
				<InfiniteScroll
					className="scrollbar-hidden"
					dataLength={audioList.length}
					next={handleChange}
					hasMore={false}
					height={500}
					endMessage={
						<p style={{ textAlign: "center", color: "white" }}>
							<b>Yay! You have seen it all</b>
						</p>
					}
				>
					{audioContent}
				</InfiniteScroll>
			)}
		</section>
	);
}

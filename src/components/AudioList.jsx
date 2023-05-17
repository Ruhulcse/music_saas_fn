import React, { useEffect, useState, useRef, useMemo, useCallback, createRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AudioCard from "./AudioCard";

export default function AudioList({ audioList }) {
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
	useEffect(() => {
		if (audioList.length) {
			setPagination((prev) => ({
				...prev,
				total: audioList.length,
				data: [...audioList.slice(0, prev.max)].map((el) => ({
					...el,
					wavesurferRef: createRef(),
				})),
			}));
		} else {
			setPagination((prev) => ({
				...prev,
				total: audioList.length,
				data: [],
			}));
		}
	}, [audioList]);

	const handleHasPlaying = (id, isPlay) => {
		setPagination((prev) => ({
			...prev,
			data: prev.data.map((el) => {
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
		}));
	};

	const onChange = (id, value) => {
		setPagination((prev) => ({
			...prev,
			data: prev.data.map((el) => {
				if (el.id === id) {
					el.wavesurferRef.current = value;
				}
				return el;
			}),
		}));
	};

	let audioContent;
	if (Array.isArray(pagination.data) && pagination.data?.length > 0) {
		audioContent = pagination.data.map((audio, i) => (
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
			{pagination.data.length > 0 && (
				<InfiniteScroll
					className="scrollbar-hidden"
					dataLength={pagination.data.length}
					next={handleChange}
					hasMore={pagination.hasMore}
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

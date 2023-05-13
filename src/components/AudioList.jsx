import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AudioCard from "./AudioCard";

export default function AudioList({ audioList }) {
	const [pagination, setPagination] = useState({
		data: [],
		hasMore: true,
		total: 1,
		max: 9,
	});

	const handleChange = () => {
		console.log("00000000000000000000000", audioList.length <= pagination.data.length);
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
				data: [...audioList.slice(0, prev.max)],
			}));
		}
	}, [audioList]);

	let audioContent;

	if (Array.isArray(pagination.data) && pagination.data?.length > 0) {
		audioContent = pagination.data.map((audio) => (
			<div key={audio?.id} id={audio?.id}>
				<AudioCard {...audio} />
			</div>
		));
	}

	return (
		<section className="audio-section">
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
		</section>
	);
}

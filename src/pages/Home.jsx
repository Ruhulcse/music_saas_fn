import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AboutSection from "../components/AboutSection";
import AudioList from "../components/AudioList";
import BannerSection from "../components/BannerSection";
import CreateSection from "../components/CreateSection";
import LogoSection from "../components/LogoSection";
import SubscriptionCard from "../components/SubscriptionCard";
import Top10Beats from "../components/Top10Beats";
import WorksSection from "../components/WorksSection";
import { default as Icon1, default as Icon5 } from "../static/images/Icon-1.png";
import Icon2 from "../static/images/Icon-2.png";
import Icon3 from "../static/images/Icon-3.png";
import Icon4 from "../static/images/Icon-4.png";
import AboutImage from "../static/images/about-img.png";
import BeatsImage1 from "../static/images/beats-img1.png";
import BeatsImage10 from "../static/images/beats-img10.png";
import BeatsImage2 from "../static/images/beats-img2.png";
import BeatsImage3 from "../static/images/beats-img3.png";
import BeatsImage4 from "../static/images/beats-img4.png";
import BeatsImage5 from "../static/images/beats-img5.png";
import BeatsImage6 from "../static/images/beats-img6.png";
import BeatsImage7 from "../static/images/beats-img7.png";
import BeatsImage8 from "../static/images/beats-img8.png";
import BeatsImage9 from "../static/images/beats-img9.png";
import CreateImg from "../static/images/create-img.png";
import WorkImage1 from "../static/images/works-img1.png";
import WorkImage2 from "../static/images/works-img2.png";
import WorkImage3 from "../static/images/works-img3.png";
import { getPlan, get_music } from "../utils/apiCall";
export default function Home() {
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const [audioList, setAudioList] = useState([]);
	const [subscription, setSubscription] = useState([]);

	// useEffect(() => {
	// 	const init = async () => {
	// 		const music = await get_music(search);
	// 		setAudioList(music);
	// 	};
	// 	if (search) {
	// 		init();
	// 	} else {
	// 		setAudioList([]);
	// 	}
	// }, [search]);

	useEffect(() => {
		const init = async () => {
			const subscriptionPla = await getPlan();
			setSubscription(subscriptionPla);
		};
		init();
	}, []);

	const onSearchHandlerChange = (e) => {
		setSearch(e.target.value);
	};
	const onSearchHandlerSubmit = async (e) => {
		e.preventDefault();
		const music = await get_music(search);
		setAudioList(music);
	};

	const subscriptionHandle = (item) => {
		localStorage.removeItem("item");
		localStorage.setItem("item", JSON.stringify(item));
		navigate("/subscription");
	};

	const createCustomMusic = {
		title: (
			<>
				Create Your <strong>Custom Music With AI</strong>
			</>
		),
		description:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
		button: {
			name: "Create Yours Now!",
			action: (e) => alert("ok"),
		},
	};

	const searchYourBeat = {
		title: "Describe Your Beat",
		onSubmit: onSearchHandlerSubmit,
		inputText: {
			type: "text",
			value: search,
			placeholder: "Search Your Beat Here",
			onChange: onSearchHandlerChange,
		},
		inputSubmit: {
			type: "submit",
		},
	};
	const logoSection = [
		{
			navigate: () => {},
			image: {
				src: Icon1,
				alt: "image1",
			},
		},
		{
			navigate: () => {},
			image: {
				src: Icon2,
				alt: "image2",
			},
		},
		{
			navigate: () => {},
			image: {
				src: Icon3,
				alt: "image3",
			},
		},
		{
			navigate: () => {},
			image: {
				src: Icon4,
				alt: "image4",
			},
		},
		{
			navigate: () => {},
			image: {
				src: Icon5,
				alt: "image5",
			},
		},
	];
	const aboutSection = {
		image: {
			src: AboutImage,
			alt: "About Image",
		},
		about: {
			title: (
				<>
					About <strong>Ai Beats</strong>
				</>
			),
			paras: [
				{
					id: 1,
					text: `Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the
					industry's standard dummy text ever since the 1500s,
					when an unknown printer took a galley of type and
					scrambled it to make a type specimen book.`,
				},
				{
					id: 1,
					text: `It has survived not only five centuries, but also the
					leap into electronic typesetting, remaining essentially
					unchanged. It was popularised in the 1960s with the
					release of Letraset sheets containing Lorem Ipsum
					passages.`,
				},
			],
		},
	};
	const worksSection = {
		title: (
			<>
				How It <strong>Works</strong>
			</>
		),
		navigate: "",
		works: [
			{
				id: 1,
				title: "Select Music Type",
				description:
					"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
				image: {
					src: WorkImage1,
					alt: "work 1",
				},
			},
			{
				id: 2,
				title: "AI Creates The Music				",
				description:
					"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
				image: {
					src: WorkImage2,
					alt: "work 2",
				},
			},
			{
				id: 3,
				title: "Enjoy The Music!",
				description:
					"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
				image: {
					src: WorkImage3,
					alt: "work 3",
				},
			},
		],
	};
	const top10Beats = {
		title: (
			<>
				<strong>Top 10</strong> Beats
			</>
		),
		top10: [
			{
				id: 1,
				title: "The Amen Break",
				image: {
					src: BeatsImage1,
					alt: "Beats Image 1",
				},
			},
			{
				id: 2,
				title: "The Funky Drummer",
				image: {
					src: BeatsImage2,
					alt: "Beats Image 2",
				},
			},
			{
				id: 3,
				title: "Trap",
				image: {
					src: BeatsImage3,
					alt: "Beats Image 3",
				},
			},
			{
				id: 4,
				title: "Dubstep",
				image: {
					src: BeatsImage4,
					alt: "Beats Image 4",
				},
			},
			{
				id: 5,
				title: "Drum And Bass",
				image: {
					src: BeatsImage5,
					alt: "Beats Image 5",
				},
			},
			{
				id: 6,
				title: "Reggaeton",
				image: {
					src: BeatsImage6,
					alt: "Beats Image 6",
				},
			},
			{
				id: 7,
				title: "Deep House",
				image: {
					src: BeatsImage7,
					alt: "Beats Image 7",
				},
			},
			{
				id: 8,
				title: "Techno Beat",
				image: {
					src: BeatsImage8,
					alt: "Beats Image 8",
				},
			},
			{
				id: 9,
				title: "Boom Bap",
				image: {
					src: BeatsImage9,
					alt: "Beats Image 9",
				},
			},
			{
				id: 10,
				title: "Rock Backbeat",
				image: {
					src: BeatsImage10,
					alt: "Beats Image 10",
				},
			},
		],
	};
	const createSection = {
		title: (
			<>
				Let’s <strong>Create Yours!</strong>
			</>
		),
		description: `Lorem Ipsum is simply dummy text of the printing and
		typesetting industry. Lorem Ipsum has been the
		industry's standard dummy text ever since the 1500s.`,
		button: {
			type: "button",
			title: "Create Yours Now!",
			action: () => alert("ok"),
		},
		image: {
			src: CreateImg,
			alr: "Create Img",
		},
	};

	return (
		<main>
			<BannerSection createCustomMusic={createCustomMusic} searchYourBeat={searchYourBeat} />
			<AudioList audioList={audioList} />
			<LogoSection logoSection={logoSection} />
			<AboutSection {...aboutSection} />
			<SubscriptionCard subscription={subscription} subscriptionHandle={subscriptionHandle} />
			<br />
			<br />
			<br />
			<WorksSection {...worksSection} />
			<Top10Beats {...top10Beats} />
			<CreateSection {...createSection} />
		</main>
	);
}

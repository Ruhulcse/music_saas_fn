import axiosServices from "./axiosServices";

export const get_music = async (search) => {
	const res = await axiosServices.get(`/get_music?q=${search}`);
	const mapData = res.data?.data?.tracks?.map((el) => ({
		id: el?.id,
		isPlaying: false,
		title: el?.name,
		description: el?.Artist?.name,
		image: {
			src: el?.image,
			alt: el?.name,
		},
		audio: {
			audioUrl: el?.preview,
			downloadPath: el?.preview,
		},
	}));
	return mapData;
};

export const getPlan = async (search) => {
	const res = await axiosServices.get(`/api/plan`);

	return res.data?.data;
};

export const signup = async (body) => {
	const res = await axiosServices.post(`/register`, body);
	return res;
};
export const loginFun = async (body) => {
	const res = await axiosServices.post(`/login`, body);

	return res;
};

export const contactUs = async (body) => {
	const res = await axiosServices.post(`/contactus`, body);
	return res;
};

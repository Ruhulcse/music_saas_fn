import axiosServices from "./axiosServices";

export const get_music = async (search) => {
  const res = await axiosServices.post(`/get_music`, { prompt: search });
  // const res = [
  //   {
  //     user_id: "Je5b91pY7UUEqd2bKe7lN1eNMDa2",
  //     song_id: "15a19213-1bc3-4d1b-985a-8bd78f24b659",
  //     status: "complete",
  //     title: "Byte by Byte",
  //     image_large_url:
  //       "https://cdn1.suno.ai/image_large_15a19213-1bc3-4d1b-985a-8bd78f24b659.png",
  //     image_url:
  //       "https://cdn1.suno.ai/image_15a19213-1bc3-4d1b-985a-8bd78f24b659.png",
  //     model_name: "chirp-v3",
  //     video_url:
  //       "https://cdn1.suno.ai/15a19213-1bc3-4d1b-985a-8bd78f24b659.mp4",
  //     audio_url:
  //       "https://cdn1.suno.ai/15a19213-1bc3-4d1b-985a-8bd78f24b659.mp3",
  //     meta_tags: "techno upbeat electronic",
  //     meta_prompt: "[Instrumental]",
  //     meta_duration: 120,
  //     meta_error_msg: null,
  //     meta_error_type: null,
  //   },
  //   {
  //     user_id: "Je5b91pY7UUEqd2bKe7lN1eNMDa2",
  //     song_id: "df0b18fa-b7ad-4d19-9df2-7049cf545a7b",
  //     status: "complete",
  //     title: "Byte by Byte",
  //     image_large_url:
  //       "https://cdn1.suno.ai/image_large_df0b18fa-b7ad-4d19-9df2-7049cf545a7b.png",
  //     image_url:
  //       "https://cdn1.suno.ai/image_df0b18fa-b7ad-4d19-9df2-7049cf545a7b.png",
  //     model_name: "chirp-v3",
  //     video_url:
  //       "https://cdn1.suno.ai/df0b18fa-b7ad-4d19-9df2-7049cf545a7b.mp4",
  //     audio_url:
  //       "https://cdn1.suno.ai/df0b18fa-b7ad-4d19-9df2-7049cf545a7b.mp3",
  //     meta_tags: "techno upbeat electronic",
  //     meta_prompt: "[Instrumental]",
  //     meta_duration: 120,
  //     meta_error_msg: null,
  //     meta_error_type: null,
  //   },
  // ];
  console.log("response is ", res);
  // const mapData = res.data?.data?.tracks?.map((el) => ({
  //   id: el?.id,
  //   isPlaying: false,
  //   title: el?.name,
  //   description: el?.Artist?.name,
  //   image: {
  //     src: el?.image,
  //     alt: el?.name,
  //   },
  //   audio: {
  //     audioUrl: el?.preview,
  //     downloadPath: el?.preview,
  //   },
  // }));
  const mapData = res?.data.data.map((el) => ({
    id: el?.song_id,
    isPlaying: false,
    title: el?.title,
    description: el?.model_name,
    image: {
      src: el?.image_url,
      alt: el?.model_name,
    },
    audio: {
      audioUrl: el?.audio_url,
      downloadPath: el?.audio_url,
    },
  }));
  console.log(mapData);
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

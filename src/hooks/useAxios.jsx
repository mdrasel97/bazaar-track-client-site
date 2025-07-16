import axios from "axios";

const axiosInstant = axios.create({
  baseURL: "https://bazaar-track-server.vercel.app",
});

const useAxios = () => {
  return axiosInstant;
};

export default useAxios;

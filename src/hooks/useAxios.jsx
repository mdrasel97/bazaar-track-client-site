import axios from "axios";

const axiosInstant = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxios = () => {
  return axiosInstant;
};

export default useAxios;

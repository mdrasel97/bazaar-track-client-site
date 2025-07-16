import axios from "axios";
import React from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://bazaar-track-server.vercel.app",
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  const token = user?.accessToken;
  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;

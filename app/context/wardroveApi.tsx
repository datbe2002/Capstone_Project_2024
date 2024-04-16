import axios from "axios";
import instance from "./axiosConfig";

export const getModels = async () => {
  const response = await instance.get("/api/models");
  return response.data;
};

export const tryOn = async (data: any) => {
  console.log('try onl', data)
  const response = await axios.post(
    "http://codergang.org:5132/process-images",
    data
  );
  console.log(response)
  return response.data;
};

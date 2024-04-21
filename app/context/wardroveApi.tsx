import axios from "axios";
import instance from "./axiosConfig";
import { useAIURL } from "../store/store";


export const getModels = async () => {
  const response = await instance.get("/api/models");
  return response.data;
};

export const tryOn = async (data: any) => {
  console.log("try onl", data);
  const { url, ...newobj } = data
  console.log(newobj)
  const response = await axios.post(
    String(url),
    newobj
  );
  console.log(response);
  return response.data;
};

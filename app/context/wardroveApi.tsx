import axios from "axios";
import instance from "./axiosConfig";

export const getModels = async () => {
  const response = await instance.get("/api/models");
  return response.data;
};

export const tryOn = async (data: any) => {
  console.log("try onl", data);
  const response = await axios.post(
    "https://0fac-2402-800-63b8-a9c1-b4aa-6b04-de84-b490.ngrok-free.app/process-images",
    data
  );
  console.log(response);
  return response.data;
};

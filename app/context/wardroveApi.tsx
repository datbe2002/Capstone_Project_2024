import axios from "axios";
import instance from "./axiosConfig";
import { useAIURL } from "../store/store";

export const getModels = async () => {
  const response = await instance.get("/api/models");
  return response.data;
};

export const getModelsWithInput = async (props: any) => {
  const response = await instance.get(
    "/api/models/stat?height=" + props.height + "&weight=" + props.weight
  );
  return response.data;
};

export const tryOn = async (data: any) => {
  const { url, ...newobj } = data;
  const response = await axios.post(String(url), newobj);
  return response.data;
};

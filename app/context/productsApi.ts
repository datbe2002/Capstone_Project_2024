import axios, { AxiosResponse } from "axios";
import instance from "./axiosConfig";
import { CartData, Products } from "../../constants/Type";

export const getProducts = async (data?: any) => {
  const response = await instance.get(
    "/api/product"
    //  + `&PageNumber=${data.pageIndex}&PageSize=${data.pageSize}`
  );
  return response.data;
};

export const getNewProduct = async (size: any) => {
  const response = await instance.get("/api/product/newest?size=" + size);
  return response.data;
};

export const getTopProducts = async (size: any) => {
  const response = await instance.get("/api/product/best-seller?size=" + size);
  return response.data;
};

export const getProductById = async (id: any) => {
  const response = await instance.get("/api/product/" + id);
  return response.data;
};

export const addToCart = async (data: CartData) => {
  const response = await axios.post("/api/cart/add", data);
  console.log("===============================");

  console.log("api" + response);

  return response.data;
};

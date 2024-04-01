import axios, { AxiosResponse } from "axios";
import instance from "./axiosConfig";
import { CartData } from "../../constants/Type";

export const getProducts = async (size: any) => {
  const response = await instance.get(
    // "/api/product"
    // //  + `&PageNumber=${data.pageIndex}&PageSize=${data.pageSize}`
    "api/product/paging?PageNumber=1&PageSize=" + size
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
  const response = await instance.post("/api/cart/add", data);
  console.log("api" + response);
  return response.data;
};

export const getCartById = async (id: any) => {
  const response = await instance.get("/api/cart/" + id);
  return response.data;
};

export const updateCart = async (id: any, data: any) => {
  const response = await instance.put("/api/cart/" + id, data);
  return response.data;
};

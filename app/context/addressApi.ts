import { useUserIDStore } from "../store/store";
import instance from "./axiosConfig";
export const getAddress = async (userId?: string | null) => {
    const response = await instance.get(
        `/api/address/${userId}`
    );
    return response.data;
};

export const deleteAddressWId = async (id: number) => {
    const response = await instance.delete("/api/address/" + id);
    return response.data;
};

export const addAddressApi = async (data: any) => {
    const { userId, ...address } = data
    const response = await instance.post(`/api/address/${userId}`, address);
    return response.data;
};

export const putAddressApi = async (data: any) => {
    const { id, ...address } = data
    const response = await instance.put(`/api/address/${id}`, address);
    return response.data;
};

export const getShippingFee = async (addressId: number | null) => {
    const response = await instance.get(`/api/shipping/fee?addressId=${addressId}`);
    return response.data;
};

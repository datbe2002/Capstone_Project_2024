import instance from "./axiosConfig";

export const checkoutCart = async (data: any) => {
    const response = await instance.post(`/api/order/checkout`, data);
    return response.data;
};
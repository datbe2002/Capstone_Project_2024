import instance from "./axiosConfig";

export const getVoucher = async () => {
    const response = await instance.get(
        `/api/promotions`
    );
    return response.data;
};
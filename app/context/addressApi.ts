import instance from "./axiosConfig";

export const getAddress = async (userId?: string | null) => {
    const response = await instance.get(
        `/api/address/${userId}`
    );
    return response.data;
};

// export const getNewProduct = async (size: any) => {
//   const response = await instance.get("/api/product/newest?size=" + size);
//   return response.data;
// };

// export const getTopProducts = async (size: any) => {
//   const response = await instance.get("/api/product/best-seller?size=" + size);
//   return response.data;
// };

// export const getProductById = async (id: any) => {
//   const response = await instance.get("/api/product/" + id);
//   return response.data;
// };

export const getShippingFee = async (addressId: number | null) => {
    const response = await instance.get(`/api/shipping/fee?addressId=${addressId}`);
    return response.data;
};

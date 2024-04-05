import instance from "./axiosConfig";

export const checkoutCart = async (data: any) => {
  console.log(data);

  const response = await instance.post(`/api/order/checkout`, data);
  return response.data;
};

export const getOrderByUserId = async (userId?: string | null) => {
  const response = await instance.get(
    `/api/order/user/${userId}`
  );
  return response.data;
};
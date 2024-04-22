import instance from "./axiosConfig";

export const checkoutCart = async (data: any) => {
  const response = await instance.post(`/api/order/checkout`, data);
  return response.data;
};

export const getOrderByUserId = async (userId?: string | null) => {
  const response = await instance.get(
    `/api/order/user/${userId}`
  );
  return response.data;
};


export const getOrderByOrderId = async (orderId?: number | null) => {
  const response = await instance.get(
    `/api/order/${orderId}`
  );
  return response.data;
};

export const confirmOrder = async (orderId?: number | null) => {
  const response = await instance.put(
    `/api/payment/confirm/${orderId}`
  );
  return response.data;
}
import instance from "./axiosConfig";

export const postFeedback = async (data: any) => {
    const response = await instance.post(`/api/feedbacks`, data);
    return response.data;
};

export const getFeedbackByUserId = async (userId?: string | null) => {
    const response = await instance.get(
        `/api/feedbacks/user/${userId}`
    );
    return response.data;
};

export const getFeedbackByProdId = async (productId?: number | null) => {
    const response = await instance.get(
        `/api/feedbacks/product/${productId}`
    );
    return response.data;
};

export const postUserData = async (data: any) => {
    const { userId, ...objToPost } = data;
    const response = await instance.put(`/api/user/profile/${userId}`, objToPost);
    return response.data;
}


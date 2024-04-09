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


import { useMutation } from "@tanstack/react-query"
import { router } from "expo-router"
import { Alert } from "react-native"
import instance from "./axiosConfig"

interface ChangedPasswordProps {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
    userId: string | null | undefined,
}



const changePasswordQuery = async (data: ChangedPasswordProps) => {
    const { userId, ...dataToPass } = data
    try {
        const response = await instance.put(`/api/user/profile/${userId}/change-password`, dataToPass)
        if (response.status === 200) {
            return { msg: 'Đổi mật khẩu thành công' }
        } else {
            throw new Error('Có lỗi khi đổi mật khẩu')
        }
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            const msg = error.response.data.message;
            throw new Error(msg);
        } else {
            throw error;
        }
    }
}

function useChangePassword() {
    const changePassword = useMutation({
        mutationFn: changePasswordQuery,
        onSuccess: (res) => {
            Alert.alert('Thành công', res.msg, [
                {
                    text: 'OK', onPress: () => router.back()
                },
            ])
        },
        onError: (error) => {
            Alert.alert('Lỗi', String(error))
        },
    })

    return {
        changePassword: changePassword.mutate,
        changePasswordPending: changePassword.isPending,
    }
}

export default useChangePassword
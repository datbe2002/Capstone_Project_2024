import { useMutation } from "@tanstack/react-query"
import { Alert } from "react-native"
import instance from "./axiosConfig"
import { router } from "expo-router"
import { VerificationConfig } from "./verifyCodeMutation"

interface ForgotPassword {
    email: string,
    newPassword: string
}

const forgotPasswordQuery = async (data: ForgotPassword) => {
    try {
        const response = await instance.post(`/api/auth/forgot-password`, data)
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

function useForgotPassword() {
    const changePassword = useMutation({
        mutationFn: forgotPasswordQuery,
        onSuccess: (res) => {
            Alert.alert('Thành công', res.msg, [
                {
                    text: 'OK', onPress: () => router.replace('/(auth)/login')
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

export default useForgotPassword
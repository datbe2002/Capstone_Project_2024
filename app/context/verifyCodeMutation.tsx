import { useMutation } from "@tanstack/react-query"
import { Alert } from "react-native"
import instance from "./axiosConfig"
import { router } from "expo-router"

export interface VerificationConfig {
    code: number | null,
    email: string | null
}

const verifyCodeQuery = async (data: VerificationConfig) => {
    console.log('data2', data)
    const emails = String(data.email)
    const codes = data.code
    const encodedEmail = encodeURIComponent(emails);
    console.log(codes)
    console.log(encodedEmail)
    try {
        const response = await instance.post(`/api/auth/verify-email?email=${encodedEmail}&code=${codes}`)
        if (response.status === 200) {
            return { msg: 'Xác thực thành công' }
        } else {
            throw new Error('Có lỗi khi xác thực')
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

function useVerifyCodeHook() {
    const verifyCode = useMutation({
        mutationFn: verifyCodeQuery,
        onSuccess: (res) => {
            Alert.alert('Thành công', res.msg, [
                { text: 'OK', onPress: () => router.replace('/(auth)/login') },
            ])
        },
        onError: (error) => {
            Alert.alert('Lỗi', String(error))
        },
    })

    return {
        verify: verifyCode.mutate,
        isVerifyLoading: verifyCode.isPending,
    }
}

export default useVerifyCodeHook
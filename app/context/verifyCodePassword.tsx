import { useMutation } from "@tanstack/react-query"
import { Alert } from "react-native"
import instance from "./axiosConfig"
import { router } from "expo-router"
import { VerificationConfig } from "./verifyCodeMutation"

const verifyCodeQuery = async (data: VerificationConfig) => {
    const email = String(data.email)
    const codes = data.code
    const encodedEmail = encodeURIComponent(email);
    try {
        const response = await instance.post(`/api/auth/verify-code?email=${encodedEmail}&code=${codes}`)
        if (response.status === 200) {
            return { msg: 'Xác thực thành công', email: email }
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

function useVerifyPasswordCodeHook() {
    const verifyCode = useMutation({
        mutationFn: verifyCodeQuery,
        onSuccess: (res) => {
            router.push({
                pathname: '/(auth)/change_password',
                params: { email: res.email }
            })
        },
        onError: (error) => {
            Alert.alert('Lỗi', String(error))
        },
    })

    return {
        verifyPasswordCode: verifyCode.mutate,
        isVerifyPasswordCodePending: verifyCode.isPending,
    }
}

export default useVerifyPasswordCodeHook
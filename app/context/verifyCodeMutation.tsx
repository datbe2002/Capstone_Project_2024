import { useMutation } from "@tanstack/react-query"
import { Alert } from "react-native"
import instance from "./axiosConfig"
import { router, useSegments } from "expo-router"
import { setUserAuthToken } from "./authService"
import { useAddressChange, useUserStore } from "../store/store"

export interface VerificationConfig {
    code: number | null,
    email: string | null
}

const verifyCodeQuery = async (data: VerificationConfig) => {
    const emails = String(data.email)
    const codes = data.code
    const encodedEmail = encodeURIComponent(emails);
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
    const { setUserState } = useUserStore()
    const { setSelectedAddress } = useAddressChange()
    const segments = useSegments()
    const inAuthGroup = segments[0] === "(auth)";

    const handleResetApp = () => {
        if (inAuthGroup) {
            router.replace('/(auth)/login')
        } else {
            setUserAuthToken();
            setUserState(null);
            setSelectedAddress({
                userId: null,
                recipientName: null,
                recipientPhone: null,
                province: null,
                provinceId: null,
                district: null,
                disctrictId: null,
                ward: null,
                wardCode: null,
                street: null,
                isDefault: null,
                id: null,
                isDeleted: null,
                createAt: null,
                updateAt: null,
                updateBy: null,
                createBy: null,
            })
            router.replace("/(auth)/login");
        }

    }
    const verifyCode = useMutation({
        mutationFn: verifyCodeQuery,
        onSuccess: (res) => {
            Alert.alert('Thành công', res.msg, [
                { text: 'OK', onPress: handleResetApp },
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
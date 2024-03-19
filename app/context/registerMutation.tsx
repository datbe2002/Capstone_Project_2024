import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { AddressData } from "../../constants/types/normal"
import { Alert } from "react-native"
import { router } from "expo-router"
import instance from "./axiosConfig"



const registerQuery = async (data: AddressData) => {
    try {
        const email = data.email
        const response = await instance.post(`/api/auth/register`, data)
        if (response.status === 200) {
            return { msg: 'Tạo tài khoản thành công', email }
        } else {
            throw new Error('Có lỗi khi đăng kí')
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

function useRegisterHook() {
    const registerMutation = useMutation({
        mutationFn: registerQuery,
        onSuccess: (res) => {
            const email = String(res.email)
            Alert.alert('Tạo tài khoản', res.msg, [
                {
                    text: 'OK', onPress: () => router.push({
                        pathname: "/(auth)/verifyemail",
                        params: { email: email },
                    })
                },
            ])
        },
        onError: (error) => {
            Alert.alert('Error', String(error))
        },
    })

    return {
        register: registerMutation.mutate,
        isRegisterLoading: registerMutation.isPending,
    }
}

export default useRegisterHook
import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import Background from '../../components/BackGround'
import InputV2 from '../../components/InputV2'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS } from '../../assets'
import SpaceBet from '../../components/SpaceBet'
import CustomButton from '../../components/Button'
import useForgotPassword from '../context/forgotPasswordMutation'
interface ErrorState {
    password?: string;
    rePassword?: string;
}
const ChangePassword = () => {
    const { email } = useLocalSearchParams()
    const [inputs, setInputs] = React.useState({
        password: '',
        rePassword: '',
    });
    const [errors, setErrors] = React.useState<ErrorState>({});

    const handleOnchange = (text: string, input: string) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }));
    };
    const handleError = (error: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: error }));
    };
    const { changePassword, changePasswordPending } = useForgotPassword()
    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.password) {
            handleError('Không được để trống ô này', 'password');
            isValid = false;
        }
        if (!inputs.rePassword) {
            handleError('Không được để trống ô này', 'rePassword');
            isValid = false;
        }
        if (inputs.password !== inputs.rePassword) {
            handleError('Mật khẩu nhập lại không khớp', 'rePassword');
            isValid = false;
        }

        if (isValid) {
            const dataToPass = {
                email: String(email),
                newPassword: inputs.password
            }
            await changePassword(dataToPass)
        }
    };


    return (
        <Background imageKey='i5'>
            <View style={styles.container}>
                <View style={styles.inputComponent}>
                    <InputV2
                        onChangeText={(text) => handleOnchange(text, "password")}
                        onFocus={() => handleError(null, "password")}
                        error={errors.password}
                        placeholder="Nhập mật khẩu mới"
                        password
                        label="Mật khẩu mới"
                        iconPlace={
                            <MaterialCommunityIcons
                                name="lock-outline"
                                size={24}
                                color={COLORS.black}
                            />
                        }
                    />
                    <InputV2
                        onChangeText={(text) => handleOnchange(text, "rePassword")}
                        onFocus={() => handleError(null, "rePassword")}
                        error={errors.rePassword}
                        placeholder="Nhập lại mật khẩu mới"
                        password
                        label="Mật khẩu nhập lại"
                        iconPlace={
                            <MaterialCommunityIcons
                                name="lock-outline"
                                size={24}
                                color={COLORS.black}
                            />
                        }
                    />
                    <SpaceBet height={10} />
                    <CustomButton buttonText={changePasswordPending ? "Đang gửi" : 'Xác nhận'} onPress={validate} />
                </View>
            </View>
        </Background>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputComponent: {
        width: "95%",
        gap: 20,
        paddingHorizontal: 10,
    },
})
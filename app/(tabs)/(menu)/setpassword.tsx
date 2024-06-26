import React from 'react'
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../assets'
import CustomButton from '../../../components/Button'
import InputV2 from '../../../components/InputV2'
import SpaceBet from '../../../components/SpaceBet'
import { useUserStore } from '../../store/store'
import useChangePassword from '../../context/changePasswordMutation'
const SetPassword = () => {

    interface ErrorState {
        curPassword?: string,
        newPassword?: string,
        retypeNewPassword?: string
    }

    const [inputs, setInputs] = React.useState({
        curPassword: '',
        newPassword: '',
        retypeNewPassword: '',
    });
    const [errors, setErrors] = React.useState<ErrorState>({});


    const handleOnchange = (text: string, input: string) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error: string | null, input: string) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    const { userState } = useUserStore()
    const { changePassword, changePasswordPending } = useChangePassword()
    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.curPassword) {
            handleError('Không được để trống ô này', 'curPassword');
            isValid = false;
        }
        if (!inputs.newPassword) {
            handleError('Không được để trống ô này', 'newPassword');
            isValid = false;
        }
        if (!inputs.retypeNewPassword) {
            handleError('Không được để trống ô này', 'retypeNewPassword');
            isValid = false;
        }



        if (inputs.newPassword.length < 6) {
            handleError('Mật khẩu phải có ít nhất 6 ký tự', 'newPassword');
            isValid = false;
        }

        if (inputs.newPassword !== inputs.retypeNewPassword) {
            handleError('Mật khẩu nhập lại không khớp', 'retypeNewPassword');
            isValid = false;
        }


        if (isValid) {
            const dataToPass = {
                oldPassword: inputs.curPassword,
                newPassword: inputs.newPassword,
                confirmPassword: inputs.retypeNewPassword,
                userId: userState?.id,
            }
            await changePassword(dataToPass)
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='position' keyboardVerticalOffset={-50} >
            <ScrollView contentContainerStyle={styles.fullcomponent} >
                <SpaceBet height={30} />
                <View style={styles.introCo}>
                    <Text style={styles.mainText}>Trương Tấn Đạt {'\u2022'} FTAI Shop</Text>
                    <SpaceBet height={5} />

                    <Text style={styles.biggerText}>Đổi mật khẩu</Text>
                    <SpaceBet height={5} />

                    <Text style={styles.mainText}>Mật khẩu của bạn phải có ít nhất 6 ký tự</Text>
                </View>
                <View style={styles.inputCo}>
                    <InputV2
                        onChangeText={text => handleOnchange(text, 'curPassword')}
                        onFocus={() => handleError(null, 'curPassword')}
                        error={errors.curPassword}
                        placeholder='Mật khẩu hiện tại'
                        password
                    />
                    <InputV2
                        onChangeText={text => handleOnchange(text, 'newPassword')}
                        onFocus={() => handleError(null, 'newPassword')}
                        error={errors.newPassword}
                        placeholder='Mật khẩu mới'
                        password
                    />
                    <InputV2
                        onChangeText={text => handleOnchange(text, 'retypeNewPassword')}
                        onFocus={() => handleError(null, 'retypeNewPassword')}
                        error={errors.retypeNewPassword}
                        placeholder='Nhập lại mật khẩu mới'
                        password
                    />
                    <SpaceBet height={30} />

                    <CustomButton
                        buttonText={changePasswordPending ? <ActivityIndicator color={COLORS.white} size={25} /> : "Đổi mật khẩu"}
                        style={{ width: "100%" }}
                        onPress={validate}
                    />

                </View>

            </ScrollView>
        </KeyboardAvoidingView>

    )
}

export default SetPassword

const styles = StyleSheet.create({
    fullcomponent: {
        flexGrow: 1,
        paddingHorizontal: 10,
    },
    introCo: {
        display: 'flex',
    },
    input: {
        width: "100%",
        backgroundColor: COLORS.inputBackgroundColor,
        borderColor: COLORS.inputBackgroundColor,
        elevation: 2,
    },
    inputCo: {
        marginTop: 20,
        display: 'flex',
        gap: 20,
    },
    mainText: {
        fontSize: 18,
        fontFamily: 'mon-sb',
        color: COLORS.primary
    },
    biggerText: {
        fontSize: 35,
        fontFamily: 'mon-b',
        color: COLORS.primary
    }
})
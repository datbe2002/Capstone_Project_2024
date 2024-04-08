import { ActivityIndicator, Alert, Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/Button'
import SpaceBet from '../../components/SpaceBet'
import Background from '../../components/BackGround'
import { router } from 'expo-router'
import InputV2 from '../../components/InputV2'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS } from '../../assets'
import instance from '../context/axiosConfig'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { VerificationConfig } from '../context/verifyCodeMutation'
import useVerifyPasswordCodeHook from '../context/verifyCodePassword'
interface ErrorState {
    email?: string;
}
const ForgotPassword = () => {
    const [inputs, setInputs] = React.useState({
        email: "",
    });
    const [errors, setErrors] = React.useState<ErrorState>({});

    const handleOnchange = (text: string, input: string) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }));
    };
    const handleError = (error: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: error }));
    };
    const CELL_COUNT = 4
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const { isVerifyPasswordCodePending, verifyPasswordCode } = useVerifyPasswordCodeHook()

    const [status, setStatus] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    console.log(status)
    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!inputs.email) {
            handleError("Không được để trống ô này", "email");
            isValid = false;
        } else if (!emailRegex.test(inputs.email)) {
            handleError("Địa chỉ email không hợp lệ", "email");
            isValid = false;
        }
        const email = inputs?.email;

        if (isValid) {
            setLoading(true);
            const fetchData = async () => {

                try {
                    const response = await instance.post(`/api/auth/send-verification-code?email=${email}`);
                    setLoading(false);
                    setStatus(response.data);
                } catch (error) {
                    setLoading(false);
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    };

    const onSubmitCode = async () => {

        if (value.length !== 4 || isNaN(Number(value)) || value === '0') {
            Alert.alert("Thông báo", "Code nhập không đúng định dạng")
            return;
        }

        const dataToPass: VerificationConfig = {
            email: String(inputs.email),
            code: Number(value)
        }
        console.log(dataToPass)
        setTimeout(() => {
            setStatus(null)
        }, 1000)
        await verifyPasswordCode(dataToPass)

    }


    return (
        <Background imageKey='i3'>
            <View style={styles.container}>
                <View style={styles.inputComponent}>
                    {status === null ? <InputV2
                        onChangeText={(text) => handleOnchange(text, "email")}
                        onFocus={() => handleError(null, "email")}
                        error={errors.email}
                        placeholder="Email"
                        label="Email"
                        iconPlace={
                            <MaterialCommunityIcons
                                name="email-outline"
                                size={24}
                                color={COLORS.black}
                            />
                        }
                    /> :
                        <View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.sendText}>Code đã được gửi tới email của bạn</Text>
                            </View>
                            <CodeField
                                ref={ref}
                                {...props}
                                value={value}
                                onChangeText={setValue}
                                cellCount={CELL_COUNT}
                                rootStyle={styles.codeFieldRoot}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                renderCell={({ index, symbol, isFocused }) => (
                                    <Text
                                        key={index}
                                        style={[styles.cell, isFocused && styles.focusCell]}
                                        onLayout={getCellOnLayoutHandler(index)}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                )}
                            />
                        </View>
                    }
                </View>
                <SpaceBet height={20} />
                {status === null ? <View style={styles.buttonContainer}>
                    <CustomButton buttonText={'Quay lại'} buttonColor='secondary' onPress={() => router.back()} />
                    <CustomButton buttonText={loading ? <ActivityIndicator color={COLORS.white} size={25} /> : 'Gửi'} style={styles.sendButton} onPress={validate} />

                </View> :
                    <View >

                        <CustomButton buttonText={isVerifyPasswordCodePending ? "Đang gửi..." : 'Gửi mã'} style={styles.sendButton} onPress={onSubmitCode} />
                    </View>}
            </View>
        </Background>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendText: {
        fontSize: 20,
        fontFamily: 'mon-sb'
    },
    inputComponent: {
        width: "95%",
        gap: 20,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        gap: 20,
    },
    sendButton: {
        width: '65%',
    },
    codeFieldRoot: { marginTop: 20, paddingHorizontal: 50 },
    cell: {
        width: 60,
        height: 60,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: COLORS.gray,
        backgroundColor: COLORS.inputBackgroundColor,
        textAlign: 'center',
        paddingTop: 10,
        borderRadius: 16,
    },
    focusCell: {
        borderColor: COLORS.black,
    },
})
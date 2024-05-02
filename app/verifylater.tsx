import { ActivityIndicator, Alert, Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import instance from './context/axiosConfig'
import useVerifyCodeHook, { VerificationConfig } from './context/verifyCodeMutation'
import Background from '../components/BackGround'
import InputV2 from '../components/InputV2'
import { COLORS } from '../assets'
import SpaceBet from '../components/SpaceBet'
import CustomButton from '../components/Button'
import { useUserStore } from './store/store'
import useVerifyPasswordCodeHook from './context/verifyCodePassword'
interface ErrorState {
    email?: string;
}
const VerifyUserPage = () => {
    const { userState } = useUserStore()
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

    const { verify, isVerifyLoading } = useVerifyCodeHook()


    const [status, setStatus] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.post(`/api/auth/send-verification-code?email=${userState?.email}`);
                setStatus(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])


    const onSubmitCode = async () => {
        if (value.length !== 4 || isNaN(Number(value)) || value === '0') {
            Alert.alert("Thông báo", "Code nhập không đúng định dạng")
            return;
        }

        const dataToPass: VerificationConfig = {
            email: String(userState?.email),
            code: Number(value)
        }
        setTimeout(() => {
            setStatus(null)
        }, 1000)
        await verify(dataToPass)

    }


    return (
        <Background imageKey='i3'>
            <View style={styles.container}>
                <View style={styles.inputComponent}>

                    <View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.sendText}>{!status ? 'Đang gửi code tới email của bạn...' : 'Code đã được gửi tới email của bạn'}</Text>
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
                </View>
                <SpaceBet height={20} />

                <View >
                    <CustomButton buttonText={isVerifyLoading ? <ActivityIndicator size={25} color={COLORS.primary} /> : 'Gửi mã'} style={styles.sendButton} onPress={onSubmitCode} />
                </View>
            </View>
        </Background>
    )
}

export default VerifyUserPage

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
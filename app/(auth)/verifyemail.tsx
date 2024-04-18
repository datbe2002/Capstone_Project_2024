import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../assets';
import axios from 'axios';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import useVerifyCodeHook, { VerificationConfig } from '../context/verifyCodeMutation';
import CustomButton from '../../components/Button';
const VerifyEmail = () => {
    const { email } = useLocalSearchParams();
    const { verify, isVerifyLoading } = useVerifyCodeHook()
    const CELL_COUNT = 4
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [status, setStatus] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`https://ftai-api.monoinfinity.net/api/auth/send-verification-code?email=${email}`);
                setStatus(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const onSubmitCode = async () => {
        const dataToPass: VerificationConfig = {
            email: String(email),
            code: Number(value)
        }
        await verify(dataToPass)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.introContainer}>
                <Text style={styles.introText}>Hi, {email}</Text>
            </View>
            <View style={styles.introContainer}>
                <Text style={styles.explainText}>{status ? 'Chúng tôi đã gửi mã code 4 số trong email của bạn' : 'Đang gửi...'}</Text>
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
            <CustomButton buttonText={isVerifyLoading ? 'Đang xác thực...' : 'Gửi'} style={{ paddingHorizontal: 150, marginTop: 50 }} onPress={onSubmitCode} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    introContainer: {
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    introText: {
        fontFamily: 'mon-b',
        fontSize: 23,
        color: COLORS.primary
    },
    explainText: {
        fontFamily: 'mon-sb',
        fontSize: 18,
        color: COLORS.primary
    },
    title: { textAlign: 'center', fontSize: 30 },
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


export default VerifyEmail
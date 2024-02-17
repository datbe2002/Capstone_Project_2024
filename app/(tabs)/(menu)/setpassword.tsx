import React, { useRef } from 'react'
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../assets'
import CustomButton from '../../../components/Button'
import CustomInput from '../../../components/Input'
import SpaceBet from '../../../components/SpaceBet'
const SetPassword = () => {
    const curPassword = useRef<string>("")
    const newPassword = useRef<string>("")
    const retypeNewPassword = useRef<string>("")

    const handleSetNewPassword = async () => {
        if (!curPassword.current || !newPassword.current || !retypeNewPassword.current) {
            Alert.alert('Thông báo', 'Không được để trống các ô')
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='position' keyboardVerticalOffset={-80} >
            <ScrollView contentContainerStyle={styles.fullcomponent} >
                <SpaceBet height={30} />
                <View style={styles.introCo}>
                    <Text style={styles.mainText}>Trương Tấn Đạt {'\u2022'} FTAI Shop</Text>
                    <SpaceBet height={5} />

                    <Text style={styles.biggerText}>Đổi mật khẩu</Text>
                    <SpaceBet height={5} />

                    <Text style={styles.mainText}>Mật khẩu của bạn phải có ít nhất 6 ký tự, bao gồm cả chữ số, chữ cái và ký tự đặc biệt (!$@%)</Text>
                </View>
                <SpaceBet height={30} />
                <View style={styles.inputCo}>
                    <CustomInput
                        placeholder="Mật khẩu hiện tại"
                        onChangeText={value => curPassword.current = value}
                        secureTextEntry={true}
                        style={styles.input}
                    />
                    <SpaceBet height={20} />
                    <CustomInput
                        placeholder="Mật khẩu"
                        onChangeText={value => newPassword.current = value}
                        secureTextEntry={true}
                        style={styles.input}
                    />
                    <SpaceBet height={20} />
                    <CustomInput
                        placeholder="Nhập lại mật khẩu mới"
                        onChangeText={value => retypeNewPassword.current = value}
                        secureTextEntry={true}
                        style={styles.input}
                    />
                    <SpaceBet height={22} />
                    <CustomButton
                        buttonText="Đổi mật khẩu"
                        style={{ width: "100%" }}
                        onPress={handleSetNewPassword}
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
        justifyContent: "center",
        alignItems: "center",
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
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/Input'
import { COLORS } from '../../assets';
import SpaceBet from '../../components/SpaceBet';
import CustomButton from '../../components/Button';
const { height, width } = Dimensions.get('window')

const LoginPage = () => {

    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (text: string) => {
        setInputValue(text);
    };

    return (
        <View style={styles.loginComponent}>
            <View style={styles.openComponent}></View>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Đăng nhập</Text>
                <Text style={styles.des}>Chào mừng bạn đã trở lại</Text>
            </View>
            <View>
                <CustomInput
                    placeholder="Tên đăng nhập..."
                    onChangeText={handleInputChange}
                    value={inputValue}
                    style={styles.input} />
            </View>
            <View>
                <SpaceBet height={20} />
            </View>
            <View>
                <CustomInput
                    placeholder="Mật khẩu"
                    onChangeText={handleInputChange}
                    value={inputValue}
                    style={styles.input} />
            </View>
            <View>
                <SpaceBet height={20} />
            </View>
            <View>
                <CustomButton buttonText='Đăng nhập' onPress={() => console.log('first')} />
            </View>
        </View>
    )
}

export default LoginPage

const styles = StyleSheet.create({
    openComponent: {
        height: 400,
        width: width,
        backgroundColor: 'blue'
    },
    titleWrapper: {
        height: 100,
        width: width,
        justifyContent: 'center',
        marginLeft: 80,
        marginBottom: 20,
        marginTop: 20,
    },
    title: {
        fontSize: 52,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    des: {
        fontSize: 19,
        fontWeight: '300'
    },
    loginComponent: {
        height: height,
        width: width,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    input: {
        borderColor: COLORS.inputBackgroundColor,
        backgroundColor: COLORS.inputBackgroundColor
    }
})
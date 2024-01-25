import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../assets';
import CustomButton from '../../components/Button';
import CustomInput from '../../components/Input';
import SpaceBet from '../../components/SpaceBet';
const { height, width } = Dimensions.get('window')

const LoginPage = () => {

    const [inputUsername, setInputUsername] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');

    const handleInputUsername = (text: string) => {
        setInputUsername(text);
    };
    const handleInputPassword = (text: string) => {
        setInputPassword(text);
    };

    return (
        <SafeAreaView style={styles.loginComponent}>
            <View style={styles.openComponent}></View>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Đăng nhập</Text>
                <Text style={styles.des}>Chao mung moi nguoi da den voi shop</Text>
            </View>
            <View style={styles.inputCo}>
                <View>
                    <CustomInput
                        placeholder="Tên đăng nhập..."
                        onChangeText={handleInputUsername}
                        value={inputUsername}
                        style={styles.input} />
                </View>
                <View>
                    <SpaceBet height={20} />
                </View>
                <View>
                    <CustomInput
                        placeholder="Mật khẩu"
                        onChangeText={handleInputPassword}
                        secureTextEntry={true}
                        value={inputPassword}
                        style={styles.input} />
                </View>
                <View>
                    <SpaceBet height={20} />
                </View>
                <View>
                    <CustomButton buttonText='Đăng nhập' onPress={() => console.log('first')} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginPage

const styles = StyleSheet.create({
    openComponent: {
        height: 400,
        width: width,
        backgroundColor: 'blue',
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
        fontFamily: 'mon-b',
        textTransform: 'uppercase',
    },
    des: {
        fontSize: 19,
        fontFamily: 'mon',
    },
    loginComponent: {
        height: height,
        width: width,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    input: {
        borderColor: COLORS.inputBackgroundColor,
    },
    inputCo: {
        width: width,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
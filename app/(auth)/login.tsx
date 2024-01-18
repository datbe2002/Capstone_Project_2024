import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/Input'
import { COLORS } from '../../assets';
const { height, width } = Dimensions.get('window')

const LoginPage = () => {

    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (text: string) => {
        setInputValue(text);
    };

    return (
        <View style={styles.loginComponent}>
            <Text>LoginPage</Text>
            <View>
                <CustomInput
                    placeholder="Type something..."
                    onChangeText={handleInputChange}
                    value={inputValue}
                    style={styles.input} />
            </View>
        </View>
    )
}

export default LoginPage

const styles = StyleSheet.create({
    loginComponent: {
        height: height,
        width: width,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        borderColor: COLORS.inputBackgroundColor,
        backgroundColor: COLORS.inputBackgroundColor
    }
})
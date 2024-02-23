import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../assets'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface InputV2Props extends TextInputProps {
    label?: string,
    iconName?: string,
    error?: string,
    password?: boolean | undefined,
    onFocus?: () => void,
    iconPlace?: ChildNode | any,
}

const InputV2: React.FC<InputV2Props> = ({ label, iconName, error, iconPlace, password, onFocus = () => { }, ...props }) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [hidePassword, setHidePassword] = useState(password)
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.inputContainer, { borderColor: error ? COLORS.errorColor : isFocused ? COLORS.black : COLORS.gray }]}>
                {iconPlace}
                <TextInput
                    secureTextEntry={hidePassword}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true)
                    }}
                    onBlur={() => {
                        setIsFocused(false)
                    }}
                    style={{ flex: 1, fontSize: 20, fontFamily: 'mon-sb' }}
                    {...props} />
                {password && <MaterialCommunityIcons
                    onPress={() => setHidePassword(!hidePassword)}
                    name={hidePassword ? "eye-outline" : "eye-off-outline"}
                    size={24}
                    color={COLORS.black} />}
            </View>
            {error && <Text style={{ color: COLORS.errorColor, fontSize: 13, fontFamily: 'mon-sb' }}>{error}</Text>}

        </View>
    )
}

export default InputV2

const styles = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: 16,
        fontFamily: 'mon-sb'
    },
    inputContainer: {
        height: 60,
        backgroundColor: COLORS.inputBackgroundColor,
        flexDirection: 'row',
        borderWidth: 2,
        alignItems: 'center',
        borderRadius: 16,
        fontFamily: 'mon',
        paddingHorizontal: 10,
        gap: 10
    }
})
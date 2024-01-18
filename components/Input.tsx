import React from 'react';
import { TextInput, StyleSheet, TextStyle } from 'react-native';
import { COLORS, SIZES } from '../assets';

interface CustomInputProps {
    placeholder: string;
    onChangeText: (text: string) => void;
    value: string;
    style?: TextStyle;
}

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, onChangeText, value, style }) => {
    return (
        <TextInput
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            style={[styles.input, style]}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 60,
        width: 400,
        borderRadius: 16,
        borderWidth: 1,
        paddingHorizontal: 16,
        fontSize: SIZES.large,
    },
});

export default CustomInput;

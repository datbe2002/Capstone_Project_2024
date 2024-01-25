import React from 'react';
import { TextInput, StyleSheet, TextStyle, TextInputProps, Dimensions } from 'react-native';
import { COLORS, SIZES } from '../assets';
const { height, width } = Dimensions.get('window')

interface CustomInputProps extends TextInputProps {
    style?: TextStyle;
}

const CustomInput: React.FC<CustomInputProps> = ({ style = {}, ...props }) => {
    return (
        <TextInput
            {...props}
            style={[styles.input, style]}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        fontFamily: 'mon',
        height: 60,
        width: width / 1.2,
        borderRadius: 16,
        borderWidth: 1,
        paddingHorizontal: 16,
        backgroundColor: 'red',
        fontSize: SIZES.large,
    },
});

export default CustomInput;


import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { COLORS, SIZES } from '../assets';

interface CustomButtonProps {
    onPress: () => void;
    buttonText: string;
    style?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, buttonText, style }) => {
    return (
        <Pressable onPress={onPress} style={[styles.buttonChild, style]}>
            <Text style={styles.textInside}>{buttonText}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonChild: {
        borderRadius: 16,
        height: 60,
        width: 400,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInside: {
        fontSize: SIZES.large,
        color: 'white',
        textAlign: 'center',
    },
});

export default CustomButton;

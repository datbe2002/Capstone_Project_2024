import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { COLORS, SIZES } from '../assets';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('window')

interface CustomButtonProps {
    onPress: () => void;
    buttonText: string;
    style?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, buttonText, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonChild, style]}>
            <Text style={styles.textInside}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonChild: {
        borderRadius: 16,
        height: 60,
        width: width / 1.2,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInside: {
        fontSize: SIZES.large,
        fontFamily: 'mon-sb',
        color: 'white',
        textAlign: 'center',
    },
});

export default CustomButton;

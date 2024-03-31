import React, { ReactNode } from 'react';
import { View, StyleSheet, TextStyle, ViewStyle, Text } from 'react-native';
import { COLORS } from '../assets';

interface Props {
    icon: ReactNode;
    text: string | null;
}

const EmptyComponentCustom: React.FC<Props> = ({ icon, text }) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                {icon}
            </View>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: 90,
        height: 90,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    text: {
        fontFamily: 'mon-sb',
        fontSize: 15,
        marginTop: 20,
    },
});

export default EmptyComponentCustom;

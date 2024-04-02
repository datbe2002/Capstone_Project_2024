import React, { ReactNode } from 'react';
import { View, StyleSheet, TextStyle, ViewStyle, Text, Pressable } from 'react-native';
import { COLORS } from '../assets';
import { router } from 'expo-router';

interface Props {
    icon: ReactNode;
    text: string | null;
    option?: string | null;
    onPress: () => void;
}

const EmptyComponentCustom: React.FC<Props> = ({ icon, text, option, onPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                {icon}
            </View>
            <Text style={styles.text}>{text}</Text>
            {option &&
                <Pressable style={{ backgroundColor: COLORS.primary, padding: 15, borderRadius: 2 }} onPress={onPress}>
                    <Text style={{ fontFamily: 'mon-sb', color: COLORS.white, fontSize: 16 }}>{option}</Text>
                </Pressable>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 300,
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
        marginVertical: 20,
    },
});

export default EmptyComponentCustom;

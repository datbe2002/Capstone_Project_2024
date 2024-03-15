import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { COLORS } from '../../assets'
import { ActiveProps } from '../../app/(tabs)/(menu)/menu'
import { useFocusEffect } from 'expo-router'
// interface VoucherSectionProps {
//     activeButton: string
//     handleButtonClick: (buttonName: ActiveVoucherProps) => void
// }
export type ActiveVoucherProps = 'all' | 'active' | 'already' | 'outdated'

const VoucherSection = () => {
    // Main menu component
    const [activeVoucherButton, setActiveVoucherButton] = useState<ActiveVoucherProps>('all');

    const handleButtonClick = (buttonName: ActiveVoucherProps) => {
        setActiveVoucherButton(buttonName);
    };

    useFocusEffect(
        useCallback(() => {
            setActiveVoucherButton('all');
        }, [])
    )
    return (
        <View style={styles.mainSection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalSlideOptions}>
                <TouchableOpacity style={activeVoucherButton === 'all' ? styles.activeButton : styles.option}
                    onPress={() => handleButtonClick('all')}
                >
                    <Text style={activeVoucherButton === 'all' ? styles.activeTextButton : styles.textOption}>Tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeVoucherButton === 'active' ? styles.activeButton : styles.option}
                    onPress={() => handleButtonClick('active')}
                >
                    <Text style={activeVoucherButton === 'active' ? styles.activeTextButton : styles.textOption}>Hoạt động</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeVoucherButton === 'already' ? styles.activeButton : styles.option}
                    onPress={() => handleButtonClick('already')}>
                    <Text style={activeVoucherButton === 'already' ? styles.activeTextButton : styles.textOption}>Đã quy đổi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeVoucherButton === 'outdated' ? styles.activeButton : styles.option}
                    onPress={() => handleButtonClick('outdated')}>
                    <Text style={activeVoucherButton === 'outdated' ? styles.activeTextButton : styles.textOption}>Hết hạn</Text>
                </TouchableOpacity>
            </ScrollView>
            <ScrollView showsVerticalScrollIndicator contentContainerStyle={styles.mainAreaForEach}>

            </ScrollView>
        </View>
    )
}

export default VoucherSection

const styles = StyleSheet.create({
    mainSection: {
        height: 'auto',
        padding: 10,
        backgroundColor: COLORS.gray
    },
    horizontalSlideOptions: {
        height: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        flexDirection: 'row',
        marginBottom: 10,
    },
    option: {
        backgroundColor: COLORS.white,
        padding: 10,
        width: 'auto',
        borderRadius: 18,
    },
    textOption: {
        fontFamily: 'mon-b',
        color: COLORS.secondary,
    },
    mainAreaForEach: {
        backgroundColor: 'red',
        height: 2000,
    },
    activeButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        width: 'auto',
        borderRadius: 18,
        color: 'white',
    },
    activeTextButton: {
        fontFamily: 'mon-b',
        color: 'white',
    }
})
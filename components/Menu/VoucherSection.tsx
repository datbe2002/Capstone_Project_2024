import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const VoucherSection = () => {

    return (
        <ScrollView style={styles.mainSection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalSlideOptions}>
                <TouchableOpacity style={styles.option}>
                    <Text>Tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text>Hoạt động</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text>Đã quy đổi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text>Hết hạn</Text>
                </TouchableOpacity>
            </ScrollView>
        </ScrollView>
    )
}

export default VoucherSection

const styles = StyleSheet.create({
    mainSection: {
        height: 'auto',
        padding: 10,
    },
    horizontalSlideOptions: {
        height: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        flexDirection: 'row'
    },
    option: {
        backgroundColor: 'blue',
        padding: 15,
        width: 'auto',
        borderRadius: 25,
        color: 'white'
    }
})
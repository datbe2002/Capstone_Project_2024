import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

const TopThings = () => {
    return (
        <View style={styles.topContainer}>
            <Pressable style={[styles.firstLine, { borderBottomWidth: 1, borderBottomColor: COLORS.gray }]} onPress={() => router.replace('/(tabs)/(favorite)/favorite')}>
                <MaterialCommunityIcons name="cards-heart-outline" size={24} color={COLORS.errorColor} />
                <Text style={styles.textLine}>Yêu thích</Text>
            </Pressable>
            <Pressable style={[styles.firstLine, { borderBottomWidth: 1, borderBottomColor: COLORS.gray }]} onPress={() => router.push('/(tabs)/(menu)/feedback')}>
                <MaterialCommunityIcons name="comment-processing-outline" size={24} color={COLORS.primary} />
                <Text style={styles.textLine}>Đánh giá</Text>
            </Pressable>
            <Pressable style={[styles.firstLine, { marginBottom: 20 }]} onPress={() => router.push('/success_payment')}>
                <MaterialCommunityIcons name="archive-arrow-up-outline" size={24} color={COLORS.darkGray} />
                <Text style={styles.textLine}>Sản phẩm bán chạy</Text>
            </Pressable>
            <Pressable style={styles.firstLine} onPress={() => router.push('/(tabs)/(menu)/profile')}>
                <MaterialCommunityIcons name="account-check-outline" size={24} color={"#20AC02"} />
                <Text style={styles.textLine}>Tài khoản hệ thống</Text>
            </Pressable>
        </View>
    )
}

export default TopThings

const styles = StyleSheet.create({
    topContainer: {
        marginVertical: 20,
        display: 'flex',
        flexDirection: 'column',
    },
    firstLine: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: COLORS.white
    },
    textLine: {
        fontFamily: 'mon-sb',
        fontSize: 16,
    }
})
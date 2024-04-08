import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'

const MyAccount = () => {
    return (
        <View>
            <View style={styles.componentText}>
                <Text style={styles.syntaxText}>Tài khoản của tôi</Text>
            </View>
            <View style={styles.lineFunc}>
                <Pressable style={styles.accountId} onPress={() => router.push('/(tabs)/(menu)/profile')}>
                    <Text style={styles.mainText}>
                        Tài khoản & Bảo mật
                    </Text>
                    <View style={styles.changeComp} >
                        <View>
                            <AntDesign name="right" size={18} color={COLORS.darkGray} />
                        </View>
                    </View>
                </Pressable>
                <Pressable style={styles.threeComp} onPress={() => router.push('/(tabs)/(menu)/address')}>
                    <Text style={styles.mainText}>
                        Sổ địa chỉ
                    </Text>
                    <View style={styles.changeComp} >
                        <View>
                            <AntDesign name="right" size={18} color={COLORS.darkGray} />
                        </View>
                    </View>
                </Pressable>
                <Pressable style={styles.threeComp} onPress={() => router.push('/(tabs)/(menu)/paymentmethod')}>
                    <Text style={styles.mainText}>
                        Phương thức thanh toán
                    </Text>
                    <View style={styles.changeComp} >
                        <View>
                            <AntDesign name="right" size={18} color={COLORS.darkGray} />
                        </View>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

export default MyAccount

const styles = StyleSheet.create({
    account: {
        height: 'auto',
        marginHorizontal: 10,
    },
    componentText: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    syntaxText: {
        color: COLORS.darkGray,
        fontFamily: 'mon-sb',
        fontSize: 17,
    },
    lineFunc: {
        height: 'auto',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    accountId: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    mainText: {
        color: COLORS.black,
        fontSize: 18,
        fontFamily: 'mon-sb',
    },
    secondText: {
        color: COLORS.blue1,
        fontFamily: 'mon',
        fontSize: 18
    },
    twoLine: {
        paddingTop: 10,
        paddingBottom: 10,
        borderTopColor: COLORS.gray,
        borderTopWidth: 1,
    },
    threeComp: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopColor: COLORS.gray,
        borderTopWidth: 1,
    },
    changeComp: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    changeText: {
        fontSize: 18,
        color: COLORS.blue1,
    },
    signUpDate: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopColor: COLORS.gray,
        borderTopWidth: 1,
    }
})
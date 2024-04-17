import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets'
import { transNumberFormatter } from './ShippingFee'
import { ActivityIndicator } from 'react-native'

interface TotalConfirmCheckoutProps {
    handleCheckout: () => void,
    totalPay: number | null,
    isPending: boolean
}

const TotalConfirmCheckout = ({ handleCheckout, totalPay, isPending }: TotalConfirmCheckoutProps) => {
    return (
        <View style={styles.footerPay}>
            <View style={styles.mainTotalPrice}>
                <Text style={styles.labelMain}>Tổng thanh toán</Text>
                <Text style={styles.mainPrice}>{transNumberFormatter(totalPay)}đ</Text>
            </View>
            <Pressable style={styles.checkoutBtn} onPress={handleCheckout}>
                <Text style={styles.textBtn}>{isPending ? <ActivityIndicator size={30} color={COLORS.white} /> : 'Đặt hàng'}</Text>
            </Pressable>
        </View>
    )
}

export default TotalConfirmCheckout

const styles = StyleSheet.create({
    footerPay: {
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderTopColor: COLORS.gray,
        borderTopWidth: 2,
        backgroundColor: COLORS.white
    },
    mainTotalPrice: {
        padding: 10,

    },
    mainPrice: {
        textAlign: 'right',
        fontSize: 23,
        fontFamily: 'mon-b',
        color: COLORS.primary
    },
    labelMain: {
        fontSize: 18,
        fontFamily: 'mon-sb'
    },
    checkoutBtn: {
        width: 150,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtn: {
        padding: 20,
        color: COLORS.white,
        fontSize: 20,
        fontFamily: 'mon-b'
    },
})
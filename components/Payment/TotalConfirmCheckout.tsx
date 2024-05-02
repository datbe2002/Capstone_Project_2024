import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../assets'
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
                <Text style={[styles.labelMain, { fontSize: SIZES.medium, color: COLORS.darkGray }]}>(Đã bao gồm VAT và shipping)</Text>
                <Text style={styles.mainPrice}>{transNumberFormatter(totalPay)}đ</Text>
            </View>

            {isPending ? <Pressable disabled style={[styles.checkoutBtn, { backgroundColor: COLORS.darkGray, opacity: 0.6 }]} onPress={handleCheckout}>
                <Text style={styles.textBtn}>{<ActivityIndicator size={30} color={COLORS.white} />}</Text>
            </Pressable> :
                <Pressable style={[styles.checkoutBtn, { backgroundColor: COLORS.primary }]} onPress={handleCheckout}>
                    <Text style={styles.textBtn}>{'Đặt hàng'}</Text>
                </Pressable>
            }
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
        backgroundColor: COLORS.white,
    },
    mainTotalPrice: {
        padding: 10,
        alignItems: 'flex-end'
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
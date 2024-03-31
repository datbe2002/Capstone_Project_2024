import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets'
import { transNumberFormatter } from './ShippingFee'
interface TotalProps {
    totalAmount: number | null,
    totalPrice: number | null
}
const TotalAmountPrice = ({ totalAmount, totalPrice }: TotalProps) => {
    return (
        <View style={styles.totalPriceContainer}>
            <View >
                <Text style={styles.label}>{`Tổng số tiền (${totalAmount} sản phẩm):`}</Text>
            </View>
            <Text style={styles.totalPrice}><Text style={styles.vndText}>đ</Text>{transNumberFormatter(totalPrice)}</Text>
        </View>
    )
}

export default TotalAmountPrice

const styles = StyleSheet.create({
    totalPriceContainer: {
        height: 60,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        fontFamily: 'mon-sb'
    },
    vndText: {
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    totalPrice: {
        fontSize: 20,
        fontFamily: 'mon-b',
        color: COLORS.primary
    },
})
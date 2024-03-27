import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets'

const PaymentMethodChosen = () => {
    return (
        <View style={styles.totalPriceContainer}>
            <View>
                <Text style={styles.label}>Phương thức thanh toán:</Text>
            </View>
            <Text style={styles.totalPrice}>Zalo Pay</Text>
        </View>
    )
}

export default PaymentMethodChosen

const styles = StyleSheet.create({
    totalPriceContainer: {
        height: 60,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: COLORS.gray
    },
    totalPrice: {
        fontSize: 20,
        fontFamily: 'mon-b',
        color: COLORS.black
    },
    label: {
        fontSize: 18,
        fontFamily: 'mon-sb'
    },
})
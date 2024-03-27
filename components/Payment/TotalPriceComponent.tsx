import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets'

const TotalPriceComponent = ({ totalPrice, shippingFeePrice }: any) => {
    return (
        <View style={styles.totalPriceContainer}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>Chi tiết thanh toán</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <View style={styles.line}>
                    <Text style={styles.textLine}>Tổng tiền hàng</Text>
                    <Text style={styles.textLine}>đ100000</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.textLine}>Tổng tiền phí vận chuyển</Text>
                    <Text style={styles.textLine}>đ100000</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.textLine}>Tổng cộng voucher giảm</Text>
                    <Text style={styles.textLine}>- đ10000</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.textLineEnd}>Tổng thanh toán</Text>
                    <Text style={styles.textLineEndPrice}>đ190000</Text>
                </View>
            </View>
        </View>
    )
}

export default TotalPriceComponent

const styles = StyleSheet.create({
    totalPriceContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
    },
    labelContainer: {
    },
    label: {
        fontSize: 18,
        fontFamily: 'mon-sb'
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textLine: {
        fontFamily: 'mon-sb',
        fontSize: 16,
        color: COLORS.darkGray
    },
    textLineEnd: {
        fontFamily: 'mon-sb',
        fontSize: 18,
    },
    textLineEndPrice: {
        fontFamily: 'mon-sb',
        fontSize: 18,
        color: COLORS.primary
    }
})
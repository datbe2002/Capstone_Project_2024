import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets'

const TermPurchase = () => {
    return (
        <View style={styles.lastCom}>
            <Text style={styles.lastText}>Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản của FTai Store</Text>
        </View>
    )
}

export default TermPurchase

const styles = StyleSheet.create({
    lastCom: {
        padding: 10,
        marginTop: 10,
        backgroundColor: COLORS.white,
        marginBottom: 10
    },
    lastText: {
        fontSize: 18,
        fontFamily: 'mon-sb'
    }
})
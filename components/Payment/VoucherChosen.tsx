import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { COLORS } from '../../assets'

const VoucherChosen = () => {
    return (
        <View style={styles.voucherContainer}>

            <View style={{}}>
                <Text style={styles.voucherTextLabel}>FTai Voucher</Text>
            </View>
            <View style={styles.voucherBox}>
                <Text style={styles.voucherText}>Miễn phí vận chuyển</Text>
                <AntDesign name="right" size={24} color={COLORS.darkGray} />
            </View>
        </View>
    )
}

export default VoucherChosen

const styles = StyleSheet.create({
    voucherContainer: {
        height: 60,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    voucherTextLabel: {
        fontSize: 18,
        fontFamily: 'mon-sb'
    },
    voucherText: {
        fontSize: 12,
        fontFamily: 'mon-sb',
        color: 'green',
        borderWidth: 1,
        borderColor: 'green',
        padding: 5
    },
    voucherBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    }
})
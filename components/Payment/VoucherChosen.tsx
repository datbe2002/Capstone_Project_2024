import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { COLORS } from '../../assets'
import { useAfterVoucher } from '../../app/store/store'
import { transNumberFormatter } from './ShippingFee'
import { router } from 'expo-router'

// interface VoucherChosenProps {
//     totalPay: number
// }

const VoucherChosen = ({ totalPrice }: any) => {

    const { itemVoucher } = useAfterVoucher()

    return (
        <View style={styles.voucherContainer}>

            <View style={{}}>
                {itemVoucher?.code != null ? <View style={styles.textContainerAfterChose}>
                    <Text style={styles.textFront}>Đã áp dụng phiếu giảm giá</Text>
                    <Text style={styles.textBack}>1 phiếu giảm giá đã được sử dụng</Text>
                </View> : <Text style={styles.voucherTextLabel}>FTai Voucher</Text>}

            </View>
            <Pressable style={styles.voucherBox} onPress={() => router.push({
                pathname: "/voucher",
                params: { totalPrice: totalPrice },
            })}>
                {itemVoucher?.code != null ? <Text style={styles.moneyVoucher}>-{transNumberFormatter(itemVoucher.totalVoucherMoney)}đ</Text> : <Text style={styles.voucherText}>Chọn FTai Voucher</Text>}
                <AntDesign name="swap" size={24} color={COLORS.darkGray} />
            </Pressable>
        </View>
    )
}

export default VoucherChosen

const styles = StyleSheet.create({
    voucherContainer: {
        marginTop: 10,
        height: 60,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: COLORS.white
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
    },
    textContainerAfterChose: {
        width: 200
    },
    textFront: {
        fontSize: 14,
        fontFamily: 'mon-sb',
    },
    textBack: {
        fontFamily: 'mon-sb',
        color: COLORS.darkGray
    },
    moneyVoucher: {
        fontSize: 18,
        fontFamily: 'mon-b',
        color: COLORS.primary
    }
})
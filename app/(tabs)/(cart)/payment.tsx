import { useIsFocused } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../assets'
import AddressChosen from '../../../components/Address/AddressChosen'
import NoteForShop from '../../../components/Payment/NoteForShop'
import PaymentMethodChosen from '../../../components/Payment/PaymentMethodChosen'
import ShippingFee, { transNumberFormatter } from '../../../components/Payment/ShippingFee'
import TotalPriceComponent from '../../../components/Payment/TotalPriceComponent'
import VoucherChosen from '../../../components/Payment/VoucherChosen'
import { getAddress } from '../../context/addressApi'
import { useAddressChange, useOrderItems, useUserIDStore } from '../../store/store'

const Payment = () => {
    const { userId } = useUserIDStore()
    const { orderItems, setOrderItems } = useOrderItems();

    const [note, setNote] = useState<string | null>(null)
    const { setSelectedAddress, selectedAddress } = useAddressChange()
    const getUserAddress = useQuery({
        queryKey: ["address", userId],
        queryFn: () => getAddress(userId),

    });
    useEffect(() => {
        if (getUserAddress?.isSuccess && getUserAddress?.data) {
            const data1 = getUserAddress?.data?.data?.find((data1: any) => data1.isDefault === true);
            setSelectedAddress(data1);
        }
    }, [getUserAddress?.isSuccess, getUserAddress?.data?.data]);

    console.log('selectedAddress', selectedAddress)
    const totalProd = 1
    const totalPrice = 10000
    const shippingFeePrice = 10000
    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <AddressChosen addressData={selectedAddress} />
                <ShippingFee addressId={selectedAddress.id} />
                <NoteForShop note={note} setNote={setNote} />
                {/* Bao gồm tiền hàng và shipping fee */}
                <View style={styles.totalPriceContainer}>
                    <View >
                        <Text style={styles.label}>{`Tổng số tiền (${totalProd} sản phẩm):`}</Text>
                    </View>
                    <Text style={styles.totalPrice}><Text style={styles.vndText}>đ</Text>{transNumberFormatter(10000)}</Text>
                </View>

                <View style={styles.voucherNpayment}>
                    <VoucherChosen />
                    <PaymentMethodChosen />
                </View>
                <TotalPriceComponent totalPrice={totalPrice} shippingFeePrice={shippingFeePrice} />
                <View style={styles.lastCom}>
                    <Text style={styles.lastText}>Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản của FTai Store</Text>
                </View>
            </ScrollView>
            <View style={styles.footerPay}>
                <View style={styles.mainTotalPrice}>
                    <Text style={styles.labelMain}>Tổng thanh toán</Text>
                    <Text style={styles.mainPrice}>đ180000</Text>
                </View>
                <Pressable style={styles.checkoutBtn}>
                    <Text style={styles.textBtn}>Đặt hàng</Text>
                </Pressable>
            </View>
        </View>

    )
}

export default Payment

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        position: "relative",
    },
    container: {},
    totalPriceContainer: {
        height: 60,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        alignItems: 'center',
    },
    totalPrice: {
        fontSize: 20,
        fontFamily: 'mon-b',
        color: COLORS.primary
    },
    vndText: {
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    label: {
        fontSize: 18,
        fontFamily: 'mon-sb'
    },
    voucherNpayment: {
        marginTop: 10,
        backgroundColor: COLORS.white,
    },
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
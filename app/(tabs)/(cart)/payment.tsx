import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import AddressChosen from '../../../components/Address/AddressChosen'
import ItemCardPayment from '../../../components/Payment/ItemCardPayment'
import NoteForShop from '../../../components/Payment/NoteForShop'
import PaymentMethodChosen from '../../../components/Payment/PaymentMethodChosen'
import ShippingFee from '../../../components/Payment/ShippingFee'
import TermPurchase from '../../../components/Payment/TermPurchase'
import TotalAmountPrice from '../../../components/Payment/TotalAmountPrice'
import TotalConfirmCheckout from '../../../components/Payment/TotalConfirmCheckout'
import TotalPriceComponent from '../../../components/Payment/TotalPriceComponent'
import VoucherChosen from '../../../components/Payment/VoucherChosen'
import { getAddress } from '../../context/addressApi'
import { useAddressChange, useAfterVoucher, useOrderItems, useUserIDStore } from '../../store/store'

const Payment = () => {
    const { userId } = useUserIDStore()
    const { orderItems } = useOrderItems();
    const { setSelectedAddress, selectedAddress } = useAddressChange()
    const [note, setNote] = useState<string | null>(null)
    const [shippingFeePrice, setShippingFeePrice] = useState<any | null>(null)
    const [order] = useState<any | null>(orderItems.items)
    const { itemVoucher, setItemVoucher } = useAfterVoucher()

    const totalAmount = orderItems.totalQuantityProd
    const totalPrice = orderItems.total
    const totalVoucher = itemVoucher.totalVoucherMoney || 0

    const totalPay = totalPrice + shippingFeePrice - totalVoucher
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

    //reset voucher if total price changed
    useEffect(() => {
        setItemVoucher({
            code: null,
            totalVoucherMoney: null
        })
    }, [totalPrice])

    const transformedArray = order.map((item: any) => {
        return {
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            size: item.size,
            color: item.color
        }
    });
    const handleCheckout = () => {
        const orderPad = {
            userId,
            note: note,
            totalAmount,
            shippingFee: shippingFeePrice,
            promotionCode: "string",
            paymentMethod: 1,
            addressId: selectedAddress.id,
            orderItems: transformedArray
        }
        console.log('orderPad', orderPad)
    }


    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <AddressChosen addressData={selectedAddress} />
                <ItemCardPayment order={order} />
                <ShippingFee addressId={selectedAddress.id} setShippingFeePrice={setShippingFeePrice} />
                <NoteForShop note={note} setNote={setNote} />
                <TotalAmountPrice totalAmount={totalAmount} totalPrice={totalPrice} />
                <VoucherChosen totalPrice={totalPrice} />
                <PaymentMethodChosen />
                <TotalPriceComponent totalPrice={totalPrice} shippingFeePrice={shippingFeePrice} totalVoucher={totalVoucher} />
                <TermPurchase />
            </ScrollView>
            <TotalConfirmCheckout totalPay={totalPay} handleCheckout={handleCheckout} />

        </View>

    )
}

export default Payment

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        position: "relative",
    },
})
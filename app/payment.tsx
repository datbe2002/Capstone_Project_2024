import React, { useEffect, useState } from "react";
import ShippingFee from "../components/Payment/ShippingFee";
import TermPurchase from "../components/Payment/TermPurchase";
import TotalAmountPrice from "../components/Payment/TotalAmountPrice";
import TotalConfirmCheckout from "../components/Payment/TotalConfirmCheckout";
import TotalPriceComponent from "../components/Payment/TotalPriceComponent";
import VoucherChosen from "../components/Payment/VoucherChosen";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import { getAddress } from "./context/addressApi";
import {
  useAddressChange,
  useAfterVoucher,
  useOrderIdSuccess,
  useOrderItems,
  useUserIDStore,
} from "./store/store";
import { checkoutCart } from "./context/checkoutApi";
import { Alert } from "react-native";
import AddressChosen from "../components/Address/AddressChosen";
import ItemCardPayment from "../components/Payment/ItemCardPayment";
import NoteForShop from "../components/Payment/NoteForShop";
import PaymentMethodChosen from "../components/Payment/PaymentMethodChosen";
import * as WebBrowser from 'expo-web-browser';
import LoadingComponent from "../components/LoadingComponent";

const Payment = () => {
  const { userId } = useUserIDStore();
  const { orderItems, setOrderItems } = useOrderItems();
  const { setSelectedAddress, selectedAddress } = useAddressChange();
  const [note, setNote] = useState<string | null>(null);
  const [shippingFeePrice, setShippingFeePrice] = useState<any | null>(null);
  const [order] = useState<any | null>(orderItems.items);
  const { itemVoucher, setItemVoucher } = useAfterVoucher();
  const totalAmount = orderItems.totalQuantityProd;
  const totalPrice = orderItems.total;
  const totalVoucher = itemVoucher.totalVoucherMoney || 0;
  const totalPay = totalPrice + shippingFeePrice - totalVoucher;
  const getUserAddress = useQuery({
    queryKey: ["address", userId],
    queryFn: () => getAddress(userId),
  });
  const currAddress = getUserAddress?.data?.data.filter(
    (add: any) => add.isDeleted === false
  );

  useEffect(() => {
    if (getUserAddress?.isSuccess && getUserAddress?.data) {
      if (currAddress.length > 0) {
        const data1 = currAddress.find(
          (data1: any) => data1.isDefault === true
        );
        setSelectedAddress(data1);
      } else {
        router.push("/addaddress");
      }
    }
  }, [getUserAddress?.isSuccess, getUserAddress?.data?.data]);

  //reset voucher if total price changed
  useEffect(() => {
    setItemVoucher({
      code: null,
      totalVoucherMoney: null,
    });
  }, [totalPrice]);

  const transformedArray = order.map((item: any) => {
    return {
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      size: item.size,
      color: item.color,
    };
  });
  const [loading, setLoading] = useState<boolean>(false)
  const { setOrderIdSucc } = useOrderIdSuccess()
  const completePayment = async (url: string) => {
    await new Promise((resolve) => setTimeout(resolve, 8000));
    setLoading(false);
    router.push('/success_payment');
  };
  const handleCheckoutUrl = async (paymentUrl: string) => {
    await WebBrowser.openBrowserAsync(paymentUrl)
    setLoading(true)
    await completePayment(paymentUrl);
  }
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => checkoutCart(data),
    onSuccess: (response: any) => {
      const { paymentUrl, orderId } = response.data;
      setOrderIdSucc(orderId)
      Alert.alert("Thông báo", "Bạn hãy chọn OK để thanh toán", [
        // { text: "OK", onPress: () => Linking.openURL(paymentUrl) },
        { text: "OK", onPress: () => handleCheckoutUrl(paymentUrl) },
      ]);
    },
    onError: (err) => {
      console.error("Checkout error:", err);
    },
  });

  const handleCheckout = async () => {
    const orderPad = {
      userId,
      note: note,
      totalAmount: totalPay,
      shippingFee: shippingFeePrice,
      promotionCode: itemVoucher.code,
      paymentMethod: 1,
      addressId: selectedAddress.id,
      orderItems: transformedArray,
    };
    await mutate(orderPad);
  };
  return (
    <View style={styles.mainContainer}>
      {loading && <LoadingComponent />}
      <ScrollView>
        <AddressChosen addressData={selectedAddress} />
        <ItemCardPayment order={order} />
        <ShippingFee
          addressId={selectedAddress.id}
          setShippingFeePrice={setShippingFeePrice}
        />
        <NoteForShop note={note} setNote={setNote} />
        <TotalAmountPrice totalAmount={totalAmount} totalPrice={totalPrice} />
        <VoucherChosen totalPrice={totalPrice} />
        <PaymentMethodChosen />
        <TotalPriceComponent
          totalPrice={totalPrice}
          shippingFeePrice={shippingFeePrice}
          totalVoucher={totalVoucher}
        />
        <TermPurchase />
      </ScrollView>
      <TotalConfirmCheckout
        totalPay={totalPay}
        handleCheckout={handleCheckout}
      />
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: "relative",
  },
});
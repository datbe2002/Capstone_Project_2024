import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Linking, ScrollView, StyleSheet, View } from "react-native";
import AddressChosen from "../components/Address/AddressChosen";
import LoadingComponent from "../components/LoadingComponent";
import ItemCardPayment from "../components/Payment/ItemCardPayment";
import NoteForShop from "../components/Payment/NoteForShop";
import PaymentMethodChosen from "../components/Payment/PaymentMethodChosen";
import ShippingFee from "../components/Payment/ShippingFee";
import TermPurchase from "../components/Payment/TermPurchase";
import TotalAmountPrice from "../components/Payment/TotalAmountPrice";
import TotalConfirmCheckout from "../components/Payment/TotalConfirmCheckout";
import TotalPriceComponent from "../components/Payment/TotalPriceComponent";
import VoucherChosen from "../components/Payment/VoucherChosen";
import { getAddress } from "./context/addressApi";
import { checkoutCart } from "./context/checkoutApi";
import {
  useAddressChange,
  useAfterVoucher,
  useOrderIdSuccess,
  useOrderItems,
  useTotalPaymentAmount,
  useUserIDStore,
} from "./store/store";

const Payment = () => {

  const { userId } = useUserIDStore();
  const { orderItems } = useOrderItems();
  const { setSelectedAddress, selectedAddress } = useAddressChange();
  const { setOrderIdSucc } = useOrderIdSuccess();
  const { itemVoucher, setItemVoucher } = useAfterVoucher();
  const { setTotalAmount, setDateNowPay } = useTotalPaymentAmount()
  const [paymentMethod, setPaymentMethod] = useState<number>(3);
  const [note, setNote] = useState<string | null>(null);
  const [shippingFeePrice, setShippingFeePrice] = useState<any>(10000);
  const [order] = useState<any | null>(orderItems.items);

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
        const add = currAddress.find(
          (add: any) => add.isDefault === true
        );
        setSelectedAddress(add);
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
      sku: item.sku,
    };
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => checkoutCart(data),
    onSuccess: (response: any) => {
      if (paymentMethod === 1) {
        const { paymentUrl, orderId } = response.data;
        setOrderIdSucc(orderId);
        Alert.alert("Thông báo", "Bạn hãy chọn OK để thanh toán", [
          { text: "OK", onPress: () => Linking.openURL(paymentUrl) },
        ]);
      } else {
        Alert.alert("Thông báo", "Bạn đã đặt hàng thành công", [
          { text: "OK", onPress: () => router.push("/homepage") },
        ]);
      }
    },
    onError: (err) => {
      console.error("Checkout error:", err);
    },
  });

  const handleCheckout = async () => {
    setTotalAmount(String(totalPay))
    setDateNowPay(new Date().toLocaleString())
    const orderPad = {
      userId,
      note: note,
      totalAmount: totalPay,
      shippingFee: shippingFeePrice,
      promotionCode: itemVoucher.code,
      paymentMethod: paymentMethod,
      addressId: selectedAddress.id,
      orderItems: transformedArray,
    };
    await mutate(orderPad);
  };
  return (
    <View style={styles.mainContainer}>
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
        <PaymentMethodChosen
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
        />
        <TotalPriceComponent
          totalPrice={totalPrice}
          shippingFeePrice={shippingFeePrice || 10000}
          totalVoucher={totalVoucher}
        />
        <TermPurchase />
      </ScrollView>
      <TotalConfirmCheckout
        isPending={isPending}
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

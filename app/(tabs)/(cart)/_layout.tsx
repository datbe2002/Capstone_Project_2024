import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { COLORS } from "../../../assets";
import BackButton from "../../../components/BackButton";

const CartLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="cart" options={{ headerShown: false }} />
      <Stack.Screen name="payment" options={{
        headerShown: true,
        title: 'Thanh toán',
        headerTitleAlign: 'center',
        headerLeft: BackButton,
        // headerRight: UserProfileButton,
        headerTitleStyle: {
          fontFamily: 'mon-b',
          fontSize: 25
        },
        headerTintColor: COLORS.primary,
      }} />
      <Stack.Screen name="addresspayment" options={{
        headerShown: true,
        title: 'Chọn địa chỉ nhận hàng',
        headerTitleAlign: 'center',
        headerLeft: BackButton,
        headerTitleStyle: {
          fontFamily: 'mon-b',
          fontSize: 25
        },
        headerTintColor: COLORS.primary,
      }} />
      <Stack.Screen name="addaddress" options={{
        headerShown: true,
        title: 'Thêm địa chỉ để thanh toán',
        headerTitleAlign: 'center',
        headerLeft: () => { return <View></View> },
        headerTitleStyle: {
          fontFamily: 'mon-b',
          fontSize: 25
        },
        headerTintColor: COLORS.primary,
      }} />
      <Stack.Screen name="addnewaddress" options={{
        headerShown: true,
        title: 'Thêm địa chỉ',
        headerTitleAlign: 'center',
        headerLeft: BackButton,
        headerTitleStyle: {
          fontFamily: 'mon-b',
          fontSize: 25
        },
        headerTintColor: COLORS.primary,
      }} />
      <Stack.Screen name="voucher" options={{
        headerShown: true,
        title: 'Chọn mã giảm giá',
        headerTitleAlign: 'center',
        headerLeft: BackButton,
        headerTitleStyle: {
          fontFamily: 'mon-b',
          fontSize: 25
        },
        headerTintColor: COLORS.primary,
      }} />
    </Stack>
  );
};

export default CartLayout;

const styles = StyleSheet.create({});

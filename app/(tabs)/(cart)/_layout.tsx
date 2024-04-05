import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const CartLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="cart" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CartLayout;

const styles = StyleSheet.create({});

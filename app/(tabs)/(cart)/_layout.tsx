import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const CartLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="cart" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CartLayout;

const styles = StyleSheet.create({});

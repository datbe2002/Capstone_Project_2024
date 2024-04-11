import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="homepage" />
      <Stack.Screen name="categories" />
      <Stack.Screen name="products" />
    </Stack>
  );
};

export default HomeLayout;

const styles = StyleSheet.create({});

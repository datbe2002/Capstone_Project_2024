import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const OrderLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='order' options={{ headerShown: false }} />
        </Stack>
    )
}

export default OrderLayout

const styles = StyleSheet.create({})
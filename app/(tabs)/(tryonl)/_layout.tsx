import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const WardroveLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='wardrove' options={{ headerShown: false }} />
        </Stack>
    )
}

export default WardroveLayout

const styles = StyleSheet.create({})
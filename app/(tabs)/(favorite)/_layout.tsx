import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const FavoriteLayout = () => {
    return (
        <Stack initialRouteName='favorite'>
            <Stack.Screen name='favorite' options={{ headerShown: false }} />
        </Stack>
    )
}

export default FavoriteLayout

const styles = StyleSheet.create({})
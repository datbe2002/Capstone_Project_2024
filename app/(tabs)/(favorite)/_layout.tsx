import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { COLORS } from '../../../assets'

const FavoriteLayout = () => {
    return (
        <Stack initialRouteName='favorite'>
            <Stack.Screen name='favorite' options={{
                headerShown: true,
                title: 'Sản phẩm yêu thích',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontFamily: 'mon-b',
                    fontSize: 25
                },
                headerTintColor: COLORS.primary,
            }} />
        </Stack>
    )
}

export default FavoriteLayout

const styles = StyleSheet.create({})
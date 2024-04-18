import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import BackButton from '../../../components/BackButton'
import { COLORS } from '../../../assets'
import UserProfileButton from '../../../components/UserProfileButton'

const MenuLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='menu' options={{ headerShown: false }} />
            <Stack.Screen name='setting' options={{
                headerShown: true,
                title: 'Cài đặt',
                headerTitleAlign: 'center',
                headerLeft: BackButton,
                headerRight: UserProfileButton,
                headerTitleStyle: {
                    fontFamily: 'mon-b',
                    fontSize: 25
                },
                headerTintColor: COLORS.primary,
            }} />

            <Stack.Screen name='profile' options={{
                headerShown: true,
                title: 'Hồ sơ cá nhân',
                headerTitleAlign: 'center',
                headerLeft: BackButton,
                headerTitleStyle: {
                    fontFamily: 'mon-b',
                    fontSize: 25
                },
                headerTintColor: COLORS.primary,
            }} />
            <Stack.Screen name='feedback' options={{
                headerShown: true,
                title: 'Đánh giá của bạn',
                headerTitleAlign: 'center',
                headerLeft: BackButton,
                headerTitleStyle: {
                    fontFamily: 'mon-b',
                    fontSize: 25
                },
                headerTintColor: COLORS.primary,
            }} />
            <Stack.Screen name='setpassword' options={{
                headerShown: true,
                title: 'Thay đổi mật khẩu',
                headerTitleAlign: 'center',
                headerLeft: BackButton,
                headerTitleStyle: {
                    fontFamily: 'mon-b',
                    fontSize: 25
                },
                headerTintColor: COLORS.primary,
            }} />
            <Stack.Screen name='chatStaff' options={{
                headerShown: true,
                title: 'Staff',
                headerTitleAlign: 'center',
                headerLeft: BackButton,
                headerTitleStyle: {
                    fontFamily: 'mon-b',
                    fontSize: 25
                },
                headerTintColor: COLORS.primary,

            }} />
            <Stack.Screen name='address' options={{
                headerShown: true,
                title: 'Sổ địa chỉ',
                headerTitleAlign: 'center',
                headerLeft: BackButton,
                headerTitleStyle: {
                    fontFamily: 'mon-b',
                    fontSize: 25
                },
                headerTintColor: COLORS.primary,
            }} />
            <Stack.Screen name='editcontact' options={{
                headerShown: true,
                title: 'Sửa địa chỉ',
                headerTitleAlign: 'center',
                headerLeft: BackButton,
                headerTitleStyle: {
                    fontFamily: 'mon-b',
                    fontSize: 25
                },
                headerTintColor: COLORS.primary,
            }} />
            <Stack.Screen name='editaddress' options={{
                headerShown: true,
                title: 'Sửa địa chỉ',
                headerTitleAlign: 'center',
                headerLeft: BackButton,
                headerTitleStyle: {
                    fontFamily: 'mon-b',
                    fontSize: 25
                },
                headerTintColor: COLORS.primary,
            }} />
            <Stack.Screen name='paymentmethod' options={{
                headerShown: true,
                title: 'Phương thức thanh toán',
                headerTitleAlign: 'center',
                headerLeft: BackButton,
                headerTitleStyle: {
                    fontFamily: 'mon-b',
                    fontSize: 25
                },
                headerTintColor: COLORS.primary,
            }} />

        </Stack>
    )
}

export default MenuLayout

const styles = StyleSheet.create({})
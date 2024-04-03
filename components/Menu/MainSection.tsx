import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUserStore } from '../../app/store/store'
import OrderComponent from './OrderComponent'

const MainSection = () => {
    const { userState } = useUserStore()
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.nameUser}>Chào, {userState?.fullName}</Text>
            </View>
            <OrderComponent />
        </View>
    )
}

export default MainSection

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        height: 50,
        paddingHorizontal: 10
    },
    nameUser: {
        fontFamily: 'mon-b',
        fontSize: 25
    }
})
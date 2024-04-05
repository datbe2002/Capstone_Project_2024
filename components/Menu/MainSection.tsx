import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUserStore } from '../../app/store/store'
import OrderComponent from './OrderComponent'
import MaybeUCanLike from '../Favorite/MaybeUCanLike'
import TopThings from './TopThings'

const { height, width } = Dimensions.get('window')
const MainSection = () => {
    const { userState } = useUserStore()
    return (
        <ScrollView style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.nameUser}>Chào, {userState?.fullName}</Text>
            </View>
            <OrderComponent />
            <TopThings />
            <MaybeUCanLike />

        </ScrollView>
    )
}

export default MainSection

const styles = StyleSheet.create({
    container: {
        height: height,
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
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
const { height, width } = Dimensions.get('window')

const RenderStatusOrder = ({ name, text, id, index }: any) => {
    return <Pressable style={styles.renderItemContainer} key={index} onPress={() => {
        router.push({
            pathname: "/order",
            params: { indexInitial: id },
        })
    }}>
        <View>
            <Feather name={name} size={25} color={COLORS.black} />
        </View>
        <View>
            <Text style={{ fontFamily: 'mon-sb', fontSize: 13 }}>{text}</Text>
        </View>
    </Pressable>
}


const OrderComponent = () => {
    const data = [
        { id: 1, name: 'archive', text: 'Đang xử lý', value: 1 },
        { id: 2, name: 'clock', text: 'Đợi duyệt', value: 4 },
        { id: 3, name: 'truck', text: 'Đang giao', value: 5 },
        { id: 4, name: 'check-square', text: 'Đã vận chuyển', value: 6 },
    ]

    return (
        <View style={styles.orderContainer}>
            <View style={styles.topCon}>
                <Text style={styles.textCon}>Đơn hàng của tôi</Text>
                <Pressable onPress={() => router.push({
                    pathname: "/order",
                    params: { indexInitial: 0 },
                })}>
                    <Text style={styles.press}>{'Xem tất cả'}</Text>
                </Pressable>
            </View>
            <FlatList
                style={{ display: 'flex', height: 80, gap: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                data={data}
                renderItem={({ item, index }) => <RenderStatusOrder index={index} name={item.name} text={item.text} id={item.id} />}
                keyExtractor={(item: any) => item.id}>
            </FlatList>
        </View>
    )
}

export default OrderComponent

const styles = StyleSheet.create({
    orderContainer: {
        height: 130,
        backgroundColor: COLORS.white
    },
    topCon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        width: width
    },
    textCon: {
        fontSize: 18,
        fontFamily: 'mon-b'
    },
    press: {
        fontSize: 16,
        fontFamily: 'mon-sb',
        color: COLORS.darkGray
    },
    renderItemContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    renderCol: {
        display: 'flex',
    }
})
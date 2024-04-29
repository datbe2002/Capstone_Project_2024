import { Alert, Dimensions, FlatList, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../assets'
import { transNumberFormatter } from '../Payment/ShippingFee'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
const { width } = Dimensions.get("window")
import {
    TouchableOpacity,
} from '@gorhom/bottom-sheet';
import { OrderItemCard } from './OrderItemCard'

const ListFooter = ({ totalWithoutShippingFee, data }: any) => {
    return (
        <View style={{ paddingHorizontal: 20, height: 100, justifyContent: 'center' }}>
            <View style={styles.Flex}>
                <Text style={styles.Text}>Tổng tiền hàng</Text>
                <Text style={styles.Text}>{transNumberFormatter(totalWithoutShippingFee)}đ</Text>
            </View>
            <View style={styles.Flex}>
                <Text style={styles.Text}>Phí vận chuyển</Text>
                <Text style={styles.Text}>{transNumberFormatter(data?.shippingFee)}đ</Text>
            </View>
            <View style={styles.Flex}>
                <Text style={[styles.Text, { color: COLORS.black, fontFamily: 'mon-b' }]}>Thành tiền</Text>
                <Text style={[styles.Text, { color: COLORS.black, fontFamily: 'mon-b' }]}>{transNumberFormatter(data?.totalAmount)}đ</Text>
            </View>
            <View>
                {data.payment.paymentMethod.name === 'COD' ?
                    <Text style={[styles.Text, { fontSize: 14 }]}>Thanh toán <Text style={{ color: COLORS.primary, fontFamily: 'mon-b' }}>{transNumberFormatter(data?.totalAmount)}đ</Text> khi nhận hàng</Text>
                    : <Text style={[styles.Text, { fontSize: 14 }]}>Đã thanh toán <Text style={{ color: COLORS.primary, fontFamily: 'mon-b' }}>{transNumberFormatter(data?.totalAmount)}đ</Text> bằng ZaloPay</Text>}
            </View>
        </View>
    )
}


const OrderItemView = ({ data, feedbackData, userStateId, feedbackRefetch }: any) => {
    const totalWithoutShippingFee = data?.orderItems?.reduce((total: number, item: any) => total + item.price * item.quantity, 0)
    return (
        <View style={styles.mainCard}>
            <FlatList
                data={data?.orderItems}
                keyExtractor={(item: any, index) => item?.productId + `${index.toString()}`}
                renderItem={({ item, index }) => <OrderItemCard index={index} item={item} userStateId={userStateId} status={data?.status} feedbackData={feedbackData} feedbackRefetch={feedbackRefetch} />}
                ListFooterComponent={<ListFooter totalWithoutShippingFee={totalWithoutShippingFee} data={data} />}
            />
        </View>
    )
}

export default OrderItemView

const styles = StyleSheet.create({
    Flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    Text: {
        fontFamily: 'mon-sb',
        fontSize: 16,
        color: COLORS.darkGray
    },

    textConfirm: {
        fontFamily: 'mon-sb',
        fontSize: 16,
        color: '#20AC02'
    },
    midd: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray
    },
    mainCard: {
        backgroundColor: COLORS.white,
        marginVertical: 10,
    },
    status: {
        padding: 10,
        display: 'flex',
        alignItems: 'flex-end'
    },
    statusText: {
        fontFamily: 'mon-sb',
        fontSize: 16,
        color: COLORS.primary
    },
    card: {
        alignSelf: "center",
        height: 130,
        width: '80%',
        display: "flex",
        flexDirection: "row",
        gap: 10,
    },
    horizWrapper: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    vertiWrapper: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 5,
    },

    imgWrapper: {
        height: "100%",
        width: 120,
        alignItems: "center",
        justifyContent: "center",
    },
    img: {
        borderColor: COLORS.gray,
        borderWidth: 1,
        height: 110,
        width: 110,
        objectFit: "cover",
        backgroundColor: "transparent",
    },
    iconWrapper: {
        height: 44,
        width: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.white,
        position: "absolute",
        bottom: 5,
        left: 5,
        elevation: 2,
    },
    icon: {},
    info: {
        width: width * 0.5,
        padding: 10,
    },
    name: {
        width: "100%",
        textAlign: "left",
        fontFamily: "mon-sb",
        fontSize: SIZES.medium,
    },
    description: {
        width: "100%",
    },
    price: {
        fontFamily: "mon-b",
        fontSize: SIZES.medium,
    },
    quantityWrapper: {
        height: 40,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        gap: 10,
    },
    // this is modal
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        width: width,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})
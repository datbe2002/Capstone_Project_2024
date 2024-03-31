import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CartItem } from '../../constants/Type'
import { COLORS, SIZES } from '../../assets'


const { height, width } = Dimensions.get("window");

const ItemCardPayment = ({ order }: any) => {
    return (
        <View style={styles.cardProdContainer}>

            {order.map((order: any, index: number) => (
                <View key={index}>
                    <View style={styles.card}>
                        <View style={styles.imgWrapper}>
                            <Image
                                style={styles.img}
                                source={
                                    order.product?.defaultImage
                                        ? { uri: order.product.defaultImage }
                                        : require("../../assets/images/default.png")
                                }
                            />
                        </View>
                        <View style={styles.info}>
                            <View style={styles.vertiWrapper}>
                                <Text style={styles.name}>{order?.product?.name}</Text>
                                <Text style={styles.description} numberOfLines={2}>
                                    Size: {order?.size}
                                </Text>
                                <View
                                    style={[
                                        styles.horizWrapper,
                                        {
                                            width: "100%",
                                            justifyContent: "flex-start",
                                        },
                                    ]}
                                >
                                    <Text style={[styles.description, { width: "auto" }]}>
                                        Màu:
                                        {/* {order?.color} */}
                                    </Text>
                                    <View
                                        style={{ borderRadius: 50, borderWidth: 1, borderColor: COLORS.darkGray, height: 20, width: 20, backgroundColor: order?.color }}
                                    ></View>
                                </View>
                            </View>
                            <View style={styles.horizWrapper}>
                                <Text style={styles.price}>đ {order?.price}</Text>
                                <View style={styles.quantityWrapper}>
                                    <Text style={styles.price}>x{order?.quantity}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            ))}
        </View>
    )
}

export default ItemCardPayment

const styles = StyleSheet.create({
    cardProdContainer: {
        display: 'flex',
        marginBottom: 10,
        gap: 5,
        marginHorizontal: 5,
    },
    card: {
        alignSelf: "center",
        height: 120,
        width: '100%',
        display: "flex",
        flexDirection: "row",
        backgroundColor: COLORS.white,
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
})
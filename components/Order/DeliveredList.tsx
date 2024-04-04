import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../assets'
import { transNumberFormatter } from '../Payment/ShippingFee';
import { Feather } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

const DeliveredCard = ({ item }: any) => {
    const getOrderStatusMessageSwitch = (status: string) => {
        switch (status) {
            case 'Hoàn thành':
                return 'Đơn hàng đã được giao thành công';
            case 'Đang giao':
                return 'Đơn hàng đang được giao';
            case 'Đang xử lý':
                return 'Đơn hàng đang được xử lý';
            case 'Đợi duyệt':
                return 'Đơn hàng đang đợi duyệt';
            default:
                return 'Trạng thái đơn hàng không xác định';
        }
    };

    return <View style={styles.mainCard}>
        <View style={styles.status}>
            <Text style={styles.statusText}>{item.status}</Text>
        </View>
        <View style={styles.card}>
            <View style={styles.imgWrapper}>
                <Image
                    style={styles.img}
                    source={require("../../assets/images/default.png")
                    }
                />
            </View>
            <View style={styles.info}>
                <View style={styles.vertiWrapper}>
                    <Text style={styles.name}>{item?.items[0]?.name}</Text>
                    <Text style={styles.description} numberOfLines={2}>
                        Size: {item?.items[0].size}
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
                            style={{ borderRadius: 50, borderWidth: 1, borderColor: COLORS.darkGray, height: 20, width: 20, backgroundColor: item?.items[0].color }}
                        ></View>
                    </View>
                </View>
                <View style={styles.horizWrapper}>
                    <Text style={[styles.price, {
                        color: COLORS.primary,
                    }]}>đ {transNumberFormatter(item?.items[0].price)}</Text>
                    <View style={styles.quantityWrapper}>
                        <Text style={styles.price}>x{item?.items[0]?.quantity}</Text>
                    </View>
                </View>
            </View>
        </View>
        <View style={styles.midd}>
            <View>
                <Text style={styles.textTotalProd}>{item.totalQuantityProd} sản phẩm</Text>
            </View>
            <View>
                <Text style={styles.textTotalProd}>Thành tiền:<Text style={{ fontFamily: 'mon-b', color: COLORS.primary }}> {transNumberFormatter(item.total)}đ</Text> </Text>
            </View>
        </View>
        <View style={styles.midd}>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <Feather name='truck' size={25} color={"#20AC02"} />
                <Text style={styles.textConfirm}>
                    {getOrderStatusMessageSwitch(item.status)}
                </Text>
            </View>
            <View>

            </View>
        </View>
    </View>
}



const DeliveredList = () => {
    const data = [{
        id: 1,
        items: [
            {
                name: 'áo bà ba',
                color: "#FF9966",
                price: 130000,
                quantity: 5,
                size: "M",
                defaultImage: "https://i.pinimg.com/564x/48/8f/5c/488f5c68300d3c7ad9182616cf4a5c20.jpg"
            },
            {
                name: 'áo si đa',
                color: "#FF9966",
                price: 120000,
                quantity: 1,
                size: "M",
                defaultImage: "https://i.pinimg.com/564x/48/8f/5c/488f5c68300d3c7ad9182616cf4a5c20.jpg"
            }
        ],
        total: 770000,
        totalQuantityProd: 6,
        status: 'Hoàn thành'
    },
    {
        id: 2,
        items: [
            {
                name: 'áo si đa',
                color: "#FF9966",
                price: 130000,
                quantity: 5,
                size: "M",
                defaultImage: "https://i.pinimg.com/564x/48/8f/5c/488f5c68300d3c7ad9182616cf4a5c20.jpg"
            },
            {
                color: "#FF9966",
                price: 120000,
                quantity: 1,
                size: "M",
                defaultImage: "https://i.pinimg.com/564x/48/8f/5c/488f5c68300d3c7ad9182616cf4a5c20.jpg"
            }
        ],
        total: 770000,
        totalQuantityProd: 6,
        status: 'Hoàn thành'
    },
    ]




    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) => <DeliveredCard item={item} />}
                keyExtractor={(item: any) => item.id}
            />
        </View>
    )
}

export default DeliveredList

const styles = StyleSheet.create({
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
        width: '100%',
        display: "flex",
        flexDirection: "row",
        backgroundColor: COLORS.white,
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray
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
    textTotalProd: {
        fontFamily: "mon-sb",
        fontSize: 16,
        color: COLORS.darkGray
    }
})
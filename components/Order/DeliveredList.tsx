import { ActivityIndicator, Dimensions, FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import { COLORS, SIZES } from '../../assets'
import { transNumberFormatter } from '../Payment/ShippingFee';
import { Feather, Fontisto } from '@expo/vector-icons';
import EmptyComponentCustom from '../EmptyComponentCustom';
import { router } from 'expo-router';
import { dateConvert } from '../Voucher/VoucherCard';
import { Skeleton } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get("window");
interface OrderStatusDetail {
    message: string;
    color: string;
    trans: string;
}

// Define a type for the map including all possible statuses as keys
type OrderStatusMap = {
    [key: number]: OrderStatusDetail;
    default: OrderStatusDetail;
};
const DeliveredCard = ({ item }: any) => {
    const totalQuantity = item?.orderItems?.reduce((total: number, item: any) => total + item.quantity, 0);
    const orderStatusDetails: OrderStatusMap = {
        1: {
            message: 'Đơn hàng đang được xử lý',
            color: '#FFD700',
            trans: 'Đang xử lý',
        },
        4: {
            message: 'Đơn hàng đang đợi duyệt',
            color: '#007BFF',
            trans: 'Đợi duyệt',
        },
        5: {
            message: 'Đơn hàng đang được giao',
            color: '#FFA500',
            trans: 'Đang giao',
        },
        2: {
            message: 'Đơn hàng đã được giao thành công',
            color: '#20AC02',
            trans: 'Đã vận chuyển',
        },
        3: {
            message: 'Đơn hàng đã bị hủy',
            color: '#FF0000',
            trans: 'Đã hủy đơn',
        },
        default: {
            message: 'Trạng thái đơn hàng không xác định',
            color: '#FF0000',
            trans: 'Không xác định',
        },
    };

    const getStatusDetails = (status: number) => {
        return orderStatusDetails[status] || orderStatusDetails.default;
    };

    const { color, message, trans } = getStatusDetails(item.status)
    return (
        <Pressable style={styles.mainCard} onPress={() => router.push({
            pathname: '/order_detail',
            params: { orderId: item.id }
        })}>
            <View style={styles.status}>
                <Text style={styles.statusText}>{dateConvert(item.createAt)}</Text>
                <Text style={styles.statusText}>{trans}</Text>
            </View>
            <View style={styles.card}>
                <View style={styles.imgWrapper}>
                    <Image
                        style={styles.img}
                        source={
                            item?.orderItems[0]?.product.defaultImage
                                ? { uri: item?.orderItems[0]?.product.defaultImage }
                                : require("../../assets/images/default.png")
                        }
                    />
                </View>
                <View style={styles.info}>
                    <View style={styles.vertiWrapper}>
                        <Text style={styles.name}>{item?.orderItems[0]?.name}</Text>
                        <Text style={styles.description} numberOfLines={2}>
                            Size: {item?.orderItems[0].size}
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
                            </Text>
                            <View
                                style={{ borderRadius: 50, borderWidth: 1, borderColor: COLORS.darkGray, height: 20, width: 20, backgroundColor: item?.orderItems[0].color }}
                            ></View>
                        </View>
                    </View>
                    <View style={styles.horizWrapper}>
                        <Text style={[styles.price, {
                            color: COLORS.primary,
                        }]}>đ {transNumberFormatter(item?.orderItems[0].price)}</Text>
                        <View style={styles.quantityWrapper}>
                            <Text style={styles.price}>x{item?.orderItems[0]?.quantity}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.midd}>
                <View>
                    <Text style={styles.textTotalProd}>{totalQuantity || 'Chua co'} sản phẩm</Text>
                </View>
                <View>
                    <Text style={styles.textTotalProd}>Thành tiền:<Text style={{ fontFamily: 'mon-b', color: COLORS.primary }}> {transNumberFormatter(item.totalAmount)}đ</Text> </Text>
                </View>
            </View>
            <View style={styles.midd}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                    <Feather name='truck' size={25} color={color} />
                    <Text style={[styles.textConfirm, { color: color }]}>
                        {message}
                    </Text>
                </View>
            </View>
        </Pressable>)
}



const DeliveredList = ({ data, loading, refetch }: any) => {
    const [refreshing, setRefreshing] = useState(false);
    const skeletonData = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const onRefresh = useCallback(() => {
        refetch()
    }, []);
    return (
        <View>
            {!loading ?
                <View style={{
                    height: height
                }}>
                    {skeletonData.map((i) =>
                        <View key={i.id} style={{ width: width, backgroundColor: 'white', padding: 10, marginBottom: 20 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                <Skeleton
                                    LinearGradientComponent={LinearGradient}
                                    animation="wave"
                                    width={140}
                                    height={30}
                                />
                                <Skeleton
                                    LinearGradientComponent={LinearGradient}
                                    animation="wave"
                                    width={90}
                                    height={30}
                                />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                <Skeleton
                                    LinearGradientComponent={LinearGradient}
                                    animation="wave"
                                    width={110}
                                    height={120}
                                />
                                <View style={{ display: 'flex', gap: 15, flexDirection: 'column', justifyContent: 'flex-end' }}>
                                    <Skeleton
                                        LinearGradientComponent={LinearGradient}
                                        animation="wave"
                                        width={90}
                                        height={20}
                                    />
                                    <Skeleton
                                        LinearGradientComponent={LinearGradient}
                                        animation="wave"
                                        width={90}
                                        height={20}
                                    />
                                    <Skeleton
                                        LinearGradientComponent={LinearGradient}
                                        animation="wave"
                                        width={200}
                                        height={20}
                                    />
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                <Skeleton
                                    LinearGradientComponent={LinearGradient}
                                    animation="wave"
                                    width={100}
                                    height={30}
                                />
                                <Skeleton
                                    LinearGradientComponent={LinearGradient}
                                    animation="wave"
                                    width={180}
                                    height={30}
                                />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Skeleton
                                    LinearGradientComponent={LinearGradient}
                                    animation="wave"
                                    width={250}
                                    height={30}
                                />
                            </View>
                        </View>
                    )}
                </View>
                :
                <FlatList
                    ListEmptyComponent={<EmptyComponentCustom icon={<Fontisto name="justify" size={35} color={COLORS.white} />} text={'Bạn chưa có đơn hàng nào'} />}
                    data={data}
                    renderItem={({ item }) => <DeliveredCard item={item} />}
                    keyExtractor={(item: any) => item.id}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            }

        </View>
    )
}

export default memo(DeliveredList)

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
        flexDirection: 'row',
        justifyContent: 'space-between',
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
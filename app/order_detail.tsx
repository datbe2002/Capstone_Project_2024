import { Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import React, { useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native'
import { Dialog } from 'react-native-elements'
import { ScrollView } from 'react-native-virtualized-view'
import { COLORS } from '../assets'
import CustomButton from '../components/Button'
import OrderItemView from '../components/Order/OrderItemView'
import { cancelOrder, getOrderByOrderId } from './context/checkoutApi'
import { getFeedbackByUserId } from './context/feedbackApi'
import { useUserStore } from './store/store'

const OrderDetail = React.memo(() => {
    const { orderId } = useLocalSearchParams()
    const { data, isFetching, refetch } = useQuery({
        queryKey: ["orderDetail", orderId],
        queryFn: () => getOrderByOrderId(Number(orderId)),
        enabled: orderId !== null,
    });
    const [visible2, setVisible2] = useState<boolean>(false);
    const { userState } = useUserStore()
    const { data: feedbackData, isFetching: isFeedbackLoading, refetch: feedbackRefetch } = useQuery({
        queryKey: ["feedback", userState?.id],
        queryFn: () => getFeedbackByUserId(userState?.id),
        enabled: userState?.id !== null,
    });

    const STATUS_TEXT: any = {
        2: 'Đơn hàng đã hoàn thành',
        5: 'Đơn hàng đang được vận chuyển',
        4: 'Đơn hàng đang đợi xác nhận',
        3: 'Đơn hàng đã bị hủy',
        1: 'Đơn hàng đang đợi xử lý',
    };


    const OrderStatusText = ({ status }: any) => {
        // Fetch the status text using the status code, or default to an empty string if not found
        const statusMessage = STATUS_TEXT[status] || '';

        return (
            <Text style={{
                fontFamily: 'mon-sb', fontSize: 22, color: COLORS.white
            }}>
                {statusMessage}
            </Text>
        );
    };

    const getBackgroundColor = (status: number) => {
        switch (status) {
            case 1:
                return '#90E0EF';
            case 4:
                return COLORS.secondary;
            case 5:
                return COLORS.primary;
            case 2:
                return '#26AB9A';
            default:
                return COLORS.darkGray;
        }
    };
    const queryClient = useQueryClient()

    const { mutate: cancelOrderRe, isPending: cancelOrderLoading } = useMutation({
        mutationFn: (data: any) => cancelOrder(data),
        onSuccess: (response: any) => {
            refetch()
            setVisible2(!visible2);
            queryClient.invalidateQueries({ queryKey: ["order"] })
        },
        onError: (err) => {
            console.error("Error confirm:", err);
        },
    });
    const toggleDialog2 = () => {
        setVisible2(!visible2);
    };
    const cancelReasonRef = useRef<any>("")

    const handleGetValue = async () => {
        const reason = cancelReasonRef.current?.trim() || "Người dùng hủy đơn này"
        const data2 = {
            orderId: data?.data.id,
            reason: reason
        }
        await cancelOrderRe(data2)
    }

    return (
        <View style={styles.container}>
            {isFetching ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={COLORS.primary} size={30} />
            </View> :
                <ScrollView contentContainerStyle={styles.orderContainer} >
                    <View style={[styles.orderStatus, { backgroundColor: getBackgroundColor(data?.data?.status) }]}>
                        <View style={{ justifyContent: 'center', alignItems: 'flex-start', height: 150, paddingLeft: 10, width: '80%' }}>
                            <OrderStatusText status={data?.data?.status} />
                            <Text style={{ fontFamily: 'mon-sb', fontSize: 16, color: COLORS.white }}>{data?.data?.status === 1 ? 'Vui lòng đợi...' : data?.data?.status === 3 ? 'Hẹn gặp lại lần sau..' : 'Cảm ơn bạn đã mua sắm tại FTai Store!'}
                            </Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                            {data?.data?.status === 1 ? (
                                <MaterialIcons name="pending" size={50} color={COLORS.white} />
                            ) : (
                                !(data?.data?.status === 3) ? (
                                    <Ionicons name="checkmark-done-circle" size={50} color={COLORS.white} />
                                ) : (
                                    <MaterialCommunityIcons name="archive-cancel-outline" size={50} color={COLORS.white} />
                                )
                            )}
                        </View>
                    </View>
                    {data?.data?.status === 3 && <View style={{
                        padding: 10,
                        margin: 10,
                        backgroundColor: 'white',
                        gap: 10
                    }}>
                        <Text style={{
                            fontFamily: 'mon-sb', fontSize: 18, color: COLORS.errorColor
                        }}>Lý do hủy đơn</Text>
                        <Text style={{
                            fontFamily: 'mon-sb', fontSize: 16, color: COLORS.darkGray
                        }}>{data?.data?.cancelReason}</Text>
                    </View>}
                    <View>
                        <View style={styles.defaultAddressContainer}>
                            <View style={styles.infoDefault}>
                                <Fontisto name="map-marker-alt" size={24} color={COLORS.primary} />
                                <View style={styles.rightContainer}>
                                    <Text style={{ fontFamily: 'mon-sb', fontSize: 18 }}>
                                        Địa chỉ nhận hàng
                                    </Text>
                                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                                        <View style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Text style={{ color: COLORS.primary, fontFamily: 'mon-b', fontSize: 16 }}>{data?.data?.recipientName}</Text>
                                            <Text style={{ fontFamily: 'mon-sb', fontSize: 16, color: COLORS.darkGray }}>{data?.data?.recipientPhone}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontFamily: 'mon-sb', fontSize: 16, color: COLORS.darkGray }}>{data?.data?.recipientAddress}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <OrderItemView feedbackRefetch={feedbackRefetch} data={data?.data} userStateId={userState?.id} feedbackData={feedbackData?.data} />
                    {(data?.data?.status === 4 || data?.data?.status === 1) && <View style={{
                        margin: 10
                    }}>
                        <CustomButton buttonText={'Hủy đơn'} buttonColor={'errorColor'} onPress={toggleDialog2} />
                    </View>}

                    <Dialog
                        isVisible={visible2}
                        onBackdropPress={toggleDialog2}
                    >
                        {cancelOrderLoading ? <Dialog.Loading /> : <>
                            <Dialog.Title titleStyle={styles.title} title="Hủy đơn" />
                            <TextInput
                                onChangeText={(value) => (cancelReasonRef.current = value)}
                                style={styles.func}
                                placeholder='Lý do hủy đơn' />
                            <Dialog.Actions>
                                <Dialog.Button title="Xác nhận" onPress={handleGetValue} />
                                <Dialog.Button title="Hủy" onPress={toggleDialog2} />
                            </Dialog.Actions>
                        </>}
                    </Dialog>
                </ScrollView>}

        </View>
    )
})

export default OrderDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    orderContainer: {
        position: 'relative',
    },
    orderStatus: {
        height: 150,
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    func: {
        backgroundColor: COLORS.white,
        padding: 15,
        fontFamily: 'mon-sb',
        fontSize: 16,
        borderWidth: 1,
        borderColor: COLORS.darkGray
    },
    defaultAddressContainer: {
        height: 150,
        paddingHorizontal: 20,
        marginBottom: 10,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignContent: 'center'
    },
    infoDefault: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    rightContainer: {
        width: '85%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    }
})
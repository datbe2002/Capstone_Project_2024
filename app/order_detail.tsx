import { Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet"
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import React, { useCallback, useRef, useState } from 'react'
import { ActivityIndicator, Alert, Keyboard, StyleSheet, Text, View } from 'react-native'
import { AirbnbRating } from 'react-native-elements'
import { ScrollView } from 'react-native-virtualized-view'
import { COLORS } from '../assets'
import CustomButton from '../components/Button'
import OrderItemView from '../components/Order/OrderItemView'
import { getOrderByOrderId } from './context/checkoutApi'
import { getFeedbackByUserId, postFeedback } from './context/feedbackApi'
import { useUserStore } from './store/store'

const OrderDetail = () => {
    const { orderId } = useLocalSearchParams()
    const { data, isFetching } = useQuery({
        queryKey: ["order", orderId],
        queryFn: () => getOrderByOrderId(Number(orderId)),
        enabled: orderId !== null,
    });

    console.log('order', data)
    const { userState } = useUserStore()
    const [currProductId, setCurrProductId] = useState<number | null>(null)
    const [currProductName, setCurrProductName] = useState<string | null>(null)
    const [currRating, setCurrRating] = useState<number | null>(null)
    const [defaultRating, setDefaultRating] = useState<number>(0)
    const [comment, setComment] = useState<string | undefined>('')
    const bottomSheetRef = useRef<any>(null)
    const handleOpenBottom = (productId: number, productName: string) => {
        setCurrProductName(productName)
        setCurrProductId(productId)
        bottomSheetRef.current?.expand()
    }
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])
    const ratingCompleted = (rating: number) => {
        setCurrRating(rating)
    }
    const handleClose = () => {
        setCurrRating(null)
        setCurrProductId(null)
        setComment('')
        setDefaultRating(0)
        bottomSheetRef.current?.close()
    }

    const { mutate, isPending } = useMutation({
        mutationFn: (data: any) => postFeedback(data),
        onSuccess: (response: any) => {
            setCurrRating(null)
            setCurrProductId(null)
            setComment('')
            setDefaultRating(0)
            Keyboard.dismiss()
            feedbackRefetch();
            bottomSheetRef.current?.close()
        },
        onError: (err) => {
            Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại sau");
        },
    });


    const { data: feedbackData, isFetching: isFeedbackLoading, refetch: feedbackRefetch } = useQuery({
        queryKey: ["feedback", userState?.id],
        queryFn: () => getFeedbackByUserId(userState?.id),
        enabled: userState?.id !== null,
    });

    const handleSubmitFeedback = async () => {
        if (currProductId && currRating && comment) {
            const dataToPass = {
                orderId: orderId,
                productId: currProductId,
                userId: userState?.id,
                comment: comment,
                rating: currRating
            }
            await mutate(dataToPass)
        } else {
            Alert.alert("Thông báo", "Không được để trống Feedback")
        }
    }
    const STATUS_TEXT: any = {
        6: 'Đơn hàng đã hoàn thành',
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
                return 'yellow';
            case 4:
                return COLORS.secondary;
            case 5:
                return COLORS.primary;
            case 6:
                return '#26AB9A'; // Specific green color for completed orders
            default:
                return COLORS.darkGray; // Default color for other statuses
        }
    };

    return (
        <View style={styles.container}>
            {isFetching ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={COLORS.primary} size={30} />
            </View> :
                <ScrollView contentContainerStyle={styles.orderContainer}>
                    <View style={[styles.orderStatus, { backgroundColor: getBackgroundColor(data?.data?.status) }]}>
                        <View style={{ justifyContent: 'center', alignItems: 'flex-start', height: 150, paddingLeft: 10, width: '80%' }}>
                            <OrderStatusText status={data?.data?.status} />
                            <Text style={{ fontFamily: 'mon-sb', fontSize: 16, color: COLORS.white }}>{!(data?.data?.status === 1 || data?.data?.status === 3) ? 'Cảm ơn bạn đã mua sắm tại FTai Store!' : 'Hẹn gặp lại lần sau..'}</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                            {!(data?.data?.status === 1 || data?.data?.status === 3) ? <Ionicons name="checkmark-done-circle" size={50} color={COLORS.white} /> :
                                <MaterialCommunityIcons name="archive-cancel-outline" size={50} color={COLORS.white} />
                            }
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
                    <OrderItemView data={data?.data} handleOpenBottom=
                        {handleOpenBottom} feedbackData={feedbackData?.data} />

                </ScrollView>}
            {!isFetching && data?.data?.status === 4 && <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                margin: 10
            }}>
                <CustomButton buttonText={'Hủy đơn'} buttonColor={'errorColor'} />
            </View>}
            <BottomSheet
                snapPoints={["60%"]}
                ref={bottomSheetRef}
                index={-1}
                enablePanDownToClose={true}
                backdropComponent={renderBackdrop}
                backgroundStyle={{ backgroundColor: COLORS.white }}
                onClose={handleClose}
            >
                <BottomSheetView style={{ position: 'relative', height: '100%' }}>
                    <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 20 }}>
                        <View style={{ paddingBottom: 10 }}>
                            <Text style={{ fontFamily: 'mon-sb', fontSize: 16 }}>{`Hãy cho chúng tớ xin feedback của bạn về sản phẩm (${currProductName}) `}</Text>
                        </View>
                        <BottomSheetTextInput
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={text => setComment(text)}
                            value={comment}
                            style={{ borderWidth: 1, borderColor: COLORS.gray, fontFamily: 'mon-sb', fontSize: 16, borderRadius: 10 }}
                        />
                        <View style={{ paddingBottom: 10 }}>
                            <Text style={{ fontFamily: 'mon-sb', fontSize: 16, paddingTop: 10 }}>Hãy cho chúng tớ sao nhé: </Text>
                        </View>
                        <AirbnbRating
                            starContainerStyle={{
                                padding: 5,
                                borderWidth: 1,
                                borderColor: COLORS.gray,
                                borderRadius: 10
                            }}
                            count={5}
                            reviews={["Quá tệ", "OK", "Tốt", "Rất tốt", "Tuyệt vời"]}
                            defaultRating={defaultRating}
                            size={30}
                            onFinishRating={ratingCompleted}
                        />
                    </View>
                    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTopWidth: 2, borderTopColor: COLORS.gray, padding: 10 }}>
                        <CustomButton buttonText={isPending ? <ActivityIndicator color={COLORS.white} size={25} /> : 'Xác nhận'} onPress={handleSubmitFeedback} />
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </View>
    )
}

export default OrderDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    orderContainer: {
        position: 'relative',
        height: '100%',
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
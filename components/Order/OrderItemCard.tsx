import { ActivityIndicator, Alert, Dimensions, FlatList, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../assets'
import { transNumberFormatter } from '../Payment/ShippingFee'
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
const { width } = Dimensions.get("window")
import { AirbnbRating } from 'react-native-elements';
import CustomButton from '../Button'
import { useMutation } from '@tanstack/react-query'
import { postFeedback } from '../../app/context/feedbackApi'

export const OrderItemCard = ({ item, status, feedbackData, index, userStateId, feedbackRefetch }: any) => {
    //check feedback da ton tai chua
    const existedFeedback = !!feedbackData?.find((feedback: any) => feedback.orderItemProductId === item?.productId)
    return (
        <View key={index} style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={styles.card}>
                <View style={styles.imgWrapper}>
                    <Image
                        style={styles.img}
                        source={
                            item?.product?.defaultImage
                                ? { uri: item?.product?.defaultImage }
                                :
                                require("../../assets/images/default.png")
                        }
                    />
                </View>
                <View style={styles.info}>
                    <View style={styles.vertiWrapper}>
                        <Text style={styles.name}>{item?.product.name}</Text>
                        <Text style={styles.description} numberOfLines={2}>
                            Size: {item?.size}
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
                                style={{ borderRadius: 50, borderWidth: 1, borderColor: COLORS.darkGray, height: 20, width: 20, backgroundColor: item?.color }}
                            ></View>
                        </View>
                    </View>
                    <View style={styles.horizWrapper}>
                        <Text style={[styles.price, {
                            color: COLORS.primary,
                        }]}>{transNumberFormatter(item?.price)}đ </Text>
                        <View style={styles.quantityWrapper}>
                            <Text style={styles.price}>x{item?.quantity}</Text>
                        </View>
                    </View>
                </View>


            </View>
            {status === 2 && (
                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                    {existedFeedback ? (
                        <View
                            style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesome name="check-circle" size={40} color={"#26AB9A"} />
                            <Text style={{ textAlign: 'center', fontFamily: 'mon-sb', fontSize: 14 }}>Cảm ơn bạn đã feedback</Text>
                        </View>
                    ) : (
                        // <TouchableOpacity
                        //     style={{ justifyContent: 'center', alignItems: 'center' }}
                        //     onPress={() => handleOpenBottom(item.productId, item.product.name)}>
                        //     <MaterialCommunityIcons name="pencil-circle" size={40} color={COLORS.primary} />
                        //     <Text style={{ textAlign: 'center', fontFamily: 'mon-sb', fontSize: 14 }}>Feedback cho sản phẩm</Text>
                        // </TouchableOpacity>
                        <FeedbackModal item={item} userStateId={userStateId} feedbackRefetch={feedbackRefetch} />
                    )}
                </View>
            )}
        </View>
    )
}
const FeedbackModal = ({ item, userStateId, feedbackRefetch }: any) => {

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [comment, setComment] = useState<string | undefined>('')
    const [defaultRating, setDefaultRating] = useState<number>(0)
    const ratingCompleted = (rating: number) => {
        setCurrRating(rating)
    }
    const [currRating, setCurrRating] = useState<number | null>(null)
    const { mutate, isPending } = useMutation({
        mutationFn: (data: any) => postFeedback(data),
        onSuccess: (response: any) => {
            setCurrRating(null)
            setComment('')
            setDefaultRating(0)
            feedbackRefetch();
            setModalVisible(false);
        },
        onError: (err) => {
            setModalVisible(false);
            setComment('')
            Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại sau");
        },
    });
    const handleSubmitFeedback = async () => {
        if (item.productId && currRating && comment) {
            const dataToPass = {
                orderId: item.orderId,
                productId: item.productId,
                userId: userStateId,
                comment: comment,
                rating: currRating
            }
            await mutate(dataToPass)
        } else {
            Alert.alert("Thông báo", "Không được để trống Feedback")
        }
    }
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={[styles.centeredView, { position: 'relative' }]}>
                    <View style={styles.modalBackdrop}></View>
                    <View style={[styles.modalView]}>
                        <View style={{ width: width, alignItems: 'flex-end', padding: 20 }}>

                            <AntDesign onPress={() => setModalVisible(!modalVisible)} name="closecircleo" size={24} color="black" />
                        </View>
                        <View style={{ paddingHorizontal: 20 }}>
                            <Text style={{ fontFamily: 'mon-sb', fontSize: 16 }}>{`Hãy cho chúng tớ xin feedback của bạn về sản phẩm (${item.product.name}) `}</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={text => setComment(text)}
                                value={comment}
                                style={{ borderWidth: 1, borderColor: COLORS.gray, fontFamily: 'mon-sb', fontSize: 16, borderRadius: 10, marginTop: 10 }}
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
                            <CustomButton buttonText={'Xác nhận'} onPress={handleSubmitFeedback} />
                        </View>

                    </View>
                </View>
            </Modal>
            <Pressable
                style={{ justifyContent: 'center', alignItems: 'center' }}
                onPress={() => setModalVisible(true)}>
                <MaterialCommunityIcons name="pencil-circle" size={40} color={COLORS.primary} />
                <Text style={{ textAlign: 'center', fontFamily: 'mon-sb', fontSize: 14 }}>Feedback cho sản phẩm</Text>
            </Pressable>
        </View>
    );
}

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
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        height: 500,
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
        width: 50,
        alignItems: 'flex-end',
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
    modalBackdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black
        position: 'absolute',
        top: -30,
        bottom: 0,
        left: 0,
        right: 0,
    },
})
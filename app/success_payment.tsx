import { Dimensions, Image, Linking, StyleSheet, Text } from "react-native"
import { View } from "../components/Themed"
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons"
import { transNumberFormatter } from "../components/Payment/ShippingFee"
import CustomButton from "../components/Button"
import { COLORS } from "../assets"
import { router } from "expo-router"
import Background from "../components/BackGround"
import { useOrderIdSuccess, useTotalPaymentAmount } from "./store/store"
import { useMutation, useQuery } from "@tanstack/react-query"
import { confirmOrder } from "./context/checkoutApi"
const { height, width } = Dimensions.get('window')
const SuccessPayment = () => {
    const { totalAmount, date } = useTotalPaymentAmount()
    const { orderIdSucc } = useOrderIdSuccess()
    const { mutate, isPending } = useMutation({
        mutationFn: (data: any) => confirmOrder(data),
        onSuccess: (response: any) => {
            router.push('/(tabs)/(home)/homepage')
        },
        onError: (err) => {
            console.error("Error confirm:", err);
        },
    });
    const handleCheckUrl = async () => {
        await mutate(orderIdSucc)
    }

    return (
        <View style={styles.container}>
            {/* <Button title='check url' onPress={handleCheckUrl} /> */}
            <View style={styles.main3}>
                <View style={styles.main2}>
                    <View style={styles.main}>
                        <AntDesign name="checkcircle" size={100} color={"#2CD076"} />
                    </View>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.addText}>Giao dịch thành công</Text>
                <Text style={styles.successText}>{transNumberFormatter(totalAmount)}đ</Text>
                <View style={styles.information}>

                    <View style={styles.mention}>
                        <Ionicons name="information-circle-outline" size={24} color={COLORS.primary} />
                        <Text style={{ fontFamily: 'mon-sb' }}>Chúng mình đã nhận được tiền từ bạn</Text>
                    </View>
                    <View style={[styles.line1, { marginTop: 20 }]}>
                        <Text style={styles.leftText}>Thanh toán bằng: </Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Image source={require('../assets/images/zalopay.png')} alt="hinh anh" />
                            <Text style={styles.rightText}>Zalo Pay</Text>
                        </View>
                    </View>
                    <View style={styles.line1}>
                        <Text style={styles.leftText}>Thời gian thanh toán: </Text>
                        <Text style={styles.rightText}>{date} </Text>
                    </View>
                </View>
                <View style={[styles.whiteCircle, { position: 'absolute', bottom: 335, left: -17, }]}></View>
                <View style={[styles.whiteCircle, { position: 'absolute', bottom: 335, right: -17 }]}></View>
                <CustomButton buttonText={"Trở về trang chủ"} onPress={handleCheckUrl} />
            </View>
        </View>
    )
}

export default SuccessPayment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    whiteCircle: {
        height: 30,
        width: 30,
        borderRadius: 50,
        backgroundColor: '#F2F2F2',
    },
    main: {
        backgroundColor: COLORS.white,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main2: {
        backgroundColor: "#A4ECC5",
        padding: 15,
        borderRadius: 100,
    },
    main3: {
        padding: 18,
        backgroundColor: "#D8F3E8",
        borderRadius: 100,
    },
    box: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        marginTop: 20,
        width: width - 30,
    },
    information: {
        borderTopWidth: 3,
        borderStyle: 'dashed',
        borderColor: '#F2F2F2',
        marginVertical: 20,
        marginBottom: 100,
        position: 'relative',
    },
    line1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    leftText: {
        fontSize: 16,
        fontFamily: 'mon-sb',
        color: COLORS.darkGray
    },
    rightText: {
        fontSize: 16,
        fontFamily: 'mon-b',
    },
    successText: {
        fontSize: 25,
        fontFamily: 'mon-b',
        textAlign: 'center',
    },
    addText: {
        fontSize: 20,
        fontFamily: 'mon-sb',
        textAlign: 'center',
    },
    mention: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.primary,
        marginTop: 10,
        borderRadius: 10,
        gap: 5,
        backgroundColor: '#EAF0FF'
    }
})
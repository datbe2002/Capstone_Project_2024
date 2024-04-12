import { Linking, StyleSheet, Text } from "react-native"
import { View } from "../components/Themed"
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons"
import { transNumberFormatter } from "../components/Payment/ShippingFee"
import CustomButton from "../components/Button"
import { COLORS } from "../assets"
import { router } from "expo-router"
import Background from "../components/BackGround"
import { useOrderIdSuccess } from "./store/store"
import { useMutation, useQuery } from "@tanstack/react-query"
import { confirmOrder } from "./context/checkoutApi"


const SuccessPayment = () => {

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
        <Background imageKey="i3">
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

                    <Text style={styles.successText}>Thanh toán thành công</Text>
                    <Text style={styles.addText}>Cảm ơn quý khách đã tin tưởng</Text>
                    <View style={styles.information}>
                        <View style={styles.line1}>
                            <Text style={styles.leftText}>Tổng thanh toán: </Text>
                            <Text style={styles.rightText}>{transNumberFormatter(180000)}đ </Text>
                        </View>
                        <View style={styles.line1}>
                            <Text style={styles.leftText}>Thanh toán bằng: </Text>
                            <Text style={styles.rightText}>Zalo Pay </Text>
                        </View>
                    </View>
                    <CustomButton buttonText={"Trở về trang chủ"} onPress={handleCheckUrl} />
                </View>
            </View>
        </Background>
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
    },
    information: {
        marginVertical: 20,
        marginBottom: 100
    },
    line1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    },
    addText: {
        fontSize: 20,
        fontFamily: 'mon-sb',
    }
})
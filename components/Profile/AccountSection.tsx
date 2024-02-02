import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'

const AccountSection = () => {


    const number = '0934462524'
    const maskPhoneNumber = (phoneNumber: string) => {
        const visibleDigits = 3;
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength <= visibleDigits * 2) {
            return phoneNumber;
        }
        const visibleStart = phoneNumber.slice(0, visibleDigits);
        const visibleEnd = phoneNumber.slice(-visibleDigits);
        const maskedPhoneNumber = `${visibleStart}...${visibleEnd}`;
        return maskedPhoneNumber;
    };

    return (
        <View style={styles.account}>
            <View style={styles.componentText}>
                <Text style={styles.syntaxText}>Tài khoản</Text>
            </View>
            <View style={styles.lineFunc}>
                <View style={styles.accountId}>
                    <Text style={styles.mainText}>
                        Số tài khoản
                    </Text>
                    <Text style={styles.secondText}>
                        id: 654513873
                    </Text>
                </View>
                <View style={styles.twoLine}>
                    <Text style={styles.mainText}>
                        Tên đăng nhập
                    </Text>
                    <Text style={styles.secondText}>
                        user123456
                    </Text>
                </View>
                <View style={styles.twoLine}>
                    <Text style={styles.mainText}>
                        E-mail
                    </Text>
                    <Text style={styles.secondText}>
                        user123456@gmail.com
                    </Text>
                </View>
                <View style={styles.threeComp}>
                    <View>
                        <Text style={styles.mainText}>
                            Mật khẩu
                        </Text>
                        <Text style={styles.secondText}>
                            Thay đổi lần cuối: 190
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.changeComp} onPress={() => router.push('/(tabs)/(menu)/setpassword')}>
                        <Text style={styles.changeText}>Đổi</Text>
                        <View>
                            <AntDesign name="right" size={18} color={COLORS.blue1} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.threeComp}>
                    <View>
                        <Text style={styles.mainText}>
                            Số điện thoại
                        </Text>
                        <Text style={styles.secondText}>
                            {maskPhoneNumber(number)}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.changeComp} >
                        <Text style={styles.changeText}>Đổi</Text>
                        <View>
                            <AntDesign name="right" size={18} color={COLORS.blue1} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.signUpDate}>
                    <Text style={styles.mainText}>
                        Ngày đăng ký
                    </Text>
                    <Text style={styles.secondText}>
                        14/09/2023
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default AccountSection

const styles = StyleSheet.create({
    account: {
        height: 'auto',
        marginHorizontal: 10,
    },
    componentText: {
        height: 80,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    syntaxText: {
        color: COLORS.blue1,
        fontFamily: 'mon-sb',
        fontSize: 25,
    },
    lineFunc: {
        height: 'auto',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    accountId: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    mainText: {
        color: COLORS.primary,
        fontSize: 20,
        fontFamily: 'mon-sb',
    },
    secondText: {
        color: COLORS.blue1,
        fontFamily: 'mon',
        fontSize: 18
    },
    twoLine: {
        paddingTop: 10,
        paddingBottom: 10,
        borderTopColor: COLORS.gray,
        borderTopWidth: 1,
    },
    threeComp: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopColor: COLORS.gray,
        borderTopWidth: 1,
    },
    changeComp: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    changeText: {
        fontSize: 18,
        color: COLORS.blue1,
    },
    signUpDate: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopColor: COLORS.gray,
        borderTopWidth: 1,
    }
})
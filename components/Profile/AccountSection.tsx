import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../assets'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useUserStore } from '../../app/store/store'
import moment from 'moment'

const AccountSection = () => {
    const { userState } = useUserStore()
    console.log(userState)

    const [userData, setUserData] = useState(userState)

    const maskPhoneNumber = (phoneNumber: string) => {
        const visibleDigits = 3;
        const phoneNumberLength = phoneNumber?.length;
        if (phoneNumberLength <= visibleDigits * 2) {
            return phoneNumber;
        }
        const visibleStart = phoneNumber?.slice(0, visibleDigits);
        const visibleEnd = phoneNumber?.slice(-visibleDigits);
        const maskedPhoneNumber = `${visibleStart}...${visibleEnd}`;
        return maskedPhoneNumber;
    };

    const dobValidate = (dob: string) => {
        const dobTrans = moment(dob).format('DD/MM/YYYY');
        return dobTrans
    }

    return (
        <View style={styles.account}>
            <View style={styles.componentText}>
                <Text style={styles.syntaxText}>Tài khoản</Text>
                <Pressable onPress={() => router.push('/editprofile')}>
                    <Text style={styles.editButton}>Cập nhật thông tin</Text>
                </Pressable>
            </View>
            <View style={styles.lineFunc}>
                <View style={styles.accountId}>
                    <Text style={styles.mainText}>
                        Số tài khoản
                    </Text>
                    <Text style={styles.secondText}>
                        id: {userData?.id?.slice(0, 13)}
                    </Text>
                </View>
                <View style={styles.twoLine}>
                    <Text style={styles.mainText}>
                        E-mail
                    </Text>
                    <Text style={styles.secondText}>
                        {userData?.email}
                    </Text>
                </View>
                <View style={styles.threeComp}>
                    <View>
                        <Text style={styles.mainText}>
                            Mật khẩu
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
                            {userData?.phone ? maskPhoneNumber(userData?.phone) : "Chưa cập nhật số điện thoại"}
                        </Text>
                    </View>
                </View>
                <View style={styles.signUpDate}>
                    <Text style={styles.mainText}>
                        Ngày sinh
                    </Text>
                    <Text style={styles.secondText}>
                        {userData?.dob ? dobValidate(userData?.dob) : "Chưa cập nhật"}
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
    },
    syntaxText: {
        color: COLORS.blue1,
        fontFamily: 'mon-sb',
        fontSize: 25,
    },
    editButton: {
        fontFamily: 'mon-sb',
        fontSize: 16,
        color: COLORS.white,
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        padding: 5,
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
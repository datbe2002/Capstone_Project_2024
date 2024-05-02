import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../assets'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking'
const SupportAccount = () => {
    // const [result, setResult] = useState<any>(null);
    // const url1 = Linking.useURL()

    // if (url1) {
    //     const { hostname, path, queryParams } = Linking.parse(url1)
    //     console.log(hostname)
    //     console.log(path)
    //     console.log(queryParams)
    // }

    // const handleNav = async () => {
    //     const url = 'https://qcgateway.zalopay.vn/openinapp?order=eyJ6cHRyYW5zdG9rZW4iOiJBQ2djNzB4SXRGNVBReVJ1TDQyZzduZ3ciLCJhcHBpZCI6NTUzfQ=='
    //     let result1 = await WebBrowser.openAuthSessionAsync(url)
    //     setResult(result1);
    //     // router.push('/success_payment')
    // }

    return (
        <View>
            <View style={styles.componentText}>
                <Text style={styles.syntaxText}>Hỗ trợ</Text>
            </View>
            <View style={styles.lineFunc}>
                <Pressable style={styles.accountId} >
                    <Text style={styles.mainText}>
                        Tiêu chuẩn cộng đồng
                    </Text>
                    <View style={styles.changeComp} >
                        <View>
                            <AntDesign name="right" size={18} color={COLORS.darkGray} />
                        </View>
                    </View>
                </Pressable>
                <Pressable style={styles.threeComp}>
                    <Text style={styles.mainText}>
                        Điều khoản FTai
                    </Text>
                    <View style={styles.changeComp} >
                        <View>
                            <AntDesign name="right" size={18} color={COLORS.darkGray} />
                        </View>
                    </View>
                </Pressable>
                <Pressable style={styles.threeComp} onPress={() => router.push('/chatStaff')}>
                    <Text style={styles.mainText}>
                        Hỗ trợ
                    </Text>
                    <View style={styles.changeComp} >
                        <View>
                            <AntDesign name="right" size={18} color={COLORS.darkGray} />
                        </View>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

export default SupportAccount

const styles = StyleSheet.create({
    account: {
        height: 'auto',
        marginHorizontal: 10,
    },
    componentText: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    syntaxText: {
        color: COLORS.darkGray,
        fontFamily: 'mon-sb',
        fontSize: 17,
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
        color: COLORS.black,
        fontSize: 18,
        fontFamily: 'mon-sb',
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
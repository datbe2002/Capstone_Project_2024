import { AntDesign, Fontisto } from '@expo/vector-icons';
import React, { memo, useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../assets';
import { router } from 'expo-router';
import { ActivityIndicator } from 'react-native';

const AddressChosen = ({ addressData }: any) => {
    console.log('AddressChosen')
    return (
        <View>
            <Pressable onPress={() => {
                router.push('/addresspayment')
            }}>
                <View style={styles.defaultAddressContainer}>
                    {addressData?.recipientName !== null ? <View style={styles.infoDefault}>
                        <Fontisto name="map-marker-alt" size={24} color={COLORS.primary} />
                        <View style={styles.rightContainer}>
                            <Text style={{ fontFamily: 'mon-sb', fontSize: 18 }}>
                                Địa chỉ nhận hàng
                            </Text>
                            <View style={{ display: 'flex', flexDirection: 'column' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: COLORS.primary, fontFamily: 'mon-b', fontSize: 16, borderRightWidth: 2, borderColor: COLORS.darkGray, paddingRight: 10 }}>{addressData.recipientName}</Text>
                                    <Text style={{ fontFamily: 'mon-sb', fontSize: 16, paddingLeft: 10 }}>{addressData.recipientPhone}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontFamily: 'mon-sb', fontSize: 16 }}>{addressData.street}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontFamily: 'mon-sb', fontSize: 16 }}>{addressData.ward}, {addressData.district}, {addressData.province}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <AntDesign name="swap" size={24} color={COLORS.darkGray} />
                        </View>
                    </View> : <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={25} color={COLORS.primary} />
                    </View>}
                </View>
            </Pressable>
        </View>

    )
}

export default memo(AddressChosen)

const styles = StyleSheet.create({
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
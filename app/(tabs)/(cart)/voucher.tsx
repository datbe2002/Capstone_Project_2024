import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Tab, Text, TabView } from '@rneui/themed';
import { COLORS } from '../../../assets';
import AvailableVouchers from '../../../components/Voucher/AvailableVouchers';
import { getVoucher } from '../../context/voucherApi';
import { useQuery } from '@tanstack/react-query';
const Voucher = () => {
    const [index, setIndex] = useState(0);
    const { totalPrice } = useLocalSearchParams()
    const { data, isLoading } = useQuery({
        queryKey: ["voucher"],
        queryFn: getVoucher,
    });

    console.log(data)
    const dataVoucherAvailable = data?.data?.filter((da: any) => da.minTotalValue <= totalPrice)
    console.log(dataVoucherAvailable)

    return (
        <>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: COLORS.primary,
                    height: 3,
                }}
                containerStyle={{ backgroundColor: COLORS.white }}
            >
                <Tab.Item
                    title="Có sẵn"
                    titleStyle={{ fontFamily: 'mon-b', color: COLORS.primary }}
                    containerStyle={{

                    }}
                />
                <Tab.Item
                    title="Không khả dụng"
                    titleStyle={{ fontFamily: 'mon-b', color: COLORS.primary }}
                />

            </Tab>

            <TabView value={index} onChange={setIndex}>
                <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                    <AvailableVouchers totalPrice={totalPrice} dataVoucherAvailable={dataVoucherAvailable} />
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                    <Text h1>Favorite</Text>
                </TabView.Item>

            </TabView>
        </>
    )
}

export default Voucher

const styles = StyleSheet.create({})
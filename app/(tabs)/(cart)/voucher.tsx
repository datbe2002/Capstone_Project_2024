import { Tab, TabView } from '@rneui/themed';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../assets';
import AvailableVouchers from '../../../components/Voucher/AvailableVouchers';
import UnavailableVoucher from '../../../components/Voucher/UnavailableVoucher';
import { getVoucher } from '../../context/voucherApi';
const Voucher = () => {
    const [index, setIndex] = useState(0);
    const { totalPrice } = useLocalSearchParams()
    const { data, isLoading } = useQuery({
        queryKey: ["voucher"],
        queryFn: getVoucher,
    });

    const dataVoucherAvailable = data?.data?.filter((da: any) => da.minTotalValue <= totalPrice)
    const dataVoucherUnavailable = data?.data?.filter((da: any) => da.minTotalValue > totalPrice)


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
                    <UnavailableVoucher dataVoucherUnavailable={dataVoucherUnavailable} />
                </TabView.Item>

            </TabView>
        </>
    )
}

export default Voucher

const styles = StyleSheet.create({})
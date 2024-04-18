import { Tab, TabView } from '@rneui/themed';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { getVoucher } from './context/voucherApi';
import { COLORS } from '../assets';
import AvailableVouchers from '../components/Voucher/AvailableVouchers';
import UnavailableVoucher from '../components/Voucher/UnavailableVoucher';

const Voucher = () => {
    const [index, setIndex] = useState(0);
    const { totalPrice } = useLocalSearchParams();
    const { data, isLoading } = useQuery({
        queryKey: ["voucher"],
        queryFn: getVoucher,
    });

    const currentDate = new Date();

    const filterVouchers = (voucher: any) => {
        return {
            available: voucher.filter((v: any) => v.minTotalValue <= totalPrice && new Date(v.exprireDate) >= currentDate),
            unavailable: voucher.filter((v: any) => v.minTotalValue > totalPrice || new Date(v.exprireDate) < currentDate),
        };
    };


    const { available: dataVoucherAvailable, unavailable: dataVoucherUnavailable } = filterVouchers(data?.data?.filter((s: any) => s.isDeleted === false) || []);

    const tabItems = [
        { title: "Có sẵn", data: dataVoucherAvailable },
        { title: "Không khả dụng", data: dataVoucherUnavailable }
    ];

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
                {tabItems.map((item, idx) => (
                    <Tab.Item
                        key={idx}
                        title={item.title}
                        titleStyle={{ fontFamily: 'mon-b', color: COLORS.primary }}
                    />
                ))}
            </Tab>

            <TabView value={index} onChange={setIndex}>
                {tabItems.map((item, idx) => (
                    <TabView.Item key={idx} style={{ backgroundColor: 'white', width: '100%' }}>
                        {idx === 0 ? (
                            <AvailableVouchers totalPrice={totalPrice} dataVoucherAvailable={item.data} />
                        ) : (
                            <UnavailableVoucher dataVoucherUnavailable={item.data} />
                        )}
                    </TabView.Item>
                ))}
            </TabView>
        </>
    );
};

export default Voucher;

import { Tab, TabView } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { COLORS } from '../assets';
import { StyleSheet, Text } from 'react-native';
import DeliveredList from '../components/Order/DeliveredList';
import { useQuery } from '@tanstack/react-query';
import { getOrderByUserId } from './context/checkoutApi';
import { useUserIDStore } from './store/store';

const Order = () => {

    const { indexInitial } = useLocalSearchParams()
    const { userId } = useUserIDStore()
    const initialIndex = Number(indexInitial) >= 0 ? Number(indexInitial) : 0;
    const [index, setIndex] = useState<any>(initialIndex);
    useEffect(() => {
        setIndex(initialIndex);
    }, [initialIndex]);

    const { data } = useQuery({
        queryKey: ["order", userId],
        queryFn: () => getOrderByUserId(userId),
        enabled: userId !== null,
    });
    const pendingData = data?.data?.filter((fix: any) => fix.status === 1)
    const waitingData = data?.data?.filter((fix: any) => fix.status === 4)
    const deliveringData = data?.data?.filter((fix: any) => fix.status === 5)
    const deliveredData = data?.data?.filter((fix: any) => fix.status === 6)

    return (
        <>
            <Tab
                scrollable
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: COLORS.primary,
                    height: 3,
                }}
                containerStyle={{ backgroundColor: COLORS.white }}
            >
                <Tab.Item
                    title="Tất cả đơn hàng"
                    titleStyle={{ fontFamily: 'mon-b', color: COLORS.primary }}
                />
                <Tab.Item
                    title="Đang xử lý"
                    titleStyle={{ fontFamily: 'mon-b', color: COLORS.primary }}
                />
                <Tab.Item
                    title="Đợi duyệt"
                    titleStyle={{ fontFamily: 'mon-b', color: COLORS.primary }}
                />
                <Tab.Item
                    title="Đang giao"
                    titleStyle={{ fontFamily: 'mon-b', color: COLORS.primary }}
                />
                <Tab.Item
                    title="Đã vận chuyển"
                    titleStyle={{ fontFamily: 'mon-b', color: COLORS.primary }}
                />

            </Tab>

            <TabView value={index} onChange={setIndex} >
                <TabView.Item style={{ width: '100%' }}>
                    <DeliveredList data={data?.data} />

                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <DeliveredList data={pendingData} />
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <DeliveredList data={waitingData} />
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <DeliveredList data={deliveringData} />
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <DeliveredList data={deliveredData} />
                </TabView.Item>

            </TabView>
        </>
    )
}

export default Order

const styles = StyleSheet.create({})
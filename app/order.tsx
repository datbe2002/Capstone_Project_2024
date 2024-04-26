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

    const { data, isFetching } = useQuery({
        queryKey: ["order", userId],
        queryFn: () => getOrderByUserId(userId),
        enabled: userId !== null,
    });
    const filteredData = {
        all: data?.data,
        pending: data?.data?.filter((order: any) => order.status === 1),
        // cancelled: data?.data?.filter((order: any) => order.status === 3),
        waiting: data?.data?.filter((order: any) => order.status === 4),
        delivering: data?.data?.filter((order: any) => order.status === 5),
        delivered: data?.data?.filter((order: any) => order.status === 2),
    };
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
                    <DeliveredList data={filteredData.all} loading={isFetching} />
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <DeliveredList data={filteredData.pending} loading={isFetching} />
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <DeliveredList data={filteredData.waiting} loading={isFetching} />
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <DeliveredList data={filteredData.delivering} loading={isFetching} />
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <DeliveredList data={filteredData.delivered} loading={isFetching} />
                </TabView.Item>

            </TabView>
        </>
    )
}

export default Order

const styles = StyleSheet.create({})
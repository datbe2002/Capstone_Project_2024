import { Tab, TabView } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../../../assets';
import DeliveredList from '../../../components/Order/DeliveredList';
const Order = () => {

    const { indexInitial } = useLocalSearchParams()
    const initialIndex = Number(indexInitial) >= 0 ? Number(indexInitial) : 0;
    const [index, setIndex] = useState<any>(initialIndex);
    useEffect(() => {
        setIndex(initialIndex);
    }, [initialIndex]);
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
                <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                    <Text>all</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                    <Text>pending</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                    <Text>waiting</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                    <Text>delivering</Text>
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <DeliveredList />
                </TabView.Item>

            </TabView>
        </>
    )
}

export default Order

const styles = StyleSheet.create({})
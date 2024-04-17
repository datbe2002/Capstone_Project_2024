import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import EmptyComponentCustom from '../EmptyComponentCustom'
import { Entypo } from '@expo/vector-icons'
import VoucherCard2 from './VoucherCard2'
import { COLORS } from '../../assets'
const { height } = Dimensions.get('window')
const UnavailableVoucher = ({ dataVoucherUnavailable }: any) => {

    return (
        <View style={{ height: height }}>
            <FlatList style={{
                marginBottom: 120,
            }}
                data={dataVoucherUnavailable}
                renderItem={({ item }) =>
                    <VoucherCard2
                        item={item}
                    />}
                keyExtractor={item => item.id}
                ListEmptyComponent={
                    <EmptyComponentCustom
                        icon={<Entypo name="ticket" size={50} color={COLORS.white} />}
                        text='Bạn không có voucher không khả dụng' />
                }
            />
        </View>
    )
}

export default UnavailableVoucher

const styles = StyleSheet.create({})
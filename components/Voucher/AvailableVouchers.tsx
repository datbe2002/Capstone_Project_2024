import React from 'react'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useAfterVoucher } from '../../app/store/store'
import { COLORS } from '../../assets'
import { transNumberFormatter } from '../Payment/ShippingFee'
import CustomButton from '../Button'
import VoucherCard from './VoucherCard'
import EmptyComponentCustom from '../EmptyComponentCustom'

const ListHeader = () => {
    return (<View style={styles.warnAnnounce}>
        <View style={styles.left}>
            <MaterialIcons name="announcement" size={24} color={COLORS.darkGray} />
        </View>
        <Text style={styles.right}>
            Mỗi đơn hàng chỉ sử dụng một phiếu giảm giá.
        </Text>
    </View>)
}



const AvailableVouchers = ({ totalPrice, dataVoucherAvailable }: any) => {
    const { itemVoucher } = useAfterVoucher()


    return (
        <View style={{ position: 'relative', flex: 1 }}>
            <FlatList style={{
                marginBottom: 120,
            }}
                ListHeaderComponent={<ListHeader />}
                data={dataVoucherAvailable}
                renderItem={({ item }) =>
                    <VoucherCard
                        item={item}
                        totalPrice={totalPrice}
                    />}
                keyExtractor={item => item.id}
                ListEmptyComponent={
                    <EmptyComponentCustom
                        icon={<Entypo name="ticket" size={50} color={COLORS.white} />}
                        text='Bạn chưa có voucher phù hợp so với đơn hàng' />
                }
            />
            <View style={styles.footerList}>
                <View style={{ justifyContent: 'center', alignItems: 'flex-end', paddingRight: 5 }}>
                    {itemVoucher.totalVoucherMoney && <Text style={{
                        fontFamily: 'mon-sb',
                        fontSize: 16
                    }}>Tiết kiệm <Text style={{ color: COLORS.primary, fontSize: 18, fontFamily: 'mon-b' }}>{transNumberFormatter(itemVoucher.totalVoucherMoney)}đ</Text></Text>}
                </View>
                <CustomButton buttonText={dataVoucherAvailable?.length < 1 || !itemVoucher.code ? `Quay lại` : `Tiếp tục`} onPress={() => router.back()} />
            </View>
        </View>

    )
}

export default AvailableVouchers

const styles = StyleSheet.create({
    warnAnnounce: {
        backgroundColor: 'wheat',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,

    },
    left: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    right: {
        width: '90%',
        fontSize: 17,
        fontFamily: 'mon',
    },
    footerList: {
        height: 120,
        position: 'absolute',
        borderTopWidth: 1,
        borderTopColor: COLORS.gray,
        backgroundColor: COLORS.white,
        padding: 10,
        bottom: 0,
        left: 0,
        right: 0,
    }
})
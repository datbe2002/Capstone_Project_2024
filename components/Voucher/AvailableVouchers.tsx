import { MaterialIcons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { getVoucher } from '../../app/context/voucherApi'
import { useAfterVoucher } from '../../app/store/store'
import { COLORS } from '../../assets'
import CustomButton from '../Button'
import { transNumberFormatter } from '../Payment/ShippingFee'
import { router } from 'expo-router'

const dateConvert = (date: string | null) => {
    const originalDateTime = moment(date);
    const formattedDateTime = originalDateTime.format('DD/MM/YYYY hh:mm');
    return formattedDateTime
}

const VoucherCard = ({ item, totalPrice }: any) => {

    const { itemVoucher, setItemVoucher } = useAfterVoucher()
    const handleVoucherCodeChange = () => {
        if (!item?.code) {
            console.log('No voucher selected');
            return; // Exit early if no voucher is selected
        }

        if (totalPrice < item.minTotalValue) {
            console.log('Minimum value not met');
            return; // Exit early if minimum value is not met
        }

        const finalPrice = (totalPrice * item.percent) / 100;
        const adjustedPrice = Math.min(finalPrice, item.maxValue);
        setItemVoucher({ totalVoucherMoney: adjustedPrice });
    }


    const handleChecked = () => {
        console.log('first code', item?.code)

        if (item.code === itemVoucher.code) {
            setItemVoucher({ code: null, totalVoucherMoney: null });
        } else {
            setItemVoucher({ code: item?.code });
            handleVoucherCodeChange()
        }

    };

    return (
        <View style={styles.cardVoucher}>
            <View style={styles.upperPart}>
                <View style={styles.couponPercent}>
                    <Text style={styles.percentText}>- {item.percent}%</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.match}>Các yêu cầu về mã giảm giá đã đủ</Text>
                </View>
                <View style={styles.checkboxChosen}>
                    <CheckBox
                        checked={itemVoucher?.code === item?.code}
                        onPress={handleChecked}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checkedColor={COLORS.primary}
                        size={28}
                    />
                </View>
                <View style={[styles.whiteCircle, { position: 'absolute', bottom: -17, left: -17, }]}></View>
                <View style={[styles.whiteCircle, { position: 'absolute', bottom: -17, right: -17 }]}></View>
            </View>
            <View style={styles.lowerPart}>
                <Text style={styles.itemText}>{`\u2022 Mã: ${item?.code}`}</Text>
                <Text style={styles.itemText}>{`\u2022 ${dateConvert(item.startDate)}~${dateConvert(item.exprireDate)}`}</Text>
                <Text style={styles.itemText}>{`\u2022 Cho bộ sản phẩm đã chọn`}</Text>
            </View>
        </View>
    )
}





const AvailableVouchers = ({ totalPrice }: any) => {
    const { data, isLoading } = useQuery({
        queryKey: ["voucher"],
        queryFn: getVoucher,
    });
    const { itemVoucher, setItemVoucher } = useAfterVoucher()


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



    return (
        <View style={{ position: 'relative', flex: 1 }}>
            <FlatList style={{
                marginBottom: 120,
            }}
                ListHeaderComponent={<ListHeader />}
                data={data?.data}
                renderItem={({ item }) =>
                    <VoucherCard
                        item={item}
                        totalPrice={totalPrice}
                    />}
                keyExtractor={item => item.id}
            // ListFooterComponent={<ListFooter />}
            />
            <View style={styles.footerList}>
                <View style={{ justifyContent: 'center', alignItems: 'flex-end', paddingRight: 5 }}>
                    {itemVoucher.totalVoucherMoney && <Text style={{
                        fontFamily: 'mon-sb',
                        fontSize: 16
                    }}>Tiết kiệm <Text style={{ color: COLORS.primary, fontSize: 18, fontFamily: 'mon-b' }}>{transNumberFormatter(itemVoucher.totalVoucherMoney)}đ</Text></Text>}
                </View>
                <CustomButton buttonText={`Tiếp tục`} onPress={() => router.back()} />
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
    whiteCircle: {
        height: 30,
        width: 30,
        borderRadius: 50,
        backgroundColor: 'white',
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
    cardVoucher: {
        borderTopWidth: 10,
        borderBottomWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        margin: 10,
        borderColor: COLORS.primary,
        backgroundColor: '#E6E8FF',
    },
    upperPart: {
        position: 'relative',
        padding: 10,
        borderColor: COLORS.white,
        borderBottomWidth: 2,
        borderStyle: 'dashed',
        display: 'flex',
        flexDirection: 'row'
    },
    description: {
        fontFamily: 'mon-sb',
        color: COLORS.primary
    },
    couponPercent: {
        width: '70%'

    },
    checkboxChosen: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    match: {
        fontFamily: 'mon-sb',
        color: COLORS.primary
    },

    percentText: {
        fontSize: 25,
        fontFamily: 'mon-b',
        color: COLORS.primary
    },
    lowerPart: {
        padding: 10
    },
    itemText: {
        fontFamily: 'mon-sb',
        color: COLORS.darkGray
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
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useAfterVoucher } from "../../app/store/store";
import { COLORS } from '../../assets';
import moment from 'moment';


export const dateConvert = (date: string | null) => {
    const originalDateTime = moment(date);
    const formattedDateTime = originalDateTime.format('DD/MM/YYYY hh:mm');
    return formattedDateTime
}

const VoucherCard = ({ item, totalPrice }: any) => {

    const { itemVoucher, setItemVoucher } = useAfterVoucher()
    const handleVoucherCodeChange = () => {
        if (!item?.code) {
            console.log('No voucher selected');
            return;
        }

        if (totalPrice < item.minTotalValue) {
            console.log('Minimum value not met');
            return;

        }

        const finalPrice = (totalPrice * item.percent) / 100;
        const adjustedPrice = Math.min(finalPrice, item.maxValue);
        setItemVoucher({ totalVoucherMoney: adjustedPrice });
    }


    const handleChecked = () => {
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
                        uncheckedColor={COLORS.white}
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
export default VoucherCard


const styles = StyleSheet.create({
    whiteCircle: {
        height: 30,
        width: 30,
        borderRadius: 50,
        backgroundColor: 'white',
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
})
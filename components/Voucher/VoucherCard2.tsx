import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useAfterVoucher } from "../../app/store/store";
import { COLORS } from '../../assets';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import { transNumberFormatter } from '../Payment/ShippingFee';


const dateConvert = (date: string | null) => {
    const originalDateTime = moment(date);
    const formattedDateTime = originalDateTime.format('DD/MM/YYYY hh:mm');
    return formattedDateTime
}

const VoucherCard2 = ({ item }: any) => {

    return (
        <View style={styles.cardVoucher}>
            <View style={styles.upperPart}>
                <View style={styles.couponPercent}>
                    <Text style={styles.percentText}>- {item.percent}%</Text>
                    <Text style={styles.match}>Trên {transNumberFormatter(item.minTotalValue)}đ</Text>
                </View>
                <View style={styles.checkboxChosen}>
                </View>
                <View style={[styles.whiteCircle, { position: 'absolute', bottom: -17, left: -17, }]}></View>
                <View style={[styles.whiteCircle, { position: 'absolute', bottom: -17, right: -17 }]}></View>
            </View>
            <View style={styles.lowerPart}>
                <Text style={styles.itemText}>{`\u2022 Mã: ${item?.code}`}</Text>
                <Text style={styles.itemText}>{`\u2022 ${dateConvert(item.startDate)}~${dateConvert(item.exprireDate)}`}</Text>
                <Text style={styles.itemText}>{`\u2022 Cho bộ sản phẩm đã chọn`}</Text>
            </View>
            <View style={styles.bottomInfo}>
                <View style={styles.iconInfo}>
                    <Feather name="info" size={28} color="black" />
                </View>
                <Text style={styles.infoText}>Không đáp ứng giới hạn tiền tối thiểu. </Text>
            </View>
        </View>
    )
}
export default VoucherCard2


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
        borderColor: '#8AA9FF',
        backgroundColor: '#E6E8FF',
    },
    upperPart: {
        position: 'relative',
        padding: 10,
        borderColor: COLORS.white,
        borderBottomWidth: 2,
        borderStyle: 'dashed',
        display: 'flex',
        flexDirection: 'row',
    },
    description: {
        fontFamily: 'mon-sb',
        color: COLORS.primary
    },
    couponPercent: {
        width: '70%',
        opacity: 0.4
    },
    checkboxChosen: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    match: {
        fontFamily: 'mon-sb',
        color: COLORS.primary,
        fontSize: 20
    },

    percentText: {
        fontSize: 25,
        fontFamily: 'mon-b',
        color: COLORS.primary
    },
    lowerPart: {
        padding: 10,
        opacity: 0.4
    },
    itemText: {
        fontFamily: 'mon-sb',
        color: COLORS.darkGray
    },
    bottomInfo: {
        backgroundColor: 'wheat',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconInfo: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoText: {
        fontSize: 16,
        fontFamily: 'mon-sb',
    }
})
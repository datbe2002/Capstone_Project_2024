import React, { memo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../assets';
import { CheckBox } from 'react-native-elements';

const PaymentMethodChosen = ({ setPaymentMethod, paymentMethod }: any) => {

    const handleSelectMethod = (method: number) => {
        setPaymentMethod(method);
    };

    return (
        <View style={styles.totalPriceContainer}>
            <View>
                <Text style={styles.label}>Phương thức thanh toán:</Text>
            </View>
            <View style={[styles.option, { borderBottomColor: COLORS.gray, borderBottomWidth: 1 }]}>
                <CheckBox
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={paymentMethod === 1}
                    onPress={() => handleSelectMethod(1)}
                />
                <Text style={styles.totalPrice}>Zalo Pay</Text>
            </View>
            <View style={styles.option}>
                <CheckBox
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={paymentMethod === 3}
                    onPress={() => handleSelectMethod(3)}
                />
                <Text style={styles.totalPrice}>Thanh toán khi nhận hàng</Text>
            </View>
        </View>
    );
};

export default memo(PaymentMethodChosen);

const styles = StyleSheet.create({
    totalPriceContainer: {
        padding: 10,
        display: 'flex',
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderColor: COLORS.gray
    },
    totalPrice: {
        fontSize: 16,
        fontFamily: 'mon-sb',
        color: COLORS.black
    },
    label: {
        fontSize: 18,
        fontFamily: 'mon-sb'
    },
    option: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
});

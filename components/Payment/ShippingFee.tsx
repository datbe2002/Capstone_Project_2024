import React, { memo, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { getShippingFee } from '../../app/context/addressApi'
import { COLORS } from '../../assets'

interface ShippingFeeProps {
    addressId: number | null,
    setShippingFeePrice: React.Dispatch<React.SetStateAction<any | null>>,
}
export const transNumberFormatter = (number: any | null) => {
    const formattedNumber = number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedNumber
};
const ShippingFee: React.FC<ShippingFeeProps> = ({ addressId, setShippingFeePrice }) => {
    // Call useQuery directly in the component body
    const { isFetching, error, data, isSuccess } = useQuery({
        queryKey: ["shippingFee", addressId],
        queryFn: () => getShippingFee(addressId),
        enabled: addressId !== null,

    });
    useEffect(() => {
        if (isSuccess) {
            setShippingFeePrice(data?.data?.total)
        }
    }, [data?.data?.total])
    return (
        <View style={styles.shippingMethod}>
            <Text style={styles.shippingMethodText}>Phương thức vận chuyển</Text>
            <View style={styles.methodContainer}>
                <Text style={styles.methodTextMain}>Truyền thống</Text>
                {isFetching ? (
                    <ActivityIndicator size={20} color={COLORS.primary} />
                ) : error ? (
                    <Text style={styles.methodFeeMain}>Error fetching fee</Text>
                ) : (
                    <Text style={styles.methodFeeMain}>
                        <Text style={styles.vndText}>đ</Text>
                        {transNumberFormatter(data?.data?.total)}
                    </Text>
                )}
            </View>
        </View>
    )
}

export default memo(ShippingFee)

const styles = StyleSheet.create({
    shippingMethod: {
        backgroundColor: '#E3FFFE',
        borderWidth: 2,
        borderColor: '#C3E3E0',
        padding: 10,
        gap: 10
    },
    shippingMethodText: {
        fontSize: 18,
        fontFamily: 'mon-sb'
    },
    methodContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    methodTextMain: {
        fontSize: 19,
        fontFamily: 'mon-b'
    },
    methodFeeMain: {
        fontSize: 18,
        fontFamily: 'mon-sb'
    },
    vndText: {
        fontSize: 15,
        textDecorationLine: 'underline'
    },
})
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddressConfig from '../../../components/Address/AddressConfig'
import { useQuery } from '@tanstack/react-query';
import { getAddress } from '../../context/addressApi';
import { useAddressChange, useUserIDStore } from '../../store/store';
import LoadingComponent from '../../../components/LoadingComponent';

const Address = () => {

    const { userId } = useUserIDStore()

    const getUserAddress = useQuery({
        queryKey: ["address"],
        queryFn: () => getAddress(userId),
    });

    const addressReal = getUserAddress?.data?.data.filter((address: any) => address.isDeleted === false)
    return (
        <View style={styles.container}>
            {getUserAddress.isLoading ? <LoadingComponent /> : <AddressConfig
                address={addressReal}
            />}
        </View>
    )
}

export default Address

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
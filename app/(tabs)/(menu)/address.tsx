import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AddressConfig from '../../../components/Address/AddressConfig'
import { useQuery } from '@tanstack/react-query';
import { getAddress } from '../../context/addressApi';
import { useUserIDStore } from '../../store/store';
import LoadingComponent from '../../../components/LoadingComponent';

const Address = () => {

    const { userId } = useUserIDStore()

    const getUserAddress = useQuery({
        queryKey: ["address"],
        queryFn: () => getAddress(userId),
    });


    return (
        <View style={styles.container}>
            {getUserAddress.isLoading ? <LoadingComponent /> : <AddressConfig
                address={getUserAddress.data.data}
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
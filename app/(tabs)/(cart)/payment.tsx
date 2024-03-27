import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddressChosen from '../../../components/Address/AddressChosen'
import { useAddressChange, useUserIDStore } from '../../store/store'
import { useQuery } from '@tanstack/react-query'
import { getAddress } from '../../context/addressApi'

const Payment = () => {
    const { userId } = useUserIDStore()

    const getUserAddress = useQuery({
        queryKey: ["address"],
        queryFn: () => getAddress(userId),
    });

    const { setSelectedAddress, selectedAddress } = useAddressChange()
    useEffect(() => {
        const data = getUserAddress.data.data.find((data1: any) => data1.isDefault === true)
        console.log('data',)
        setSelectedAddress(data)
    }, [getUserAddress.isSuccess])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <AddressChosen addressData={selectedAddress} />
        </ScrollView>
    )
}

export default Payment

const styles = StyleSheet.create({
    container: {}
})
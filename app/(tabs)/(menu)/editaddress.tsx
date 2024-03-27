import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import CustomButton from '../../../components/Button';
import EditAddressComponent from '../../../components/Address/EditAddressComponent';

const EditAddress = () => {
    const { item } = useLocalSearchParams();

    const handleDeleteAddress = () => {
        console.log(item)
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <EditAddressComponent item={item} />
            <CustomButton buttonText={'Xóa địa chỉ'} buttonColor='errorColor' onPress={handleDeleteAddress} />
        </ScrollView>
    )
}

export default EditAddress

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10
    }
})
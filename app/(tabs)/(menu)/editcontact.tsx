import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import CustomButton from '../../../components/Button';
import EditAddressComponent from './editaddress';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAddressWId } from '../../context/addressApi';
import CustomerInfo from '../../../components/Address/CustomerInfo';

const EditAddress = () => {
    const { item } = useLocalSearchParams<any>();
    const itemParse = JSON.parse(item)
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: (id: number) => deleteAddressWId(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["address"] })
            router.back()
        },
        onError: (err: any) => {
            Alert.alert("Lỗi", "Có lỗi không xác định vui lòng thử lại sau")
        }
    });

    const handleDeleteAdd = async () => {
        await mutate(itemParse.id)
    }

    const handlePress = () => {
        Alert.alert("Thông báo", "Bạn có muốn xóa địa chỉ này ?", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            { text: "OK", onPress: handleDeleteAdd },
        ]);
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <CustomerInfo itemParse={itemParse} handlePress={handlePress} />
        </ScrollView>
    )
}

export default EditAddress

const styles = StyleSheet.create({
    container: {
        // marginHorizontal: 10
    }
})
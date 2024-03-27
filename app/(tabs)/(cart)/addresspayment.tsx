import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { COLORS } from '../../../assets'
import { useAddressChange, useUserIDStore } from '../../store/store'
import { useQuery } from '@tanstack/react-query'
import { getAddress } from '../../context/addressApi'
import LoadingComponent from '../../../components/LoadingComponent'
import { CheckBox } from 'react-native-elements'

interface AddressPaymentListProps {
    address: Array<any>
}


const AddressCard = ({ addressUnique }: any) => {
    const { selectedAddress, setSelectedAddress } = useAddressChange()
    const [checkbox, setCheckbox] = useState<any>(selectedAddress)

    const handleChosen = () => {
        setSelectedAddress(addressUnique)
        setTimeout(() => {
            router.back()
        }, 1000)
    }

    return (
        <View style={styles.cardContainer}>
            <View>
                <CheckBox
                    checked={selectedAddress.id === addressUnique.id ? checkbox : !checkbox}
                    onPress={handleChosen}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    size={28}
                />
            </View>
            <View>
                <View style={styles.nameNphone}>
                    <Text style={{ fontFamily: 'mon-b', fontSize: 18 }}>{addressUnique.recipientName.toUpperCase()}</Text>
                    <Text style={{ fontFamily: 'mon-sb', fontSize: 18, color: COLORS.darkGray }}>{addressUnique.recipientPhone}</Text>
                </View>
                <View style={styles.addressInfo}>
                    <Text style={{ fontFamily: 'mon-sb', fontSize: 16, color: COLORS.darkGray }}>{addressUnique.street}</Text>
                    <Text style={{ fontFamily: 'mon-sb', fontSize: 16, color: COLORS.darkGray }}>{addressUnique.province}, {addressUnique.district}, {addressUnique.ward}</Text>
                </View>
                <View style={{ paddingTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {addressUnique.isDefault && <Text style={{ color: COLORS.primary, borderColor: COLORS.primary, borderWidth: 1, padding: 5, height: 30, fontFamily: 'mon-b', textAlign: 'center' }}>
                        Mặc định
                    </Text>}

                </View>
            </View>
        </View>)
}


const ListEmptyAddress = () => {
    return <View>
        <View style={styles.emptyList}>
            <Image style={styles.imageWL} source={require('../../../assets/images/emptyAddress.png')} />
            <Text style={{ fontFamily: 'mon', color: COLORS.black, fontSize: 18 }}>Bạn chưa có địa chỉ mặc định</Text>
            <TouchableOpacity style={{ backgroundColor: COLORS.primary, padding: 15, borderRadius: 2 }} >
                <Text style={{ fontFamily: 'mon-sb', color: COLORS.white, fontSize: 16 }}>Thêm một để có thể đặt hàng ngay!</Text>
            </TouchableOpacity>
        </View>
    </View>
}


const AddressPaymentList: React.FC<AddressPaymentListProps> = () => {


    const { userId } = useUserIDStore()

    const getUserAddress = useQuery({
        queryKey: ["address"],
        queryFn: () => getAddress(userId),
    });

    if (getUserAddress.isPending) {
        return <LoadingComponent />;
    }

    return (
        <View style={styles.containerAddress}>
            <View style={styles.componentText}>
                <Text style={styles.syntaxText}>Địa chỉ</Text>
            </View>
            <View>
                <FlatList
                    data={getUserAddress.data.data}
                    renderItem={({ item }) => <AddressCard addressUnique={item} />}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<ListEmptyAddress />}
                />

            </View>
            {getUserAddress.data.data.length > 0 && <Pressable style={styles.addNewAddress} onPress={() => console.log('add')}>
                <Ionicons name="add-circle-outline" size={28} color={COLORS.primary} />
                <Text style={{ fontFamily: 'mon-sb', fontSize: 16, color: COLORS.primary }}>Thêm Địa Chỉ Mới</Text>
            </Pressable>}
        </View>
    )
}

export default AddressPaymentList

const styles = StyleSheet.create({
    containerAddress: {
        marginHorizontal: 10,
    },
    componentText: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    syntaxText: {
        color: COLORS.darkGray,
        fontFamily: 'mon-sb',
        fontSize: 17,
    },
    cardContainer: {
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameNphone: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignContent: 'center',
    },
    addressInfo: {
        paddingTop: 10,
        display: 'flex',
        gap: 10
    },
    emptyList: {
        backgroundColor: '#FAFAFC',
        display: 'flex',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 20
    },
    addNewAddress: {
        backgroundColor: '#FAFAFC',
        display: 'flex',
        gap: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 20
    },
    imageWL: {
        width: 150,
        opacity: 0.1,
        objectFit: "cover",
    }
})
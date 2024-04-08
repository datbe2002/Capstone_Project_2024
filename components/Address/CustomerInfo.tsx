import { AntDesign } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { putAddressApi } from '../../app/context/addressApi'
import { usePutAddress } from '../../app/store/store'
import { COLORS } from '../../assets'
import CustomButton from '../Button'
import { Switch } from 'react-native-elements'

const CustomerInfo = ({ itemParse, handlePress }: any) => {
    const { selectedPutAddress, setSelectedPutAddress } = usePutAddress()
    const [itemParseState, setItemParseState] = useState(itemParse)
    const [loadingWait, setLoadingWait] = useState<boolean>(false)
    const initialAddressState = {
        province: itemParse.province,
        provinceId: itemParse.provinceId,
        district: itemParse.district,
        districtId: itemParse.districtId,
        ward: itemParse.ward,
        wardCode: itemParse.wardCode,
    };

    useEffect(() => {
        if (selectedPutAddress) {
            setItemParseState((prevState: any) => ({
                ...prevState,
                ...selectedPutAddress,
            }));
        }
    }, [selectedPutAddress]);

    const hasFormChanged = () => {
        const currentState = JSON.stringify({
            ...itemParseState,
            province: selectedPutAddress.province || itemParse.province,
            provinceId: selectedPutAddress.provinceId || itemParse.provinceId,
            district: selectedPutAddress.district || itemParse.district,
            districtId: selectedPutAddress.districtId || itemParse.districtId,
            ward: selectedPutAddress.ward || itemParse.ward,
            wardCode: selectedPutAddress.wardCode || itemParse.wardCode,
        });

        const initialState = JSON.stringify({
            ...itemParse,
            ...initialAddressState,
        });
        return currentState !== initialState;
    };

    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: (data: any) => putAddressApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['address'] })
            setSelectedPutAddress({
                province: null,
                provinceId: null,
                district: null,
                districtId: null,
                ward: null,
                wardCode: null,
            })
            router.back();
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const putAddress = {
        id: itemParse.id,
        recipientName: itemParseState.recipientName,
        recipientPhone: itemParseState.recipientPhone,
        province: selectedPutAddress.province || itemParse.province,
        provinceId: selectedPutAddress.provinceId || itemParse.provinceId,
        district: selectedPutAddress.district || itemParse.district,
        disctrictId: selectedPutAddress.districtId || itemParse.disctrictId,
        ward: selectedPutAddress.ward || itemParse.ward,
        wardCode: selectedPutAddress.wardCode || itemParse.wardCode,
        street: itemParseState.street,
        isDefault: itemParse.isDefault,
    }
    const handleSubmit = async () => {
        if (hasFormChanged()) {
            console.log("Changes detected, calling API...");
            await mutate(putAddress)
        } else {
            console.log("No changes detected, not calling API.");
            setLoadingWait(true)
            setTimeout(() => {
                setLoadingWait(false)
                router.back()
            }, 800)
        }
    };
    const [checked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.componentText}>
                <Text style={styles.syntaxText}>Liên hệ</Text>
            </View>
            <View>
                <TextInput
                    style={[styles.func, { borderBottomWidth: 1, borderBottomColor: COLORS.gray }]}
                    onChangeText={(text) => setItemParseState({ ...itemParseState, recipientName: text })}
                    value={itemParseState.recipientName} />
                <TextInput
                    style={styles.func}
                    onChangeText={(text) => setItemParseState({ ...itemParseState, recipientPhone: text })}
                    value={itemParseState.recipientPhone} />
            </View>
            <View style={[styles.componentText, { marginTop: 15 }]}>
                <Text style={styles.syntaxText}>Địa chỉ</Text>
            </View>
            <View>
                <Pressable style={styles.addressChange} onPress={() => router.push('/(tabs)/(menu)/editaddress')}>
                    <View>
                        <Text style={styles.funcText2}>{itemParseState.province || itemParse.province}</Text>
                        <Text style={styles.funcText2}>{itemParseState.district || itemParse.district}</Text>
                        <Text style={styles.funcText2}>{itemParseState.ward || itemParse.ward}</Text>
                    </View>
                    <View style={styles.swapIcon}>
                        <AntDesign name="swap" size={24} color={COLORS.darkGray} />
                    </View>
                </Pressable>
                <TextInput
                    style={styles.func}
                    onChangeText={(text) => setItemParseState({ ...itemParseState, street: text })}
                    value={itemParseState.street} />
            </View>
            <View style={[styles.func, { marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                <Text style={styles.funcText2}>Đặt làm địa chỉ mặc định</Text>
                <Switch
                    trackColor={{ false: COLORS.darkGray, true: COLORS.blue1 }}
                    thumbColor={COLORS.primary}
                    value={checked}
                    onValueChange={(value) => setChecked(value)}
                />
            </View>
            <Pressable style={styles.buttonDelete} onPress={handlePress}>
                <Text style={styles.deleteText}>Xóa địa chỉ</Text>
            </Pressable>
            <CustomButton buttonText={isPending || loadingWait ? <ActivityIndicator color={COLORS.white} size={25} /> : "Lưu"} style={{ marginHorizontal: 10, marginTop: 30 }} onPress={handleSubmit} />
        </View>
    )
}

export default CustomerInfo

const styles = StyleSheet.create({
    container: {
        height: 700,
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
    func: {
        backgroundColor: COLORS.white,
        padding: 15,
        fontFamily: 'mon-sb',
        fontSize: 16
    },
    funcText2: {
        fontFamily: 'mon-sb',
        fontSize: 16
    },
    addressChange: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray
    },
    swapIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDelete: {
        marginTop: 30,
        backgroundColor: COLORS.white
    },
    deleteText: {
        padding: 15,
        fontFamily: 'mon-sb',
        fontSize: 18,
        textAlign: 'center',
        color: COLORS.errorColor
    }
})
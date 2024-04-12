import { AntDesign } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import { ActivityIndicator, Alert, Keyboard, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import PhoneInput from 'react-native-phone-number-input'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../assets'
import { addAddressApi } from './context/addressApi'
import { usePostAddress, useUserStore } from './store/store'
interface ErrorState {
    recipientName?: string,
    recipientPhone?: string,
    province?: string,
    district?: string,
    ward?: string,
    street?: string,
    address?: string,
    gender?: "Male" | "Female"
}
const AddressModal = () => {
    const { userState } = useUserStore()
    const phoneInput = useRef<PhoneInput>(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showError, setShowError] = useState(false)
    const [valid, setValid] = useState(false)
    const { selectedPostAddress, setSelectedPostAddress } = usePostAddress()
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: (data: any) => addAddressApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['address'] })
            setSelectedPostAddress({
                province: null,
                provinceId: null,
                district: null,
                districtId: null,
                ward: null,
                wardCode: null,
                recipientName: null,
                recipientPhone: null,
                street: null,
            })
            router.push('/(tabs)/(cart)/cart');
        },
        onError: (error) => {
            console.log(error);
        },
    });
    const [addressState, setAddressState] = useState<any>({
        userId: userState?.id,
        recipientName: null,
        recipientPhone: null,
        recipientEmail: userState?.email,
        province: null,
        provinceId: null,
        district: null,
        disctrictId: null,
        ward: null,
        wardCode: null,
        street: null,
    })
    const [errors, setErrors] = React.useState<ErrorState>({

    });

    const handleOnchange = (text: string, input: string) => {
        setAddressState((prevState: any) => ({ ...prevState, [input]: text }));
    };
    const handleError = (error: string | null, input: string) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!addressState.recipientName) {
            handleError('Không được để trống ô này', 'recipientName');
            isValid = false;
        } else if (!/\s/.test(addressState.recipientName)) {
            handleError('Giữa họ và tên phải có khoảng trống', 'recipientName');
            isValid = false;
        }
        if (!selectedPostAddress.province) {
            handleError('Không được để trống 3 ô này', 'address');
            isValid = false;
        }
        if (!selectedPostAddress.district) {
            handleError('Không được để trống 3 ô này', 'address');
            isValid = false;
        }
        if (!selectedPostAddress.ward) {
            handleError('Không được để trống 3 ô này', 'address');
            isValid = false;
        }

        if (!addressState.street) {
            handleError('Không được để trống ô này', 'street');
            isValid = false;
        }

        if (!phoneNumber) {
            Alert.alert("Thông báo", "Không được để trống số điện thoại")
            isValid = false;
        } else {
            const checkValid = phoneInput.current?.isValidNumber(phoneNumber);
            setShowError(true);
            setValid(checkValid ? checkValid : false);
            if (checkValid === false) {
                console.log(checkValid)
                isValid = false;
            }
            else {
                setShowError(false);
            }
        }

        if (isValid) {
            const dataPost = {
                userId: userState?.id,
                recipientName: addressState.recipientName,
                recipientPhone: phoneNumber,
                recipientEmail: userState?.email,
                province: selectedPostAddress.province,
                provinceId: selectedPostAddress.provinceId,
                district: selectedPostAddress.district,
                disctrictId: selectedPostAddress.districtId,
                ward: selectedPostAddress.ward,
                wardCode: selectedPostAddress.wardCode,
                street: addressState.street,
                isDefault: checked
            }
            await mutate(dataPost)
        }
    }


    const handleAddNewAddress = () => {
        router.push('/addnewaddress')
        handleError(null, 'address')
    }
    const [checked, setChecked] = useState(false);

    return (
        <SafeAreaView style={styles.modalComponent}>
            <ScrollView>
                <View style={styles.componentText}>
                    <Text style={styles.syntaxText}>Liên hệ</Text>
                </View>
                <View>
                    <TextInput
                        style={[styles.func, { borderBottomWidth: 1, borderBottomColor: COLORS.gray }]}
                        onChangeText={text => handleOnchange(text, 'recipientName')}
                        placeholder='Họ và tên'
                        onFocus={() => handleError(null, 'recipientName')}
                        value={addressState.recipientName} />
                    {errors.recipientName && <Text style={styles.errFunc}>{errors.recipientName}</Text>}
                    <PhoneInput
                        defaultCode="VN"
                        placeholder="Số điện thoại"
                        ref={phoneInput}
                        onChangeText={(text) => {
                            setPhoneNumber(text);
                        }}
                        defaultValue={phoneNumber}
                        codeTextStyle={styles.codeTextStyle}
                        textContainerStyle={styles.textContainerStyle}
                        textInputStyle={styles.textInputStyle}
                        containerStyle={styles.containerStyle}
                    />
                    {showError && <Text style={styles.errFunc}>{valid ? null : "Số điện thoại không hợp lệ"}</Text>}
                </View>
                <View style={[styles.componentText, { marginTop: 15 }]}>
                    <Text style={styles.syntaxText}>Địa chỉ</Text>
                </View>
                <View>
                    <Pressable style={styles.addressChange} onPress={handleAddNewAddress}>
                        <View style={{ width: "70%" }}>
                            <TextInput editable={false} style={styles.funcText2} placeholder='Tỉnh/Thành phố'>{selectedPostAddress.province}</TextInput>
                            <TextInput editable={false} style={styles.funcText2} placeholder='Quận/Huyện'>{selectedPostAddress.district}</TextInput>
                            <TextInput editable={false} style={styles.funcText2} placeholder='Phường/Xã'>{selectedPostAddress.ward}</TextInput>
                        </View>
                        <View style={styles.swapIcon}>
                            <AntDesign name="swap" size={24} color={COLORS.darkGray} />
                        </View>
                    </Pressable>
                    <View>
                        {errors.address && <Text style={styles.errFunc}>{errors.address}</Text>}
                    </View>

                    <TextInput
                        style={styles.func}
                        onChangeText={text => handleOnchange(text, 'street')}
                        placeholder='Tên đường, Tòa nhà, Số nhà'
                        onFocus={() => handleError(null, 'street')}
                        value={addressState.street} />
                    {errors.street && <Text style={styles.errFunc}>{errors.street}</Text>}
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
                <View style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    gap: 10
                }}>
                    <Pressable onPress={() => router.push('/(tabs)/(cart)/cart')} style={[styles.confirmBtn, { backgroundColor: COLORS.darkGray, width: '23%' }]}>
                        <Text style={{ fontFamily: 'mon-b', fontSize: 20, padding: 15, textAlign: 'center', color: COLORS.white }}>{'Hủy'}</Text>
                    </Pressable>
                    <Pressable onPress={validate} style={styles.confirmBtn}>
                        <Text style={{ fontFamily: 'mon-b', fontSize: 20, padding: 15, textAlign: 'center', color: COLORS.white }}>{isPending ? <ActivityIndicator size={25} color={COLORS.white} /> : 'Hoàn tất'}</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddressModal

const styles = StyleSheet.create({
    containerStyle: {
        width: '100%',
    },
    textContainerStyle: {
        backgroundColor: COLORS.white,
        borderLeftWidth: 1.5,
        borderLeftColor: COLORS.gray
    },
    codeTextStyle: {
        fontFamily: 'mon-b',
    },
    textInputStyle: {
        fontFamily: 'mon-sb',
    },
    modalComponent: {
        flex: 1,
    },
    componentText: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    middText: {
        fontFamily: 'mon-sb',
        fontSize: 20,
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
    errFunc: {
        color: COLORS.errorColor,
        fontSize: 14,
        fontFamily: 'mon-sb',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#FED3DA'
    }
    ,
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
    },
    confirmBtn: {
        width: '70%',
        backgroundColor: COLORS.primary,
        marginTop: 30,
        borderRadius: 16
    }
})
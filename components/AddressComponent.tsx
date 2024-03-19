import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS } from '../assets';
import { useRegisterStore } from '../app/store/store';
interface Province {
    label: string
    value: string
}

interface District {
    label: string
    value: string
}
interface Ward {
    label: string
    value: string
}

const AddressComponent = () => {
    const [provinceData, setProvinceData] = useState<Province[]>([]);
    const [districtData, setDistrictData] = useState<District[]>([])
    const [wardData, setWardData] = useState<Ward[]>([])
    const [isFocusProv, setIsFocusProv] = useState(false);
    const [isFocusDist, setIsFocusDist] = useState(false);
    const [isFocusWard, setIsFocusWard] = useState(false);
    const [isFocusGender, setIsFocusGender] = useState(false);
    const { selectedValues, setSelectedValues } = useRegisterStore()

    const genderData = [
        { label: 'Nam', value: 1 },
        { label: 'Nữ', value: 2 },
        { label: 'Khác', value: 3 },
    ]
    useEffect(() => {
        var config = {
            method: 'get',
            url: `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`,
            headers: {
                'token': 'a47609c7-a96c-11ee-b1d4-92b443b7a897',
            },
        };

        axios(config)
            .then(response => {
                const { data } = response.data;
                const provinceArray = data.map((province: any) => ({
                    value: province.ProvinceID,
                    label: province.ProvinceName,
                }));
                setProvinceData(provinceArray);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleDistrict = (province: string) => {
        console.log(province)
        var config = {
            method: 'get',
            url: `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${province}`,
            headers: {
                'token': 'a47609c7-a96c-11ee-b1d4-92b443b7a897',
            },
        };

        axios(config)
            .then(response => {
                const { data } = response.data;
                const districtArray = data.map((district: any) => ({
                    value: district.DistrictID,
                    label: district.DistrictName,
                }));
                setDistrictData(districtArray);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleWard = (ward: string) => {
        var config = {
            method: 'get',
            url: `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${ward}`,
            headers: {
                'token': 'a47609c7-a96c-11ee-b1d4-92b443b7a897',
            },
        };

        axios(config)
            .then(response => {
                const { data } = response.data;
                const wardArray = data.map((ward: any) => ({
                    value: ward.WardCode,
                    label: ward.WardName,
                }));
                setWardData(wardArray);
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#fff', borderRadius: 15 }}>
                <Dropdown
                    style={[styles.dropdown, isFocusProv && { borderColor: COLORS.black }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    itemTextStyle={styles.itemTextStyle}
                    data={provinceData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocusProv ? 'Chọn tỉnh' : '...'}
                    searchPlaceholder="Tìm kiếm..."
                    value={selectedValues.provinceId}
                    onFocus={() => setIsFocusProv(true)}
                    onBlur={() => setIsFocusProv(false)}
                    onChange={item => {
                        setSelectedValues({
                            province: item.label,
                            provinceId: item.value
                        })
                        setIsFocusProv(false);
                        handleDistrict(item.value)
                    }}
                />
                {selectedValues.province && (
                    <Dropdown
                        style={[styles.dropdown, isFocusDist && { borderColor: COLORS.black }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        itemTextStyle={styles.itemTextStyle}
                        data={districtData}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusDist ? 'Chọn quận' : '...'}
                        searchPlaceholder="Tìm kiếm..."
                        value={selectedValues.districtId}
                        onFocus={() => setIsFocusDist(true)}
                        onBlur={() => setIsFocusDist(false)}
                        onChange={item => {
                            setSelectedValues({
                                district: item.label,
                                districtId: item.value
                            })
                            setIsFocusDist(false)
                            handleWard(item.value)
                        }}
                    />
                )}
                {selectedValues.district && (
                    <Dropdown
                        style={[styles.dropdown, isFocusWard && { borderColor: COLORS.black }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        itemTextStyle={styles.itemTextStyle}
                        data={wardData}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusWard ? 'Chọn phường' : '...'}
                        searchPlaceholder="Search..."
                        value={selectedValues.wardCode}
                        onFocus={() => setIsFocusWard(true)}
                        onBlur={() => setIsFocusWard(false)}
                        onChange={item => {
                            setSelectedValues({
                                ward: item.label,
                                wardCode: item.value
                            })
                            setIsFocusWard(false)
                        }}
                    />
                )}

                <Dropdown
                    style={[styles.dropdown, isFocusGender && { borderColor: COLORS.black }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    itemTextStyle={styles.itemTextStyle}
                    data={genderData}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocusGender ? 'Chọn giới tính' : '...'}
                    value={selectedValues.gender}
                    onFocus={() => setIsFocusGender(true)}
                    onBlur={() => setIsFocusGender(false)}
                    onChange={item => {
                        setSelectedValues({
                            gender: item.value,
                        })
                        setIsFocusGender(false)
                    }}
                />
            </View>
        </View>
    )
}

export default AddressComponent

const styles = StyleSheet.create({
    container: {
        height: 'auto'
    },
    dropdown: {
        height: 60,
        borderWidth: 2,
        borderRadius: 16,
        paddingHorizontal: 8,
        marginBottom: 30,
        backgroundColor: COLORS.inputBackgroundColor,
        borderColor: COLORS.gray,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        fontFamily: 'mon-b'

    },
    placeholderStyle: {
        fontSize: 18,
        fontFamily: 'mon-b',
        color: '#636363'
    },
    selectedTextStyle: {
        fontSize: 18,
        fontFamily: 'mon-b'
    },
    itemTextStyle: {
        fontFamily: 'mon-sb',
        color: '#636363'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 18,
        fontFamily: 'mon-b'
    },
})
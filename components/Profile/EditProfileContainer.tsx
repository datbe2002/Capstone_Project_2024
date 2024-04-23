import React, { useRef, useState } from 'react'
import { ActivityIndicator, Alert, Keyboard, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { COLORS } from '../../assets'
import { MaterialIcons } from '@expo/vector-icons';
import { convertToISO8601WithTime, formatDate } from '../../app/(auth)/register';
import { CheckBox } from 'react-native-elements';
import { postUserData } from '../../app/context/feedbackApi';
import { router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import PhoneInput from 'react-native-phone-number-input'
import DateTimePicker from '@react-native-community/datetimepicker';
import InputV2 from '../InputV2';
import CustomButton from '../Button';
import SpaceBet from '../SpaceBet';

interface ErrorState {
    fullName?: string,
    phone?: string,
}

const EditProfileContainer = ({ userChanged, setUserChanged }: any) => {
    const [errors, setErrors] = React.useState<ErrorState>({
    })
    const phoneInput = useRef<PhoneInput>(null);
    const [phoneNumber, setPhoneNumber] = useState(userChanged.phone || null);
    const [showError, setShowError] = useState(false)
    const [valid, setValid] = useState(false)
    const [showPicker, setShowPicker] = useState(false)
    const [date, setDate] = useState(new Date())
    const [dateOfbirth, setDateOfBirth] = useState("")
    const [gender, setGender] = useState<number>(userChanged.gender || 0);

    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }
    const handleOnchange = (text: string, input: string) => {
        setUserChanged((prevState: any) => ({ ...prevState, [input]: text }));
    };
    const handleError = (error: string | null, input: string) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };
    const onChange = ({ type }: any, selectedDate: any) => {
        if (type == 'set') {
            const currDate = selectedDate;
            setDate(currDate)
            if (Platform.OS === 'android') {
                toggleDatePicker()
                setDateOfBirth(formatDate(currDate))
            }
        } else {
            toggleDatePicker()
        }
    }

    const { mutate, isPending } = useMutation({
        mutationFn: (data: any) => postUserData(data),
        onSuccess: (response: any) => {
            router.back()
        },
        onError: (err) => {
            Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại sau");
        },
    });

    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!userChanged.fullName) {
            handleError('Không được để trống ô này', 'recipientName');
            isValid = false;
        } else if (!/\s/.test(userChanged.fullName)) {
            handleError('Giữa họ và tên phải có khoảng trống', 'recipientName');
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
        }

        if (isValid) {
            const dataPost = {
                userId: userChanged.id,
                email: userChanged.email,
                fullName: userChanged.fullName,
                phone: phoneNumber,
                profilePicture: userChanged.profilePicture,
                dob: convertToISO8601WithTime(dateOfbirth),
                gender: gender,
            };
            await mutate(dataPost)
        }
    };
    const handleSelectGender = (gender: number) => {
        setGender(gender);
    };

    return (
        <View style={styles.editProfileContainer}>
            <Text style={styles.introText}>Hồ sơ của bạn</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.func, { borderBottomWidth: 1, borderBottomColor: COLORS.gray }]}
                    onChangeText={text => handleOnchange(text, 'fullName')}
                    placeholder='Họ và tên'
                    onFocus={() => handleError(null, 'fullName')}
                    value={userChanged.fullName} />
                {errors.fullName && <Text style={styles.errFunc}>{errors.fullName}</Text>}
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
                {showError && <Text style={[styles.errFunc, valid && { backgroundColor: 'transparent', height: 0 }]}>{valid ? null : "Số điện thoại không hợp lệ"}</Text>}
                <SpaceBet height={10} />
                <Text style={{ fontFamily: 'mon-sb', fontSize: 16 }}>Giới tính</Text>
                <SpaceBet height={10} />
                <View style={[styles.genderChoose, , { borderBottomWidth: 1, borderBottomColor: COLORS.gray }]}>
                    <View style={[styles.genderChoose, { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: COLORS.gray }]}>
                        <CheckBox
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={gender === 0}
                            onPress={() => handleSelectGender(0)}
                        />
                        <Text style={{ fontFamily: 'mon-sb', fontSize: 16 }}>Nam</Text>
                    </View>
                    <View style={[styles.genderChoose, { flexDirection: 'row', alignItems: 'center' }]}>
                        <CheckBox
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={gender === 1}
                            onPress={() => handleSelectGender(1)}
                        />
                        <Text style={{ fontFamily: 'mon-sb', fontSize: 16 }}>Nữ</Text>
                    </View>
                </View>
                {showPicker && <DateTimePicker
                    onChange={onChange}
                    mode="date"
                    display="spinner"
                    value={date}
                    maximumDate={new Date()}
                    minimumDate={new Date(1980, 1, 1)}
                />}
                {!showPicker && (
                    <Pressable onPress={toggleDatePicker}>
                        <InputV2
                            editable={false}
                            label="Ngày sinh"
                            placeholder={"Bấm vào để chọn ngày sinh"}
                            value={dateOfbirth}
                            onChangeText={setDateOfBirth}
                            iconPlace={<MaterialIcons name="date-range" size={24} color={COLORS.black} />}
                        />
                    </Pressable>
                )}

            </View>
            <CustomButton style={styles.confirmButton} buttonText={isPending ? <ActivityIndicator size={20} color={COLORS.white} /> : 'Xác nhận'} onPress={validate} />
        </View>
    )
}

export default EditProfileContainer

const styles = StyleSheet.create({
    editProfileContainer: {
        flex: 1,
    },
    introText: {
        fontSize: 20,
        fontFamily: 'mon-b',
        padding: 10,
    },
    func: {
        backgroundColor: COLORS.white,
        padding: 15,
        fontFamily: 'mon-sb',
        fontSize: 16,
    },
    errFunc: {
        color: COLORS.errorColor,
        fontSize: 14,
        fontFamily: 'mon-sb',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#FED3DA'
    },
    inputContainer: {
        marginHorizontal: 10
    },
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
    confirmButton: {
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 10,
    },
    genderChoose: {
        display: 'flex',
        backgroundColor: COLORS.white,
    }
})
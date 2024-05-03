import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { COLORS, SIZES } from "../../assets";
import CustomButton from "../../components/Button";
import InputV2 from "../../components/InputV2";
import SpaceBet from "../../components/SpaceBet";
import { decodeJWT } from "../context/auth";

import DateTimePicker from '@react-native-community/datetimepicker';

import auth from '@react-native-firebase/auth';
import {
    GoogleSignin
} from '@react-native-google-signin/google-signin';
import { router } from "expo-router";
import PhoneInput from "react-native-phone-number-input";
import AddressComponent from "../../components/AddressComponent";
import { setUserAuthToken } from "../context/authService";
import instance from "../context/axiosConfig";
import useRegisterHook from "../context/registerMutation";
import { useLoadingStore, useRegisterStore, useUserIDStore, useUserStore } from "../store/store";
import Background from "../../components/BackGround";

GoogleSignin.configure({
    webClientId: '130210382454-7l7nfrqaeciu2dmf49k4u426vig2c99s.apps.googleusercontent.com',
});
async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
}



export const formatDate = (rawDate: any) => {
    let date = new Date(rawDate)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return `${day}/${month}/${year}`
}

export const convertToISO8601WithTime = (dateStr: any) => {
    var parts = dateStr.split('/');
    var dateObject = new Date(Date.UTC(parts[2], parts[1] - 1, parts[0]));
    var iso8601Date = dateObject.toISOString().split('T')[0] + "T00:00:00.000Z";
    return iso8601Date;
}
interface ErrorState {
    email?: string,
    password?: string,
    fullName?: string,
    retypeNewPassword?: string,
    street?: string,
    gender?: "Male" | "Female"
}

const RegisterPage = () => {
    const { register, isRegisterLoading } = useRegisterHook()
    const { selectedValues } = useRegisterStore()
    const [inputs, setInputs] = React.useState({
        email: '',
        password: '',
        fullName: '',
        retypeNewPassword: '',
        street: '',
        gender: ''
    });
    const [errors, setErrors] = React.useState<ErrorState>({

    });
    const phoneInput = useRef<PhoneInput>(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [valid, setValid] = useState(false)
    const [showError, setShowError] = useState(false)
    const [date, setDate] = useState(new Date())
    const [dateOfbirth, setDateOfBirth] = useState("")
    const [showPicker, setShowPicker] = useState(false)
    const { setUserId } = useUserIDStore()

    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }


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

    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!inputs.email) {
            handleError('Không được để trống ô này', 'email');
            isValid = false;
        } else if (!emailRegex.test(inputs.email)) {
            handleError('Địa chỉ email không hợp lệ', 'email');
            isValid = false;
        }
        if (!inputs.fullName) {
            handleError('Không được để trống ô này', 'fullName');
            isValid = false;
        } else if (inputs.fullName.length < 6) {
            handleError('Tên người dùng phải 6 kí tự trở lên', 'fullName');
            isValid = false;
        }
        if (!inputs.password) {
            handleError('Không được để trống ô này', 'password');
            isValid = false;
        }
        if (!inputs.street) {
            handleError('Không được để trống ô này', 'street');
            isValid = false;
        }
        if (!inputs.retypeNewPassword) {
            handleError('Không được để trống ô này', 'retypeNewPassword');
            isValid = false;
        }
        if (inputs.password !== inputs.retypeNewPassword) {
            handleError('Mật khẩu nhập lại không khớp', 'retypeNewPassword');
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
        if (!(selectedValues.district && selectedValues.districtId && selectedValues.gender && selectedValues.province && selectedValues.provinceId && selectedValues.ward && selectedValues.wardCode)) {
            Alert.alert("Thông báo", "Không được để ô trống")
            isValid = false;
        }


        if (isValid) {
            const dataPost = {
                email: inputs.email,
                password: inputs.password,
                phone: phoneNumber,
                dob: convertToISO8601WithTime(dateOfbirth),
                fullName: inputs.fullName,
                gender: selectedValues.gender,
                address: {
                    recipientName: inputs.fullName,
                    recipientPhone: phoneNumber,
                    recipientEmail: inputs.email,
                    province: selectedValues.province,
                    provinceId: selectedValues.provinceId,
                    district: selectedValues.district,
                    disctrictId: selectedValues.districtId,
                    ward: selectedValues.ward,
                    wardCode: selectedValues.wardCode,
                    street: inputs.street,
                }
            };
            await register(dataPost)
        }
    };



    const handleOnchange = (text: string, input: string) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error: string | null, input: string) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    const { loading, setLoadingState } = useLoadingStore()
    const { setUserState } = useUserStore()
    return (
        <Background imageKey="i3">
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={-30}
                style={styles.loginContainer}
            >
                {loading ? (
                    <View style={styles.activityLoading}>
                        <ActivityIndicator color={COLORS.primary} size={50}></ActivityIndicator>
                    </View>
                ) : (
                    <ScrollView contentContainerStyle={styles.loginForm} showsVerticalScrollIndicator={false}>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>Đăng ký</Text>
                            <Text style={styles.des}>Chưa có tài khoản?</Text>
                            <Text style={styles.des}>Hãy bắt đầu mua sắm nào.</Text>
                        </View>
                        <View style={styles.inputCo} >

                            <InputV2
                                onChangeText={text => handleOnchange(text, 'email')}
                                onFocus={() => handleError(null, 'email')}
                                error={errors.email}
                                placeholder="Email" label="Email" iconPlace={<MaterialCommunityIcons name="email-outline" size={24} color={COLORS.black} />} />
                            <SpaceBet height={10} />
                            <InputV2
                                onChangeText={text => handleOnchange(text, 'fullName')}
                                onFocus={() => handleError(null, 'fullName')}
                                error={errors.fullName}
                                placeholder="Tên đầy đủ" label="Tên" iconPlace={<SimpleLineIcons name="user" size={24} color={COLORS.black} />} />
                            <SpaceBet height={10} />

                            <InputV2
                                onChangeText={text => handleOnchange(text, 'password')}
                                onFocus={() => handleError(null, 'password')}
                                error={errors.password}
                                placeholder="Mật khẩu" password label="Mật khẩu" iconPlace={<Ionicons name="lock-closed-outline" size={24} color={COLORS.black} />} />
                            <SpaceBet height={10} />
                            <InputV2
                                onChangeText={text => handleOnchange(text, 'retypeNewPassword')}
                                onFocus={() => handleError(null, 'retypeNewPassword')}
                                error={errors.retypeNewPassword}
                                placeholder="Nhập lại mật khẩu" password label="Nhập lại mật khẩu" iconPlace={<Ionicons name="lock-closed-outline" size={24} color={COLORS.black} />} />
                            <SpaceBet height={30} />
                            <PhoneInput
                                defaultCode="VN"
                                placeholder="Số điện thoại"
                                ref={phoneInput}
                                onChangeText={(text) => {
                                    setPhoneNumber(text);
                                }}
                                defaultValue={phoneNumber}
                                codeTextStyle={styles.codeTextStyle}
                                countryPickerButtonStyle={styles.countryPickerButtonStyle}
                                textContainerStyle={styles.textContainerStyle}
                                textInputStyle={styles.textInputStyle}
                                containerStyle={styles.containerStyle}
                            />
                            {showError && <Text style={{ color: COLORS.errorColor, fontSize: 13, fontFamily: 'mon-sb' }}>{valid ? null : "Số điện thoại không hợp lệ"}</Text>}
                            <SpaceBet height={10} />
                            {showPicker && <DateTimePicker
                                onChange={onChange}
                                mode="date"
                                display="calendar"
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
                            <SpaceBet height={10} />
                            <InputV2
                                onChangeText={text => handleOnchange(text, 'street')}
                                onFocus={() => handleError(null, 'street')}
                                error={errors.street}
                                placeholder="Địa chỉ"
                                label="Nhập địa chỉ"
                                iconPlace={<FontAwesome name="street-view" size={24} color={COLORS.black} />} />
                            <SpaceBet height={30} />
                            <AddressComponent />
                            <View style={styles.acceptTerm}>
                                <Text style={styles.acceptTermText}>Tiếp tục khi bạn đã chấp thuận <Text style={styles.highlightTermText}>Chính sách bảo mật & Cookie</Text> và <Text style={styles.highlightTermText}>Điều khoản và Điều kiện</Text></Text>
                            </View>
                            <SpaceBet height={10} />
                            {isRegisterLoading ?
                                <CustomButton
                                    buttonText={<ActivityIndicator color={COLORS.white} size={30} />}
                                    style={{ width: "100%" }}
                                    onPress={validate}
                                />
                                :
                                <CustomButton
                                    buttonText="Đăng kí"
                                    style={{ width: "100%" }}
                                    onPress={validate}
                                />
                            }
                            <SpaceBet height={20} />
                            <Pressable style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 10,
                                borderRadius: 16,
                                minHeight: 60,
                                minWidth: 120,
                                paddingHorizontal: 10,
                                borderWidth: 1,
                                borderColor: COLORS.darkGray,
                                backgroundColor: COLORS.white
                            }}
                                onPress={() =>
                                    onGoogleButtonPress()
                                        .then((result) => {
                                            setLoadingState(true);
                                            const { uid, email, displayName, photoURL } = result.user;
                                            instance
                                                .post(`/api/auth/login-with-google?userId=${uid}`, {
                                                    email: email,
                                                    name: displayName,
                                                    imageUrl: photoURL,
                                                })
                                                .then(async (response) => {
                                                    const token = response.data.data.accessToken;
                                                    const decoded = decodeJWT(token);
                                                    const userID = decoded.UserId;

                                                    const secondRes = await instance.get(
                                                        `/api/user/profile/${userID}`
                                                    );
                                                    const userData = secondRes.data.data;
                                                    setUserId(userID);
                                                    setLoadingState(false);
                                                    setUserState(userData);
                                                    setUserAuthToken(token);
                                                })
                                                .catch((apiError) => {
                                                    console.error("API call failed:", apiError);
                                                });
                                        })
                                        .catch((e) => {
                                            console.log(e);
                                        })
                                }
                            >
                                <FontAwesome5 name="google" size={24} color="black" />
                                <Text style={{
                                    fontSize: SIZES.large,
                                    fontFamily: "mon-sb",
                                    color: COLORS.black,
                                    textAlign: "center",
                                }}>Đăng kí với Google</Text>
                            </Pressable>
                            <SpaceBet height={20} />
                            <TouchableOpacity style={styles.bottomTextContainer} onPress={() => router.replace('/(auth)/login')}>
                                <Text style={styles.bottomText}>Đã có tài khoản ? Đăng nhập ngay</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>)}

            </KeyboardAvoidingView>
        </Background>
    );
};

export default RegisterPage;

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        paddingVertical: 20,
        justifyContent: "flex-end",
        backgroundColor: "transparent",
        alignItems: "center",
    },
    activityLoading: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    loginForm: {
        width: "95%",
        backgroundColor: "transparent",
        gap: 20,
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    titleWrapper: {
        height: 120,
        justifyContent: "center",
    },
    title: {
        fontSize: 40,
        fontFamily: "mon-b",
        textTransform: "uppercase",
    },
    des: {
        fontSize: 19,
        fontFamily: "mon",
    },

    input: {
        width: "100%",
        backgroundColor: COLORS.inputBackgroundColor,
        borderColor: COLORS.inputBackgroundColor,
        elevation: 2,
    },
    inputCo: {
        backgroundColor: "transparent",
        // justifyContent: "center",
        // alignItems: "center",
    },
    bottomTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 50
    },
    bottomText: {
        fontFamily: 'mon-sb',
    },
    //
    codeTextStyle: {
        fontFamily: 'mon-b',
    },
    countryPickerButtonStyle: {
        marginRight: 10,
        borderWidth: 2,
        backgroundColor: COLORS.inputBackgroundColor,
        borderRadius: 16,
        borderColor: COLORS.gray,
    },
    textContainerStyle: {
        height: 60,
        backgroundColor: COLORS.inputBackgroundColor,
        flexDirection: 'row',
        borderWidth: 2,
        alignItems: 'center',
        borderRadius: 16,
        borderColor: COLORS.gray,
    },
    textInputStyle: {
        fontFamily: 'mon-b',
    },
    containerStyle: {
        width: '100%',
        backgroundColor: 'transparent',
    },
    acceptTerm: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    acceptTermText: {
        fontFamily: 'mon-sb',
        textAlign: 'center',
    },
    highlightTermText: {
        fontFamily: 'mon-sb',
        color: COLORS.primary
    }


});

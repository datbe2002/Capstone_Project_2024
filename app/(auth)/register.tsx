import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    ActivityIndicator,
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { COLORS } from "../../assets";
import CustomButton from "../../components/Button";
import InputV2 from "../../components/InputV2";
import SpaceBet from "../../components/SpaceBet";
import { decodeJWT, useAuth } from "../context/auth";


import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { router } from "expo-router";
import instance from "../context/axiosConfig";
import { setUserAuthToken } from "../context/authService";
import { useLoadingStore, useUserStore } from "../store/store";

GoogleSignin.configure({
    webClientId: '130210382454-7l7nfrqaeciu2dmf49k4u426vig2c99s.apps.googleusercontent.com',
});
async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}



const { height, width } = Dimensions.get("window");
interface ErrorState {
    user?: string,
    password?: string
}

const RegisterPage = () => {
    const [inputs, setInputs] = React.useState({
        user: '',
        password: ''
    });
    const [errors, setErrors] = React.useState<ErrorState>({

    });

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;
        console.log(inputs?.user)
        if (!inputs.user) {
            handleError('Không được để trống ô này', 'user');
            isValid = false;
        } else if (inputs.user.length < 6) {
            handleError('Tên người dùng phải 6 kí tự trở lên', 'user');
            isValid = false;
        }
        if (!inputs.password) {
            handleError('Không được để trống ô này', 'password');
            isValid = false;
        }

        if (isValid) {
            // loginTest({ test: inputs?.user });
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
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={-30}
            style={styles.loginContainer}
        >
            {loading ? (
                <View style={styles.activityLoading}>
                    <ActivityIndicator color={COLORS.primary} size={50}></ActivityIndicator>
                </View>
            ) : (<View style={styles.loginForm}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Đăng ký</Text>
                    <Text style={styles.des}>Chưa có tài khoản?</Text>
                    <Text style={styles.des}>Hãy bắt đầu mua sắm nào.</Text>
                </View>
                <View style={styles.inputCo}>

                    <InputV2
                        onChangeText={text => handleOnchange(text, 'user')}
                        onFocus={() => handleError(null, 'user')}
                        error={errors.user}
                        placeholder="Tên đăng nhập..." label="Tên đăng nhập" iconPlace={<AntDesign name="user" size={24} color={COLORS.black} />} />
                    <SpaceBet height={10} />

                    <InputV2
                        onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        error={errors.password}
                        placeholder="Mật khẩu" password label="Mật khẩu" iconPlace={<Ionicons name="lock-closed-outline" size={24} color={COLORS.black} />} />
                    <SpaceBet height={20} />
                    <CustomButton
                        buttonText="Đăng kí"
                        style={{ width: "100%" }}
                        onPress={validate}
                    />
                    <SpaceBet height={20} />
                    <CustomButton
                        buttonText="Đăng kí với Google"
                        buttonColor="secondary"
                        style={{ width: "100%" }}
                        onPress={() =>
                            onGoogleButtonPress()
                                .then(result => {
                                    console.log(result);
                                    setLoadingState(true)
                                    const { uid, email, displayName, photoURL } = result.user;
                                    instance.post(`/api/auth/login-with-google?userId=${uid}`,
                                        {
                                            email: email,
                                            name: displayName,
                                            imageUrl: photoURL
                                        })
                                        .then((response) => {
                                            const token = response.data.data.accessToken
                                            const decoded = decodeJWT(token);
                                            const userID = decoded.UserId
                                            instance.get(`/api/user/profile/${userID}`)
                                                .then((res) => {
                                                    const userData = res.data.data
                                                    setLoadingState(false)
                                                    setUserState(userData);
                                                    setUserAuthToken(token)
                                                })
                                        })
                                        .catch((apiError) => {
                                            console.error('API call failed:', apiError);
                                        });
                                })
                                .catch(e => {
                                    console.log(e);
                                })
                        }
                    />
                    <SpaceBet height={20} />
                    <TouchableOpacity style={styles.bottomTextContainer} onPress={() => router.push('/(auth)/login')}>
                        <Text style={styles.bottomText}>Đã có tài khoản ? Đăng nhập ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>)}

        </KeyboardAvoidingView>
    );
};

export default RegisterPage;

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        paddingVertical: 20,
        justifyContent: "flex-end",
        backgroundColor: "white",
        alignItems: "center",
    },
    activityLoading: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
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
        color: COLORS.secondary,
    }
});

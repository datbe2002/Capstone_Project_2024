import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { COLORS } from "../../assets";
import CustomButton from "../../components/Button";
import InputV2 from "../../components/InputV2";
import SpaceBet from "../../components/SpaceBet";
import { useAuth } from "../context/auth";
const { height, width } = Dimensions.get("window");
interface ErrorState {
  user?: string,
  password?: string
}

const LoginPage = () => {
  const [inputs, setInputs] = React.useState({
    user: '',
    password: ''
  });
  const [errors, setErrors] = React.useState<ErrorState>({

  });
  const { loginTest } = useAuth()

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
      loginTest({ test: inputs?.user });
    }
  };


  const handleOnchange = (text: string, input: string) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error: string | null, input: string) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-30}
      style={styles.loginContainer}
    >
      <View style={styles.loginForm}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Đăng nhập</Text>
          <Text style={styles.des}>Chào mừng trở lại!</Text>
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
            buttonText="Đăng nhập"
            style={{ width: "100%" }}
            onPress={validate}
          />
          <SpaceBet height={20} />
          <CustomButton
            buttonText="Đăng nhập w GG"
            buttonColor="secondary"
            style={{ width: "100%" }}
            onPress={() => console.log("first")}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: "flex-end",
    backgroundColor: "white",
    alignItems: "center",
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
});

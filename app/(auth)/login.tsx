import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../assets";
import CustomButton from "../../components/Button";
import CustomInput from "../../components/Input";
import SpaceBet from "../../components/SpaceBet";
const { height, width } = Dimensions.get("window");

const LoginPage = () => {
  const [inputUsername, setInputUsername] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");

  const handleInputUsername = (text: string) => {
    setInputUsername(text);
  };
  const handleInputPassword = (text: string) => {
    setInputPassword(text);
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
      style={styles.loginContainer}
    >
      {/* <View style={styles.openComponent}></View> */}
      <View style={styles.loginForm}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Đăng nhập</Text>
          <Text style={styles.des}>Chao mung moi nguoi da den voi shop</Text>
        </View>
        <View style={styles.inputCo}>
          <CustomInput
            placeholder="Tên đăng nhập..."
            onChangeText={handleInputUsername}
            value={inputUsername}
            style={styles.input}
          />
          <SpaceBet height={20} />
          <CustomInput
            placeholder="Mật khẩu"
            onChangeText={handleInputPassword}
            secureTextEntry={true}
            value={inputPassword}
            style={styles.input}
          />
          <SpaceBet height={20} />
          <CustomButton
            buttonText="Đăng nhập"
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
    backgroundColor: "aqua",
    gap: 20,
    padding: 20,
  },
  //   openComponent: {
  //     height: 400,
  //     width: width,
  //     backgroundColor: "blue",
  //   },
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
    backgroundColor: "gray",
    borderColor: COLORS.inputBackgroundColor,
  },
  inputCo: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});

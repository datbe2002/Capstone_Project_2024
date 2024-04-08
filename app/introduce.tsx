import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../assets";
import CustomButton from "../components/Button";
import Background from "../components/BackGround";

const { height, width } = Dimensions.get("window");
const IntroducePage = () => {
  const router = useRouter();
  return (
    <Background imageKey={"i3"}>
      <View style={styles.containerLogin}>
        <View>
          <Text style={styles.shopName}>FTAI</Text>
        </View>
        <View style={styles.textComponent}>
          {/* <Text style={styles.introduceText}>Beautiful eCommerce UI Kit for your online store</Text> */}
        </View>
        <CustomButton
          buttonText="Bắt đầu."
          onPress={() => router.push("/(auth)/register")}
        />
        <Pressable
          style={styles.accountHad}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={{ fontFamily: 'mon-sb', fontSize: 18 }}>Tôi đã có tài khoản</Text>
          <AntDesign name="rightcircle" size={24} color={COLORS.primary} />
        </Pressable>
      </View>
    </Background>
  );
};

export default IntroducePage;

const styles = StyleSheet.create({
  containerLogin: {
    height: height,
    width: width,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  shopName: {
    fontSize: 52,
    fontWeight: "700",
  },
  textComponent: {
    height: 80,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
  },
  introduceText: {
    textAlign: "center",
    fontSize: 19,
    lineHeight: 33,
  },
  accountHad: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

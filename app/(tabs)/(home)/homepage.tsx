import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";

import { Text, View } from "../../../components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../../components/Input";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../../../assets";
import { useState } from "react";
const { height, width } = Dimensions.get("window");

import { categories } from "../exampledata";

export default function HomepageScreen() {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (text: string) => {
    setSearchValue(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
          <TouchableOpacity onPress={() => router.replace("/introduce")}>
            <Text>hello homepage</Text>
          </TouchableOpacity>
        </View> */}
      <View style={[styles.horizWrapper, styles.searchBoxWrapper]}>
        <Text style={styles.title}>Shop</Text>
        <View>
          <CustomInput
            placeholder="Tìm kiếm..."
            onChangeText={handleSearch}
            value={searchValue}
            style={styles.searchInput}
            elementAfter={
              <FontAwesome5 name="search" size={22} color={COLORS.primary} />
            }
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={[styles.horizWrapper, styles.cateTitleWrapper]}>
          <Text style={styles.title}>Categories</Text>
          <Pressable
            style={styles.horizWrapper}
            onPress={() => console.log("more")}
          >
            <Text style={styles.secondaryTitle}>See All</Text>
            <FontAwesome5
              name="arrow-circle-right"
              size={20}
              color={COLORS.primary}
            />
          </Pressable>
        </View>

        <View style={styles.cateList}>
          {categories?.map((item: any, index) => (
            <View key={index} style={styles.cateCard}>
              <Image
                style={styles.cateImg}
                source={
                  item.imgSrc
                    ? { uri: item.imgSrc }
                    : require("../../../assets/images/default.png")
                }
              />
              <Text>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "mon-b",
  },
  secondaryTitle: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  searchBoxWrapper: {
    paddingHorizontal: 10,
    height: "8%",
    gap: 30,
  },
  searchInput: {
    height: 40,
    width: "85%",
    backgroundColor: COLORS.inputBackgroundColor,
    borderColor: COLORS.inputBackgroundColor,
    elevation: 2,
  },
  cateTitleWrapper: {
    gap: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cateList: {
    paddingVertical: 10,
    minHeight: 250,
    backgroundColor: "aqua",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  cateCard: {
    height: width / 2,
    width: width / 2.2,
  },
  cateImg: {
    height: 50,
    width: "auto",
    objectFit: "contain",
  },
});

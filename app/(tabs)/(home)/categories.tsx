import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SHADOWS, SIZES } from "../../../assets";
import { categories } from "../../../constants/exampledata";
const { height, width } = Dimensions.get("window");

export default function CategoriesFilter() {
  const route = useRouter();

  const [activeTab, setActiveTab] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Tất cả danh mục</Text>
        <AntDesign
          name="close"
          size={28}
          color="black"
          onPress={() => {
            route.push("/(tabs)/(home)/homepage");
            // route.setParams({ cateFillter: "this is filter" });
          }}
        />
      </View>
      <View style={styles.tabs}>
        <Pressable
          onPress={() => {
            setActiveTab(1);
          }}
        >
          <Text
            style={
              activeTab === 1 ? [styles.tabItem, styles.active] : styles.tabItem
            }
          >
            Tất cả
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setActiveTab(2);
          }}
        >
          <Text
            style={
              activeTab === 2 ? [styles.tabItem, styles.active] : styles.tabItem
            }
          >
            Nam
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setActiveTab(3);
          }}
        >
          <Text
            style={
              activeTab === 3 ? [styles.tabItem, styles.active] : styles.tabItem
            }
          >
            Nữ
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.cateWrapper}>
        <View style={styles.cateList}>
          {categories.map((item: any, index) => (
            <Pressable
              key={index}
              onPress={() => {
                console.log("cate " + item.name);
              }}
            >
              <View style={[styles.cateItem, SHADOWS.small]}>
                <Text style={styles.secondaryTitle}>{item.name}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      {/* <View>
        <Text>Cho bạn</Text>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  heading: {
    height: 65,
    paddingHorizontal: 10,
    paddingRight: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: "mon-b",
  },
  secondaryTitle: {
    fontSize: SIZES.medium,
    fontFamily: "mon-sb",
  },
  tabs: {
    height: 40,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  tabItem: {
    fontFamily: "mon",
    fontSize: SIZES.medium,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.inputBackgroundColor,
    width: width / 3.5,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 7,
  },
  active: {
    borderColor: COLORS.primary,
    color: COLORS.primary,
  },
  cateWrapper: {
    paddingVertical: 10,
  },
  cateList: {
    flex: 1,
    padding: 10,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  cateItem: {
    height: 40,
    width: width / 2.2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: COLORS.white,
    borderColor: COLORS.pink,
    borderWidth: 2,
    borderRadius: 5,
  },
});

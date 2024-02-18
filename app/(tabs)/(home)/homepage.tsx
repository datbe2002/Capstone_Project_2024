import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Text, View } from "../../../components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../../components/Input";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLORS, SHADOWS, SIZES } from "../../../assets";
import { useState } from "react";
const { height, width } = Dimensions.get("window");

import {
  categories,
  newItems,
  recommendations,
  topProducts,
} from "../exampledata";

export default function HomepageScreen() {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (text: string) => {
    setSearchValue(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* search box */}
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
      {/* main */}
      <ScrollView style={styles.container}>
        {/* categories */}
        <View style={styles.categories}>
          <View style={[styles.horizWrapper, styles.cateTitleWrapper]}>
            <Text style={styles.title}>Danh mục</Text>
            <Pressable
              style={styles.horizWrapper}
              onPress={() => {
                console.log("more cate");
              }}
            >
              <Text style={styles.secondaryTitle}>Xem tất cả</Text>
              <FontAwesome5
                name="arrow-circle-right"
                size={20}
                color={COLORS.primary}
              />
            </Pressable>
          </View>

          <View style={styles.cateList}>
            {categories?.map((item: any, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  console.log("cate " + index);
                }}
              >
                <View style={[styles.cateCard, SHADOWS.medium]}>
                  <Image
                    style={styles.cateImg}
                    source={
                      item.imgSrc
                        ? { uri: item.imgSrc }
                        : require("../../../assets/images/default.png")
                    }
                  />
                  <Text style={[styles.cateTitle, styles.secondaryTitle]}>
                    {item.name}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        {/* top product */}
        <View style={styles.topProducts}>
          <Text style={styles.title}>Bán chạy nhất</Text>
          <View style={styles.topProductsList}>
            {topProducts.map((item: any, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  console.log("popular " + index);
                }}
              >
                <View style={[styles.topProductItem, SHADOWS.small]}>
                  <Image
                    style={styles.topProductImg}
                    source={
                      item.imgSrc
                        ? { uri: item.imgSrc }
                        : require("../../../assets/images/default.png")
                    }
                  />
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        {/* new items */}
        <View style={styles.newItems}>
          <View style={[styles.horizWrapper, styles.cateTitleWrapper]}>
            <Text style={styles.title}>Sản phẩm mới</Text>
            <Pressable
              style={styles.horizWrapper}
              onPress={() => {
                console.log("more new item");
              }}
            >
              <Text style={styles.secondaryTitle}>Xem tất cả</Text>
              <FontAwesome5
                name="arrow-circle-right"
                size={20}
                color={COLORS.primary}
              />
            </Pressable>
          </View>

          <ScrollView style={styles.newItemsList} horizontal={true}>
            {newItems.map((item: any, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  console.log("new item " + index);
                }}
              >
                <View style={styles.itemCard}>
                  <View style={[styles.itemImgContainer, SHADOWS.medium]}>
                    <Image
                      style={styles.itemImg}
                      source={
                        item.imgSrc
                          ? { uri: item.imgSrc }
                          : require("../../../assets/images/default.png")
                      }
                    />
                  </View>
                  <Text
                    style={[styles.itemDes, { height: "auto" }]}
                    numberOfLines={1}
                  >
                    {item.description}
                  </Text>
                  <Text style={styles.itemPrice}>{item.price}đ</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        {/* recommendations */}
        <View style={styles.recommendations}>
          <Text style={styles.title}>Đề Xuất Cho Bạn</Text>
          <View style={styles.recommendationsList}>
            {recommendations.map((item: any, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  console.log("recommend " + index);
                }}
              >
                <View style={styles.recommendCard}>
                  <View style={[styles.recommendImgContainer, SHADOWS.medium]}>
                    <Image
                      style={styles.recommendImg}
                      source={
                        item.imgSrc
                          ? { uri: item.imgSrc }
                          : require("../../../assets/images/default.png")
                      }
                    />
                  </View>
                  <Text style={styles.itemDes} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <Text style={styles.itemPrice}>{item.price}đ</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
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
    fontSize: SIZES.xLarge,
    fontFamily: "mon-b",
  },
  secondaryTitle: {
    fontSize: SIZES.medium,
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
  categories: {
    paddingVertical: 10,
    gap: 15,
  },
  cateTitleWrapper: {
    gap: 30,
    paddingHorizontal: 10,
  },
  cateList: {
    paddingBottom: 5,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  cateCard: {
    height: width / 2.5,
    width: width / 2.2,
    borderRadius: 10,
    position: "relative",
    backgroundColor: COLORS.inputBackgroundColor,
  },
  cateImg: {
    height: width / 2.6,
    width: width / 2.2,
    top: 0,
    objectFit: "fill",
    position: "absolute",
    backgroundColor: "transparent",
  },
  cateTitle: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  topProducts: {
    minHeight: 120,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
  },
  topProductsList: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  topProductItem: {
    width: width / 5.5,
    height: width / 5.5,
    borderRadius: width / 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  topProductImg: {
    width: width / 6.6,
    height: width / 6.6,
    borderRadius: width / 13,
    position: "absolute",
  },
  newItems: {
    // minHeight: 500,
    paddingVertical: 10,
  },
  newItemsList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
  },
  itemCard: {
    width: width / 3,
    height: width / 2,
    alignItems: "center",
    gap: 5,
    padding: 5,
  },
  itemImgContainer: {
    width: width / 3.5,
    height: width / 3,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  itemImg: {
    width: width / 3.7,
    height: width / 3.2,
    borderRadius: 3,
    // borderWidth: 1,
    // borderColor: "red",
  },
  itemDes: {
    paddingVertical: 5,
    height: width / 8,
    width: "100%",
    textAlign: "left",
    fontSize: SIZES.medium,
    textAlignVertical: "top",
  },
  itemPrice: {
    width: "100%",
    textAlign: "left",
    fontFamily: "mon-b",
    fontSize: SIZES.large,
  },
  recommendations: {
    paddingHorizontal: 10,
    minHeight: 200,
  },
  recommendationsList: {
    paddingVertical: 10,
    paddingBottom: 35,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: 5,
  },
  recommendCard: {
    width: width / 2.15,
    minHeight: width / 1.5,
    paddingBottom: 10,
    gap: 3,
    alignItems: "center",
    justifyContent: "space-between",
  },
  recommendImgContainer: {
    width: width / 2.15,
    height: width / 2,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  recommendImg: {
    width: width / 2.3,
    height: width / 2.15,
    borderRadius: 5,
    objectFit: "cover",
  },
});

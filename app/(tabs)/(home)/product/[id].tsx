import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SHADOWS, SIZES } from "../../../../assets";
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  Fontisto,
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Carousel from "../../../../components/Carousel";
// import Carousel from "react-native-snap-carousel";
const { height, width } = Dimensions.get("window");
const ProductDetail = () => {
  const route = useRouter();
  const { id } = useLocalSearchParams();
  console.log("detail " + id);

  const item: any = {
    id: id,
    name: "Áo",
    description:
      "Áo quần đẹp vlz, còn chờ gì nữa mà không mua, mua đi để xài, mua không xài thì pass lại cho người nhà xài",
    price: 200000,
    defaultImg: "",
    imgs: [
      { id: 1, imgSrc: "" },
      { id: 2, imgSrc: "" },
      { id: 3, imgSrc: "" },
      { id: 4, imgSrc: "" },
    ],
  };

  const _renderItem = (item: any) => {
    return (
      <Image
        style={styles.img}
        source={
          item.imgSrc
            ? { uri: item.imgSrc }
            : require("../../../../assets/images/default.png")
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Ionicons
          name="chevron-back"
          size={32}
          color={COLORS.primary}
          onPress={() => {
            route.canGoBack()
              ? route.back()
              : route.push("/(tabs)/(home)/homepage");
          }}
        />
      </View>
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.imgWrapper}>
            <Carousel
              items={item.imgs}
              renderItem={_renderItem}
              screenWidth={width}
            />
          </View>

          <View style={[styles.horizWrapper, { paddingHorizontal: 20 }]}>
            <Text style={styles.itemPrice}>{item.price}đ</Text>
            <View style={styles.horizWrapper}>
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: SIZES.xxLarge / 2,
                  padding: 3,
                }}
              >
                <MaterialCommunityIcons
                  name="tshirt-crew"
                  size={SIZES.large}
                  color={COLORS.white}
                  onPress={() => route.push("/(tabs)/(tryonl)/wardrove")}
                />
              </View>

              <MaterialCommunityIcons
                name="share-circle"
                size={SIZES.xxLarge}
                color={COLORS.primary}
              />
            </View>
          </View>
          <View>
            <Text style={styles.itemDes}>{item.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.bottom, SHADOWS.medium]}>
        <AntDesign name={"heart"} size={30} color={"red"} />
        <Text
          style={[
            styles.button,
            { backgroundColor: COLORS.black, color: COLORS.white },
          ]}
        >
          Thêm vào giỏ hàng
        </Text>
        <Text
          style={[
            styles.button,
            { backgroundColor: COLORS.primary, color: COLORS.white },
          ]}
        >
          Mua ngay
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    position: "relative",
  },
  heading: {
    height: 50,
    width: width,
    paddingHorizontal: 15,
    justifyContent: "center",
    position: "absolute",
    top: 25,
    zIndex: 1,
    backgroundColor: "transparent",
  },
  horizWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  title: {
    fontSize: SIZES.xxLarge,
    fontFamily: "mon-b",
  },
  secondaryTitle: {
    fontSize: SIZES.medium,
    fontFamily: "mon-sb",
  },
  main: {},
  imgWrapper: {
    width: width,
    minHeight: width,
  },
  img: {
    width: width,
    height: width * 1.05,
    objectFit: "cover",
  },
  itemPrice: {
    padding: 10,
    height: 60,
    textAlign: "left",
    textAlignVertical: "center",
    fontFamily: "mon-b",
    fontSize: SIZES.xLarge,
  },
  itemDes: {
    padding: 10,
    minHeight: 200,
    width: "100%",
    textAlign: "left",
    fontFamily: "mon-sb",
    fontSize: SIZES.medium,
    textAlignVertical: "top",
  },
  bottom: {
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    display: "flex",
    height: 90,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 15,
    paddingBottom: 35,
    alignItems: "center",
  },
  button: {
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "mon-sb",
    fontSize: SIZES.medium,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

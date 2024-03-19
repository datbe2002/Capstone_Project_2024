import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SHADOWS, SIZES } from "../../../../assets";
import {
  ActivityIndicator,
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
import { useQuery } from "@tanstack/react-query";
import { addToCart, getProductById } from "../../../context/productsApi";
import { useUserStore } from "../../../store/store";
// import Carousel from "react-native-snap-carousel";
const { height, width } = Dimensions.get("window");
const ProductDetail = () => {
  const route = useRouter();
  const { id } = useLocalSearchParams();
  const { userState } = useUserStore();

  const productQuery = useQuery({
    queryKey: ["product"],
    queryFn: () => getProductById(id),
  });

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      addToCart({
        userId: userState?.id,
        product: productQuery.data.data,
        cartId: userState?.userCartId,
      });
    },
  });

  const handleAddToCart = () => {};

  // const item: any = {
  //   id: id,
  //   name: "Áo",
  //   description:
  //     "Áo quần đẹp vlz, còn chờ gì nữa mà không mua, mua đi để xài, mua không xài thì pass lại cho người nhà xài",
  //   price: 200000,
  //   defaultImg: "",
  //   imgs: [
  //     { id: 1, imgSrc: "" },
  //     { id: 2, imgSrc: "" },
  //     { id: 3, imgSrc: "" },
  //     { id: 4, imgSrc: "" },
  //   ],
  // };

  // {
  //   "data": {
  //     "name": "1",
  //     "description": "1111",
  //     "defaultImage": "https://thewellco.co/wp-content/uploads/2022/03/HM-Conscious-Collection-Organic-Baby-Clothes.jpeg",
  //     "tryOnImage": "null",
  //     "canTryOn": true,
  //     "edgeImage": "null",
  //     "totalSold": 1,
  //     "category": {
  //       "name": "Cate1",
  //       "subCategories": [],
  //       "id": 2,
  //       "isDeleted": false,
  //       "createAt": "2024-12-03T00:00:00",
  //       "updateAt": "2024-12-03T00:00:00",
  //       "updateBy": "e88ff380-70df-4c3b-acdb-08dc3eb66a4a",
  //       "createBy": "e88ff380-70df-4c3b-acdb-08dc3eb66a4a"
  //     },
  //     "brand": {
  //       "name": "Brand1",
  //       "id": 1,
  //       "isDeleted": false,
  //       "createAt": "2024-12-03T00:00:00",
  //       "updateAt": "2024-12-03T00:00:00",
  //       "updateBy": "e88ff380-70df-4c3b-acdb-08dc3eb66a4a",
  //       "createBy": "e88ff380-70df-4c3b-acdb-08dc3eb66a4a"
  //     },
  //     "tryOnImageResult": null,
  //     "properties": [],
  //     "images": [],
  //     "productVariants": [],
  //     "id": 1,
  //     "isDeleted": false,
  //     "createAt": "2024-12-03T00:00:00",
  //     "updateAt": "2024-12-03T00:00:00",
  //     "updateBy": "e88ff380-70df-4c3b-acdb-08dc3eb66a4a",
  //     "createBy": "e88ff380-70df-4c3b-acdb-08dc3eb66a4a"
  //   },
  //   "isSuccess": true,
  //   "message": "Get product successfully",
  //   "validationErrors": null
  // }

  const _renderItem = (item: any) => {
    return (
      <Image
        style={styles.img}
        source={
          item.imageUrl
            ? { uri: item.imageUrl }
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
      {productQuery.isLoading ? <ActivityIndicator /> : null}
      {productQuery.isSuccess ? (
        <ScrollView>
          <View style={styles.main}>
            <View style={styles.imgWrapper}>
              <Carousel
                items={productQuery.data.data.images}
                renderItem={_renderItem}
                screenWidth={width}
              />
            </View>

            <View style={[styles.horizWrapper, { paddingHorizontal: 20 }]}>
              <Text style={styles.itemPrice}>
                {productQuery.data.data.price}đ
              </Text>
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
              <Text style={styles.itemDes}>
                {productQuery.data.data.description}
              </Text>
            </View>
            <View style={styles.variantContaner}>
              <Text style={styles.secondaryTitle}>Product variation</Text>
              <View style={styles.variantItemList}>
                {productQuery.data.data.productVariants.map(
                  (item: any, index: any) => (
                    <View key={index} style={[styles.variantItem]}>
                      <Text style={styles.variantText}>{item.size.value}</Text>
                      <Text style={styles.variantText}>{item.color.name}</Text>
                    </View>
                  )
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator />
      )}

      <View style={[styles.bottom, SHADOWS.medium]}>
        <AntDesign name={"heart"} size={30} color={"red"} />
        <Text
          style={[
            styles.button,
            { backgroundColor: COLORS.black, color: COLORS.white },
          ]}
          onPress={() => {
            console.log("add to cart");
          }}
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
    minHeight: 100,
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
  variantContaner: {
    paddingHorizontal: 10,
    gap: 10,
  },
  variantItemList: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 10,
  },
  variantItem: {
    minWidth: 120,
    height: 40,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: COLORS.black,
    backgroundColor: COLORS.pink,
    borderRadius: 8,
  },
  variantText: {
    fontFamily: "mon",
    fontSize: SIZES.medium,
  },
});

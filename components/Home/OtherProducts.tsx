import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../assets";
import { CartItem, Product } from "../../constants/Type";
import { transNumberFormatter } from "../Payment/ShippingFee";
import { useOrderItems } from "../../app/store/store";
import EmptyComponentCustom from "../EmptyComponentCustom";
const { height, width } = Dimensions.get("window");

interface OtherProducts {
  props?: any;
  data: Array<Product>;
  userState: any;
}

const OtherProducts: React.FC<OtherProducts> = ({ props, data, userState }) => {
  const router = useRouter();
  const isOdd = data.length % 2 !== 0;

  const { orderItems, setOrderItems } = useOrderItems();

  if (data.length < 1) {
    return <EmptyComponentCustom text={'Không có sản phẩm phù hợp'} icon={<FontAwesome name="tasks" size={45} color={COLORS.white} />} />
  }

  return (
    <View style={styles.data}>
      <View style={[styles.dataList, isOdd && styles.odd]}>
        {data.map((item: any, index) => (
          <Pressable
            key={index}
            onPress={() => {
              router.push({
                pathname: "/product/[id]",
                params: { id: item.id },
              });
            }}
          >
            <View style={styles.recommendCard}>
              <View style={[styles.recommendImgContainer]}>
                <Image
                  style={styles.recommendImg}
                  source={
                    item.defaultImage
                      ? { uri: item.defaultImage }
                      : require("../../assets/images/default.png")
                  }
                />
              </View>
              <Text style={styles.itemDes} numberOfLines={2}>
                {item.name}
              </Text>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.itemPrice}>
                  {(item.productVariants[0]?.price)
                    .toLocaleString("en-US", { minimumFractionDigits: 0 })
                    .replace(/,/g, " ")}
                  đ
                </Text>
                <TouchableOpacity
                  style={styles.buyProd}
                  onPress={() => {
                    const obj: CartItem = {
                      cartId: userState?.userCartId,
                      color: item.productVariants[0].color.colorCode,
                      price: item.productVariants[0].price,
                      product: item,
                      productId: item.id,
                      quantity: 1,
                      size: item.productVariants[0].size.value,
                      sku: item.productVariants[0].sku,
                    };

                    setOrderItems({
                      items: [obj],
                      total: obj.price,
                      totalQuantityProd: 1,
                    });
                    router.push("/payment");
                  }}
                >
                  <View>
                    <Ionicons name="cart" size={20} color={COLORS.white} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default OtherProducts;

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
  data: {
    paddingHorizontal: 10,
    minHeight: 200,
    backgroundColor: "transparent",
    width: "100%",
  },
  dataList: {
    paddingVertical: 10,
    paddingBottom: 35,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: 5,
  },
  odd: {
    justifyContent: "flex-start",
  },
  recommendCard: {
    width: width / 2.15,
    minHeight: width / 1.5,
    gap: 3,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderColor: COLORS.gray,
    borderRadius: 15,
    borderWidth: 1,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  recommendImgContainer: {
    width: width / 2.15,
    height: width / 1.8,
    alignItems: "center",
    justifyContent: "center",
  },
  recommendImg: {
    width: width / 2.3,
    height: width / 1.9,
    objectFit: "cover",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  itemDes: {
    paddingVertical: 2,
    minHeight: 30,
    width: "100%",
    textAlign: "left",
    fontSize: SIZES.medium,
    textAlignVertical: "top",
    fontFamily: "mon-sb",
    // backgroundColor: "red",
  },
  itemPrice: {
    textAlign: "left",
    fontFamily: "mon-b",
    fontSize: SIZES.large,
    color: COLORS.primary,
    height: 30,
    // backgroundColor: "red",
  },
  buyProd: {
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    padding: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../assets";
import { Product } from "../../constants/Type";
// import { categories } from "../../app/(tabs)/exampledata";
const { height, width } = Dimensions.get("window");

interface OtherProducts {
  props?: any;
  data: Array<Product>;
}

const OtherProducts: React.FC<OtherProducts> = ({ props, data }) => {
  const router = useRouter();
  return (
    <View style={styles.data}>
      <View style={styles.dataList}>
        {data.map((item: any, index) => (
          <Pressable
            key={index}
            onPress={() => {
              router.push({
                pathname: "/(tabs)/(home)/product/[id]",
                params: { id: item.id },
              });
            }}
          >
            <View style={styles.recommendCard}>
              <View style={[styles.recommendImgContainer, SHADOWS.medium]}>
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
                {item.description}
              </Text>
              <Text style={styles.itemPrice}>
                {item.productVariants[0]?.price} đ
              </Text>
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
    backgroundColor: "white",
  },
  recommendImg: {
    width: width / 2.3,
    height: width / 2.15,
    borderRadius: 9,
    objectFit: "cover",
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
});
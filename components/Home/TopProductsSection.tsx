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

interface TopProductsProps {
  props?: any;
  topProducts: Array<Product>;
}

const TopProductsSection: React.FC<TopProductsProps> = ({
  props,
  topProducts,
}) => {
  const router = useRouter();

  return (
    <View style={styles.topProducts}>
      <Text style={styles.title}>Bán chạy nhất</Text>
      <View style={styles.topProductsList}>
        {topProducts.map((item: Product, index) => (
          <Pressable
            key={index}
            onPress={() => {
              router.push({
                pathname: "/(tabs)/(home)/product/[id]",
                params: { id: item.id },
              });
            }}
          >
            <View style={[styles.topProductItem, SHADOWS.small]}>
              <Image
                style={styles.topProductImg}
                source={
                  item.defaultImage
                    ? { uri: item.defaultImage }
                    : require("../../assets/images/default.png")
                }
              />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default TopProductsSection;

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
  topProducts: {
    minHeight: 120,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
    elevation: 0,
    backgroundColor: "transparent",
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
    borderRadius: width / 11,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "white",
  },
  topProductImg: {
    width: width / 6.4,
    height: width / 6.4,
    borderRadius: width / 12.8,
    position: "absolute",
  },
});

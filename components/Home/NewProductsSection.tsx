import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../assets";
import { Product } from "../../constants/Type";
const { height, width } = Dimensions.get("window");

interface NewProductProps {
  props?: any;
  newProduct: Array<Product>;
}

const NewProductSection: React.FC<NewProductProps> = ({
  props,
  newProduct,
}) => {
  const router = useRouter();
  return (
    <View style={styles.newItems}>
      <View style={[styles.horizWrapper, styles.cateTitleWrapper]}>
        <Text style={styles.title}>Sản phẩm mới</Text>
        <Pressable
          style={styles.horizWrapper}
          onPress={() => router.push("/(tabs)/(home)/products")}
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
        {newProduct.map((item: any, index) => (
          <Pressable
            key={index}
            onPress={() => {
              router.push({
                pathname: "/product/[id]",
                params: { id: item.id },
              });
            }}
          >
            <View style={styles.itemCard}>
              <View style={[styles.itemImgContainer, SHADOWS.medium]}>
                <Image
                  style={styles.itemImg}
                  source={
                    item.defaultImage
                      ? { uri: item.defaultImage }
                      : require("../../assets/images/default.png")
                  }
                />
              </View>
              <Text
                style={[styles.itemDes, { height: "auto" }]}
                numberOfLines={1}
              >
                {item.description}
              </Text>
              <Text style={styles.itemPrice}>
                {item.productVariants[0].price}đ
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default NewProductSection;

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
  newItems: {
    // minHeight: 500,
    paddingVertical: 10,
    backgroundColor: "transparent",
  },
  newItemsList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
  },
  itemCard: {
    width: width / 3,
    height: width / 1.8,
    alignItems: "center",
    gap: 5,
    padding: 5,
    backgroundColor: "transparent",
  },
  itemImgContainer: {
    width: width / 3.5,
    height: width / 3,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gray1,
  },
  itemImg: {
    width: width / 3.8,
    height: width / 3.2,
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
  cateTitleWrapper: {
    gap: 30,
    paddingHorizontal: 10,
  },
});

import React from "react";
import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import { Product } from "../../constants/Type";
import { SHADOWS, SIZES } from "../../assets";

interface Props {
  data: Product;
  variant: any;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
  },
  image: {
    width: "33%",
    height: 120,
    marginRight: 10,
    objectFit: "cover",
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  name: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    height: 50,
  },
  price: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
});

const ProductCardShort: React.FC<Props> = ({ data, variant }) => (
  <View style={styles.container}>
    <Image
      source={
        data.defaultImage
          ? { uri: data.defaultImage }
          : require("../../assets/images/default.png")
      }
      style={styles.image}
    />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {data.description}
      </Text>
      {variant ? (
        <Text style={styles.price}>{variant?.price} đ</Text>
      ) : (
        <Text></Text>
      )}
    </View>
  </View>
);

export default ProductCardShort;

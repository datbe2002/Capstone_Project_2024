import React from "react";
import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import { Product } from "../../constants/Type";
import { COLORS, SHADOWS, SIZES } from "../../assets";

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
    fontFamily: "mon-b",
  },
  description: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: COLORS.darkGray,
    height: 50,
  },
  price: {
    fontSize: SIZES.medium,
    fontFamily: "mon-b",
  },
  sku: {
    backgroundColor: COLORS.white,
    position: "absolute",
    height: 20,
    bottom: 5,
    left: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    color: COLORS.errorColor,
    borderWidth: 1,
    borderColor: COLORS.gray1,
    fontFamily: "mon",
    // Add other styles as needed
  },
});

const ProductCardShort: React.FC<Props> = ({ data, variant }) => {
  console.log(variant);

  return (
    <View style={styles.container}>
      <Image
        source={
          data.defaultImage
            ? { uri: data.defaultImage }
            : require("../../assets/images/default.png")
        }
        style={styles.image}
      />
      {variant && <Text style={styles.sku}>{variant.sku}</Text>}
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
};

export default ProductCardShort;

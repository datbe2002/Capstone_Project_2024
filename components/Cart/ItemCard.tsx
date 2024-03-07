import React, { FC, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../assets";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
const { height, width } = Dimensions.get("window");
type Props = {
  item: Product;
  handleQuantityChange: (item: Product) => void;
  isChecked: any;
  handleCheck: (item: Product) => void;
};

interface Product {
  id: any;
  defaultImg: string;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

const ItemCard: React.FC<Props> = ({
  item,
  handleQuantityChange,
  isChecked,
  handleCheck,
}) => {
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    handleQuantityChange(item);
  }, [quantity]);

  return (
    <View style={styles.container}>
      <View style={styles.checkbox}>
        <CheckBox checked={isChecked} onPress={() => handleCheck(item)} />
      </View>
      <View style={styles.card}>
        <View style={styles.imgWrapper}>
          <Image
            style={styles.img}
            source={
              item.defaultImg
                ? { uri: item.defaultImg }
                : require("../../assets/images/default.png")
            }
          />
        </View>
        <View style={styles.info}>
          <View style={styles.vertiWrapper}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description} numberOfLines={2}>
              Size: {item.size}
            </Text>
            <View
              style={[
                styles.horizWrapper,
                {
                  width: "100%",
                  justifyContent: "flex-start",
                },
              ]}
            >
              <Text style={[styles.description, { width: "auto" }]}>
                Màu: {item.color}
              </Text>
              <View
                style={{ height: 20, width: 50, backgroundColor: item.color }}
              ></View>
            </View>
          </View>
          <View style={styles.horizWrapper}>
            <Text style={styles.price}>{item.price}</Text>
            <View style={styles.quantityWrapper}>
              <AntDesign
                name="minuscircleo"
                size={25}
                color={COLORS.primary}
                style={quantity == 0 ? { opacity: 0.5 } : { opacity: 1 }}
                onPress={() => {
                  if (quantity > 0) {
                    handleDecrease();
                  }
                }}
              />

              <Text style={styles.price}>{item.quantity}</Text>
              <Ionicons
                name="add-circle-outline"
                size={31}
                color={COLORS.primary}
                onPress={() => {
                  handleIncrease();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemCard;
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginVertical: 5,
    width: width * 0.9,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "transparent",
  },
  checkbox: {
    width: width * 0.15,
  },
  card: {
    alignSelf: "center",
    marginVertical: 5,
    height: 120,
    width: width * 0.8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    backgroundColor: COLORS.gray1,
    borderRadius: 5,
    elevation: 1,
  },
  horizWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  vertiWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 5,
  },

  imgWrapper: {
    height: "100%",
    width: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: 110,
    width: 110,
    objectFit: "cover",
    backgroundColor: "transparent",
  },
  iconWrapper: {
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 5,
    left: 5,
    elevation: 2,
  },
  icon: {},
  info: {
    width: width * 0.5,
    padding: 10,
  },
  name: {
    width: "100%",
    textAlign: "left",
    fontFamily: "mon-sb",
    fontSize: SIZES.medium,
  },
  description: {
    width: "100%",
  },
  price: {
    fontFamily: "mon-b",
    fontSize: SIZES.medium,
  },
  quantityWrapper: {
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 10,
  },
});

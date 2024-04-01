import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SHADOWS, SIZES } from "../../../assets";
import Background from "../../../components/BackGround";
import NewProductSection from "../../../components/Home/NewProductsSection";
import { useWardove } from "../../store/store";
import { router } from "expo-router";
import { Product } from "../../../constants/Type";
import { Ionicons } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");

const wardrove = () => {
  const { wardroveItems, setWardroveItems } = useWardove();

  const handleRemoveItem = (itemToRemove: Product) => {
    setWardroveItems((prevItems: Product[]) =>
      prevItems.filter((item: Product) => item.id !== itemToRemove.id)
    );
  };

  const wardroveRenderItem = ({ item }: { item: Product }) => (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/(tabs)/(home)/product/[id]",
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
                : require("../../../assets/images/default.png")
            }
          />
          <Ionicons
            name="trash-outline"
            size={24}
            color={COLORS.errorColor}
            style={styles.removeIcon} // Add this
            onPress={() => {
              handleRemoveItem(item);
            }}
          />
        </View>
      </View>
    </Pressable>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Background imageKey={"i4"}>
        <View style={styles.wrapper}>
          <View style={styles.tryon}>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.img}
                source={require("../../../assets/images/default.png")}
              />
            </View>
            <View style={styles.modelSelector}>
              <Image
                style={styles.img}
                source={require("../../../assets/images/default.png")}
              />
            </View>
          </View>
          <View style={styles.products}>
            <FlatList
              data={wardroveItems}
              renderItem={wardroveRenderItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              style={styles.itemsList}
            />
          </View>
        </View>
      </Background>
    </SafeAreaView>
  );
};

export default wardrove;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  wrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tryon: {
    height: height * 0.7,
    width: "100%",
    alignItems: "center",
    position: "relative",
    backgroundColor: COLORS.white,
  },
  imageWrapper: {
    height: "100%",
    width: width,
    paddingHorizontal: 10,
    position: "absolute",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  modelSelector: {
    height: 80,
    width: 80,
    right: 5,
    top: 10,
    padding: 3,
    position: "absolute",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  products: {
    paddingBottom: 25,
    height: 130,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.inputBackgroundColor,
    elevation: 2,
  },

  itemsList: {
    width: "98%",
    paddingHorizontal: 5,
    paddingVertical: 2,
    display: "flex",
    flexDirection: "row",
  },
  itemCard: {
    width: width / 4,
    height: 100,
    alignItems: "center",
    gap: 5,
    padding: 5,
    backgroundColor: "transparent",
    position: "relative",
  },
  itemImgContainer: {
    width: width / 4.5,
    height: 85,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  itemImg: {
    width: width / 4.7,
    height: 80,
    borderRadius: 9,
    objectFit: "cover",
  },
  removeIcon: {
    position: "absolute",
    top: 5, // Adjust as needed
    right: 5, // Adjust as needed
  },
});

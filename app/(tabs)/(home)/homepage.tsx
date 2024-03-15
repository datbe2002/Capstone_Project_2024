import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Text, View } from "../../../components/Themed";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../../components/Input";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLORS, SHADOWS, SIZES } from "../../../assets";
import { useEffect, useState } from "react";
const { height, width } = Dimensions.get("window");

import {
  categories,
  newItems,
  recommendations,
  topProducts,
} from "../exampledata";
import CategoriesSection from "../../../components/Home/CategoriesSection";
import TopProductsSection from "../../../components/Home/TopProductsSection";
import NewProductsSection from "../../../components/Home/NewProductsSection";
import RecommendationsSection from "../../../components/Home/Recommendations";
import { useQuery } from "@tanstack/react-query";
import {
  getNewProduct,
  getProducts,
  getTopProducts,
} from "../../context/productsApi";

export default function HomepageScreen() {
  const router = useRouter();
  const homeCategories = categories.slice(0, 4);

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (text: string) => {
    setSearchValue(text);
  };

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const newProductsQuery = useQuery({
    queryKey: ["newProducts"],
    queryFn: () => getNewProduct(6),
  });

  const topProductsQuery = useQuery({
    queryKey: ["topProducts"],
    queryFn: () => getTopProducts(5),
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* search box */}
      <View style={[styles.horizWrapper, styles.searchBoxWrapper]}>
        <Text style={styles.title}>Shop</Text>
        <View>
          <CustomInput
            placeholder="Tìm kiếm..."
            onChangeText={handleSearch}
            value={searchValue}
            style={styles.searchInput}
            elementAfter={
              <FontAwesome5 name="search" size={22} color={COLORS.primary} />
            }
          />
        </View>
      </View>
      {/* main */}
      <ScrollView style={styles.container}>
        {/* categories */}
        <CategoriesSection categories={homeCategories} />
        {/* top product */}
        {topProductsQuery.isLoading ? <ActivityIndicator /> : null}
        {topProductsQuery.isSuccess ? (
          <TopProductsSection topProducts={topProductsQuery.data} />
        ) : (
          <ActivityIndicator />
        )}

        {/* new items */}
        {newProductsQuery.isLoading ? <ActivityIndicator /> : null}
        {newProductsQuery.isSuccess ? (
          <NewProductsSection newProducts={newProductsQuery.data} />
        ) : (
          <ActivityIndicator />
        )}

        {/* recommendations */}
        {productsQuery.isLoading ? <ActivityIndicator /> : null}
        {productsQuery.isSuccess ? (
          <RecommendationsSection recommendations={productsQuery.data} />
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  searchBoxWrapper: {
    paddingHorizontal: 10,
    height: 55,
    gap: 30,
  },
  searchInput: {
    height: 40,
    width: "85%",
    backgroundColor: COLORS.inputBackgroundColor,
    borderColor: COLORS.inputBackgroundColor,
    elevation: 2,
  },
});

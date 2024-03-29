import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../../assets";
import CustomInput from "../../../components/Input";
import { Text, View } from "../../../components/Themed";
import { useQuery } from "@tanstack/react-query";
import Background from "../../../components/BackGround";
import CategoriesSection from "../../../components/Home/CategoriesSection";
import NewProductsSection from "../../../components/Home/NewProductsSection";
import RecommendationsSection from "../../../components/Home/Recommendations";
import TopProductsSection from "../../../components/Home/TopProductsSection";
import instance from "../../context/axiosConfig";
import {
  getNewProduct,
  getProducts,
  getTopProducts,
} from "../../context/productsApi";
import { useUserIDStore, useUserStore } from "../../store/store";
import { categories } from "../exampledata";

export default function HomepageScreen() {
  const homeCategories = categories.slice(0, 4);
  const { userId } = useUserIDStore();
  console.log(userId);
  const [searchValue, setSearchValue] = useState<string>("");
  const { userState, setUserState } = useUserStore();
  useEffect(() => {
    const getCart = async () => {
      try {
        console.log("first");
        const userCart = await instance.get("/api/cart/" + userId);
        let userData: any = {
          ...userState,
          userCartId: userCart.data.data.id,
        };
        setUserState(userData);
      } catch (error: any) {
        console.log(error.response.data.Message);
        if (error.response.data.Message === "Cart not found") {
          console.log(error.response.data.Message);
        } else {
          throw error;
        }
      }
    };
    getCart();
  }, []);
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
      <Background imageKey={"i6"}>
        {/* search box */}
        <View style={[styles.horizWrapper, styles.searchBoxWrapper]}>
          <Text style={styles.title}>Shop</Text>
          <View style={{ backgroundColor: "transparent" }}>
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
      </Background>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "transparent",
  },
  searchInput: {
    height: 40,
    width: "85%",
    backgroundColor: COLORS.inputBackgroundColor,
    borderColor: COLORS.inputBackgroundColor,
    elevation: 2,
  },
});

import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../../assets";
import CustomInput from "../../../components/Input";
import { Text, View } from "../../../components/Themed";
import { useQuery } from "@tanstack/react-query";
import Background from "../../../components/BackGround";
import CategoriesSection from "../../../components/Home/CategoriesSection";
import NewProductSection from "../../../components/Home/NewProductsSection";
import OtherProducts from "../../../components/Home/OtherProducts";
import TopProductsSection from "../../../components/Home/TopProductsSection";
import instance from "../../context/axiosConfig";
import {
  getCategories,
  getNewProduct,
  getProducts,
  getTopProducts,
} from "../../context/productsApi";
import {
  useAddressChange,
  useCategoriesStore,
  useColorsStore,
  useOrderItems,
  useSizeStore,
  useUserIDStore,
  useUserStore,
} from "../../store/store";

export default function HomepageScreen() {
  const { userId } = useUserIDStore();
  const [searchValue, setSearchValue] = useState<string>("");
  const { userState, setUserState } = useUserStore();
  const { categories, setCategories } = useCategoriesStore();
  const { sizes, setSies } = useSizeStore();
  const { colors, setColors } = useColorsStore();

  useEffect(() => {
    const initCall = async () => {
      try {
        const userCart = await instance.get("/api/cart/" + userId);

        let callCategories = await instance.get("/api/category");
        let callColors = await instance.get("/api/color");
        let callSizes = await instance.get("/api/size");
        let userData: any = {
          ...userState,
          userCartId: userCart.data.data.id,
        };
        // console.log("categories", categories.data.data);
        // console.log("colors", colors.data.data);
        // console.log("sizes", sizes.data.data);
        setUserState(userData);
        if (categories.length < 2) {
          setCategories(callCategories.data.data);
        }
        if (colors.length < 1) {
          setColors(callColors.data.data);
        }
        if (sizes.length < 2) {
          setSies(callSizes.data.data);
        }
      } catch (error: any) {
        console.log(error.response.data.Message);
        if (error.response.data.Message === "Cart not found") {
          console.log(error.response.data.Message);
        } else {
          throw error;
        }
      }
    };
    initCall();
  }, []);

  const handleSearch = () => {
    router.push({
      pathname: "/(tabs)/(home)/products",
      params: { paramSearch: searchValue },
    });
  };

  const productsQuery = useQuery({
    queryKey: ["recommendProducts"],
    queryFn: () => getProducts(6),
  });

  const newProductsQuery = useQuery({
    queryKey: ["newProducts"],
    queryFn: () => getNewProduct(6),
  });

  const topProductsQuery = useQuery({
    queryKey: ["topProducts"],
    queryFn: () => getTopProducts(5),
  });

  const getRandomItems = useCallback((items: any[], count: number): any[] => {
    const shuffled = items.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Background imageKey={"i6"}>
        {/* search box */}
        <View style={[styles.horizWrapper, styles.searchBoxWrapper]}>
          <Text style={styles.title}>Shop</Text>
          <View style={{ backgroundColor: "transparent" }}>
            <CustomInput
              placeholder="Tìm kiếm..."
              onChangeText={(text: any) => setSearchValue(text)}
              value={searchValue}
              style={styles.searchInput}
              elementAfter={
                <Pressable onPress={handleSearch}>
                  <FontAwesome5
                    name="search"
                    size={22}
                    color={COLORS.primary}
                  />
                </Pressable>
              }
            />
          </View>
        </View>
        {/* main */}
        <ScrollView style={styles.container}>
          {/* categories */}
          <CategoriesSection categories={categories} />
          {/* top product */}
          {topProductsQuery.isLoading ? <ActivityIndicator /> : null}
          {topProductsQuery.isSuccess ? (
            <TopProductsSection topProducts={topProductsQuery.data} />
          ) : null}

          {/* new items */}
          {newProductsQuery.isLoading ? <ActivityIndicator /> : null}
          {newProductsQuery.isSuccess ? (
            <NewProductSection newProduct={newProductsQuery.data} />
          ) : null}

          {/* recommendations */}
          <Text style={styles.title}>Đề Xuất Cho Bạn</Text>
          {productsQuery.isLoading ? <ActivityIndicator /> : null}
          {productsQuery.isSuccess ? (
            <OtherProducts data={productsQuery.data.items} />
          ) : null}
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

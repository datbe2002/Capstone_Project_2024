import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../../assets";
import Background from "../../../components/BackGround";
import CategoriesSection from "../../../components/Home/CategoriesSection";
import NewProductSection from "../../../components/Home/NewProductsSection";
import OtherProducts from "../../../components/Home/OtherProducts";
import TopProductsSection from "../../../components/Home/TopProductsSection";
import CustomInput from "../../../components/Input";
import SpaceBet from "../../../components/SpaceBet";
import { Text, View } from "../../../components/Themed";
import instance from "../../context/axiosConfig";
import {
  getCategories,
  getNewProduct,
  getProducts,
  getTopProducts,
} from "../../context/productsApi";
import {
  useAIURL,
  useCategoriesStore,
  useColorsStore,
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
  const { setUrlAI, urlAI } = useAIURL();

  useEffect(() => {
    const initCall = async () => {
      const callApiAI = await axios.get(
        "https://662517f304457d4aaf9dd3b9.mockapi.io/api/v1/url"
      );
      setUrlAI(callApiAI.data[0].url);
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
    queryFn: () => getProducts(10),
  });

  const newProductsQuery = useQuery({
    queryKey: ["newProducts"],
    queryFn: () => getNewProduct(6),
  });

  const topProductsQuery = useQuery({
    queryKey: ["topProducts"],
    queryFn: () => getTopProducts(5),
  });

  const getCategoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // const getRandomItems = useCallback((items: any[], count: number): any[] => {
  //   const shuffled = items.sort(() => 0.5 - Math.random());
  //   return shuffled.slice(0, count);
  // }, []);
  let content;

  if (
    topProductsQuery.isLoading ||
    newProductsQuery.isLoading ||
    productsQuery.isLoading ||
    getCategoriesQuery.isLoading
  ) {
    // If any of the queries are still loading, show an activity indicator
    content = (
      <View
        style={{
          flex: 1,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={50} color={COLORS.primary} />
      </View>
    );
  } else {
    // Once all the data is loaded, render your components
    content = (
      <View>
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
        {/* main content */}
        <ScrollView>
          <CategoriesSection categories={getCategoriesQuery.data.data} />
          <TopProductsSection topProducts={topProductsQuery.data} />
          <NewProductSection newProduct={newProductsQuery.data} />
          <Text style={[styles.title, { paddingHorizontal: 10 }]}>
            Đề xuất cho bạn
          </Text>
          <OtherProducts
            data={productsQuery.data.items}
            userState={userState}
          />
          <SpaceBet height={50} />
        </ScrollView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Background imageKey={"i6"}>
        <View style={styles.container}>{content}</View>
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

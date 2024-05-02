import {
  Dimensions,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { Skeleton } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
const { height, width } = Dimensions.get("window");

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

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    topProductsQuery.refetch();
    newProductsQuery.refetch();
    productsQuery.refetch();
    getCategoriesQuery.refetch();
  }, []);
  const skeletonDataCate = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  const skeletonDataTopSelling = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];

  let content;
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
                <FontAwesome5 name="search" size={22} color={COLORS.primary} />
              </Pressable>
            }
          />
        </View>
      </View>
      {/* main content */}
      {topProductsQuery.isSuccess &&
        newProductsQuery.isSuccess &&
        productsQuery.isSuccess &&
        getCategoriesQuery.isSuccess ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={
                topProductsQuery.isLoading &&
                newProductsQuery.isLoading &&
                productsQuery.isLoading &&
                getCategoriesQuery.isLoading
              }
              onRefresh={onRefresh}
            />
          }
        >
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
      ) : (
        <View style={{ padding: 10 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="wave"
              width={130}
              height={40}
            />
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="wave"
              width={130}
              height={30}
            />
          </View>
          <View
            style={{
              width,
              display: "flex",
              flexDirection: "row",
              gap: 10,
              marginTop: 10,
            }}
          >
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="wave"
              width={width / 2.15}
              height={width / 2.5}
              style={{ borderRadius: 10 }}
            />
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="wave"
              width={width / 2.15}
              height={width / 2.5}
              style={{ borderRadius: 10 }}
            />
          </View>
          <View
            style={{
              width,
              display: "flex",
              flexDirection: "row",
              gap: 10,
              marginTop: 10,
            }}
          >
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="wave"
              width={width / 2.15}
              height={width / 2.5}
              style={{ borderRadius: 10 }}
            />
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="wave"
              width={width / 2.15}
              height={width / 2.5}
              style={{ borderRadius: 10 }}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="wave"
              width={180}
              height={40}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "center",
              gap: 5,
              alignItems: "center",
            }}
          >
            {skeletonDataTopSelling.map((i) => (
              <View key={i.id}>
                <Skeleton
                  circle
                  width={width / 5.5}
                  height={width / 5.5}
                  LinearGradientComponent={LinearGradient}
                  animation="wave"
                />
              </View>
            ))}
          </View>
          <View style={{ marginTop: 20 }}>
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="wave"
              width={width / 1.05}
              height={100}
              style={{ borderRadius: 10 }}
            />
          </View>
        </View>
      )}
    </View>
  );

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

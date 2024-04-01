import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

// replace with the actual path
import OtherProducts from "../../../components/Home/OtherProducts";
import { useQuery } from "@tanstack/react-query";
import { getProductsFiltered } from "../../context/productsApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";
import { FilterParams } from "../../../constants/Type";
import { useFocusEffect } from "@react-navigation/native";
import CustomInput from "../../../components/Input";
import { COLORS, SIZES } from "../../../assets";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const ProductsScreen = () => {
  const [searchValue, setSearchValue] = useState<string>();
  const [filterParams, setFilterParams] = useState<FilterParams>({
    name: null,
    category: null,
    subCategory: null,
    color: null,
    size: null,
    minPrice: null,
    maxPrice: null,
  });

  useEffect(() => {
    setFilterParams((prevParams) => ({ ...prevParams, name: searchValue }));
  }, [searchValue]);

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductsFiltered(filterParams),
    // refetchOnWindowFocus: true,
  });

  useFocusEffect(
    React.useCallback(() => {
      if (productsQuery.status === "error" || productsQuery.isStale) {
        productsQuery.refetch();
      }
      console.log("data ======= ", productsQuery.data);
    }, [productsQuery])
  );

  const handleSearch = (text: string) => {
    setSearchValue(text);
  };

  return (
    <SafeAreaView>
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
      <ScrollView>
        {productsQuery.isSuccess ? (
          <OtherProducts data={productsQuery.data} />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductsScreen;
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

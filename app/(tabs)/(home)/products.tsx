import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";

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
import { ScrollView, TextInput } from "react-native-gesture-handler";

import {
  useCategoriesStore,
  useColorsStore,
  useSizeStore,
  useUserStore,
} from "../../store/store";
import { Dropdown } from "react-native-element-dropdown";
import { useLocalSearchParams } from "expo-router";
import Background from "../../../components/BackGround";
import { BottomModal } from "../../../components/BottomModal";
const { height, width } = Dimensions.get("window");

const ProductsScreen = () => {
  const { paramSearch, cateParam } = useLocalSearchParams();
  const [searchValue, setSearchValue] = useState<any>(paramSearch || null);
  const [isFocusCate, setIsFocusCate] = useState(false);
  const [isFocusSubCate, setIsFocusSubCate] = useState(false);
  const [isFocusSize, setIsFocusSize] = useState(false);
  const { categories, setCategories } = useCategoriesStore();
  const { sizes, setSies } = useSizeStore();
  const { colors, setColors } = useColorsStore();
  const { userState } = useUserStore();
  const [inputText, setInputText] = useState("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [tempFilter, setTempFilter] = useState<FilterParams>({
    name: null,
    category: null,
    subCategory: null,
    color: null,
    size: null,
    minPrice: null,
    maxPrice: null,
  });

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
    if (searchValue?.length != 0) {
      setFilterParams((prevParams) => ({ ...prevParams, name: searchValue }));
    }
    if (paramSearch) {
      setFilterParams((prevParams) => ({ ...prevParams, name: paramSearch }));
    }
    if (cateParam) {
      // console.log("cateParam", cateParam);

      setFilterParams((prevParams) => ({ ...prevParams, category: cateParam }));
    }
  }, [searchValue, paramSearch, cateParam]);

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
    }, [productsQuery])
  );

  const handleSearch = () => {
    if (inputText.length == 0) {
      setSearchValue(null);
    }
    setSearchValue(inputText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background imageKey="i6">
        <View style={[styles.horizWrapper, styles.searchBoxWrapper]}>
          <Text style={styles.title}>Shop</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "transparent",
              gap: 10,
            }}
          >
            <CustomInput
              placeholder="Tìm kiếm..."
              onChangeText={(text) => setInputText(text)}
              value={inputText}
              style={styles.searchInput}
              onSubmitEditing={handleSearch}
              elementAfter={
                searchValue ? (
                  <FontAwesome5
                    name="times-circle"
                    size={22}
                    color={COLORS.primary}
                    onPress={() => {
                      setSearchValue(null), setInputText("");
                    }}
                  />
                ) : (
                  <FontAwesome5
                    name="search"
                    size={22}
                    color={COLORS.primary}
                    onPress={handleSearch}
                  />
                )
              }
            />
            <Pressable onPress={() => setModalVisible(true)}>
              <FontAwesome5 name="filter" size={22} color={COLORS.primary} />
            </Pressable>
          </View>
        </View>

        <ScrollView>
          {productsQuery.isSuccess ? (
            <OtherProducts data={productsQuery.data} userState={userState} />
          ) : null}
        </ScrollView>

        <BottomModal
          isOpen={modalVisible}
          setIsOpen={setModalVisible}
          snapHeight={"65%"}
        >
          <ScrollView style={styles.bottomSheet}>
            <View style={{ paddingBottom: 10 }}>
              <Text style={styles.placeholderStyle}>Danh mục</Text>
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocusCate && { borderColor: COLORS.black },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={styles.itemTextStyle}
                data={categories}
                maxHeight={200}
                labelField="name"
                valueField="id"
                placeholder={!isFocusCate ? "Chọn danh mục" : "..."}
                value={tempFilter.category ? tempFilter.category.id : -1}
                onFocus={() => setIsFocusCate(true)}
                onBlur={() => setIsFocusCate(false)}
                onChange={(item) => {
                  setTempFilter((prev) => ({
                    ...prev,
                    category: item,
                  }));
                  setIsFocusCate(false);
                }}
              />
              {tempFilter.category &&
                tempFilter.category.subCategories?.length > 0 && (
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocusSubCate && { borderColor: COLORS.black },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    itemTextStyle={styles.itemTextStyle}
                    data={tempFilter.category.subCategories}
                    maxHeight={200}
                    labelField="name"
                    valueField="id"
                    placeholder={!isFocusSubCate ? "Chọn danh mục phụ" : "..."}
                    value={tempFilter.subCategory?.id}
                    onFocus={() => setIsFocusSubCate(true)}
                    onBlur={() => setIsFocusSubCate(false)}
                    onChange={(item) => {
                      setTempFilter((prev) => ({ ...prev, subCategory: item }));
                      setIsFocusSubCate(false);
                    }}
                  />
                )}
              <Text style={styles.placeholderStyle}>Màu</Text>
              <ScrollView horizontal={true}>
                {colors.map((item: any) => (
                  <Pressable
                    key={item.id}
                    style={[
                      {
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        elevation: 2,
                        margin: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      tempFilter.color?.id === item.id
                        ? { backgroundColor: COLORS.blue1 }
                        : { backgroundColor: COLORS.gray1 },
                    ]}
                    onPress={() =>
                      setTempFilter((prevFilter) => ({
                        ...prevFilter,
                        color: item,
                      }))
                    }
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: item.colorCode,
                      }}
                    ></View>
                  </Pressable>
                ))}
              </ScrollView>
              <Text style={[styles.placeholderStyle]}>Kích cỡ</Text>
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocusSize && { borderColor: COLORS.black },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={styles.itemTextStyle}
                data={sizes}
                maxHeight={200}
                labelField="value"
                valueField="id"
                placeholder={!isFocusSize ? "Chọn size" : "..."}
                value={tempFilter.size ? tempFilter.size?.id : -1}
                onFocus={() => setIsFocusSize(true)}
                onBlur={() => setIsFocusSize(false)}
                onChange={(item) => {
                  setTempFilter((prev) => ({
                    ...prev,
                    size: item,
                  }));
                  setIsFocusSize(false);
                }}
              />
              <Text style={[styles.placeholderStyle]}>Giá</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TextInput
                  style={[
                    styles.dropdown,
                    styles.itemTextStyle,
                    { width: 140, textAlign: "right", paddingHorizontal: 20 },
                  ]}
                  keyboardType="numeric"
                  value={tempFilter.minPrice?.toString() || ""}
                  onChangeText={(value: any) => {
                    setTempFilter((prev) => ({
                      ...prev,
                      minPrice: value,
                    }));
                  }}
                  placeholder="Thấp"
                />
                <Text
                  style={{
                    height: "100%",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  --
                </Text>

                <TextInput
                  style={[
                    styles.dropdown,
                    styles.itemTextStyle,
                    { width: 140, textAlign: "right", paddingHorizontal: 20 },
                  ]}
                  keyboardType="numeric"
                  value={tempFilter.maxPrice?.toString() || ""}
                  onChangeText={(value: any) => {
                    setTempFilter((prev) => ({
                      ...prev,
                      maxPrice: value,
                    }));
                  }}
                  placeholder="Cao"
                />
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              width: width,
              gap: 10,
              height: 100,
              paddingVertical: 15,
              borderTopWidth: 1,
              borderTopColor: COLORS.gray,
            }}
          >
            <Text
              style={[
                styles.button,
                // styles.bottomSheetBtn,
                {
                  backgroundColor: COLORS.primary,
                  color: COLORS.white,
                  width: 180,
                },
                // { opacity: mySelectedItem ? 1 : 0.7 },
              ]}
              onPress={() => {
                // console.log("temp ===", tempFilter);
                setFilterParams((prevState) => ({
                  ...prevState,
                  category: tempFilter.category?.name || null,
                  subCategory:
                    tempFilter.category?.id !== -1
                      ? tempFilter.subCategory?.name || null
                      : null,
                  color: tempFilter.color?.name || null,
                  size: tempFilter.size?.name || null,
                  minPrice: tempFilter.minPrice,
                  maxPrice: tempFilter.maxPrice,
                }));
                // setFilterParams(tempFilter);
                setModalVisible(false);
              }}
            >
              Áp dụng
            </Text>
            <Text
              style={[
                styles.button,
                // styles.bottomSheetBtn,
                {
                  backgroundColor: COLORS.black,
                  color: COLORS.white,
                  width: 180,
                },
                // { opacity: mySelectedItem ? 1 : 0.7 },
              ]}
              onPress={() => {
                // console.log("temp ===", tempFilter);
                setFilterParams({
                  name: null,
                  category: null,
                  subCategory: null,
                  color: null,
                  size: null,
                  minPrice: null,
                  maxPrice: null,
                });
                // setFilterParams(tempFilter);
                setModalVisible(false);
              }}
            >
              Đặt lại
            </Text>
          </View>
        </BottomModal>
      </Background>
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
    width: "75%",
    backgroundColor: COLORS.inputBackgroundColor,
    borderColor: COLORS.inputBackgroundColor,
    elevation: 2,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: "white",
    width: width,
    paddingHorizontal: 20,
  },
  filterInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  dropdown: {
    height: 60,
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 8,
    marginBottom: 10,
    marginTop: 5,
    backgroundColor: COLORS.inputBackgroundColor,
    borderColor: COLORS.gray,
  },
  placeholderStyle: {
    fontSize: 18,
    fontFamily: "mon-b",
    color: "#636363",
  },
  selectedTextStyle: {
    fontSize: 18,
    fontFamily: "mon-b",
  },
  itemTextStyle: {
    fontFamily: "mon-sb",
    color: "#636363",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 18,
    fontFamily: "mon-b",
  },
  button: {
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "mon-sb",
    fontSize: SIZES.medium,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 10,
  },
  bottomSheetBtn: {
    position: "absolute",
    bottom: 28,
  },
});

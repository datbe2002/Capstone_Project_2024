import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SHADOWS, SIZES } from "../../../../assets";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Carousel from "../../../../components/Carousel";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addToCart, getProductById } from "../../../context/productsApi";
import { useUserStore } from "../../../store/store";
import { CartData } from "../../../../constants/Type";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import FavoriteLogic from "../../../../components/Home/FavoriteLogic";
import VariantSection from "../../../../components/Product/VariantSelector";
import ProductCardShort from "../../../../components/Product/ProductCardShort";
import QuantitySelector from "../../../../components/Product/QuantitySelector";
import CustomAlert from "../../../../components/Arlert";
const { height, width } = Dimensions.get("window");

const ProductDetail = () => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const route = useRouter();
  const { id } = useLocalSearchParams();
  const { userState } = useUserStore();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [alert, setAlert] = useState<any>(null);

  const productQuery = useQuery({
    queryKey: ["product"],
    queryFn: () => getProductById(id),
  });

  const mutation = useMutation({
    mutationFn: (data: CartData) => addToCart(data),
    onSuccess: () => {
      setAlert({ title: "Xong", msg: "Đã thêm vào giỏ hàng của bạn!" });
    },
    onError: (error) => {
      console.log(error)
      setAlert({ title: "Lỗi", msg: "Thêm thất bại! Vui lòng thử lại sau!" });
    },
  });

  const [mySelectedItem, setMySelectedItem] = useState<any>();
  const [quantity, setQuantity] = useState(1);

  const openBottomSheet = (item: any) => {
    setMySelectedItem(item);
    bottomSheetRef.current?.expand();
  };
  const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])
  const handleAddToCart = () => {
    if (userState) {
      if (mySelectedItem) {
        mutation.mutate({
          userId: userState.id,
          productId: id,
          cartId: userState.userCartId,
          color: mySelectedItem.color.colorCode,
          size: mySelectedItem.size.value,
          price: mySelectedItem.price,
          quantity: quantity,
        });
      }
    }
  };

  const _renderItem = (item: any) => {
    return (
      <Image
        style={styles.img}
        source={
          item.imageUrl
            ? { uri: item.imageUrl }
            : require("../../../../assets/images/default.png")
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ==========alert=========== */}
      <CustomAlert
        title={alert?.title}
        message={alert?.msg}
        show={alert !== null}
        onDismiss={() => setAlert(null)}
      />
      {/* ============ */}
      <View style={styles.heading}>
        <Ionicons
          name="chevron-back"
          size={32}
          color={COLORS.primary}
          onPress={() => {
            route.canGoBack()
              ? route.back()
              : route.push("/(tabs)/(home)/homepage");
          }}
        />
      </View>
      {productQuery.isSuccess ? (
        <ScrollView>
          <View style={styles.main}>
            <View style={styles.imgWrapper}>
              <Carousel
                items={productQuery.data.data.images}
                renderItem={_renderItem}
                screenWidth={width}
              />
            </View>

            <View style={[styles.horizWrapper, { paddingHorizontal: 20 }]}>
              <Text style={styles.itemPrice}>
                {productQuery.data.data.productVariants[0].price} đ
              </Text>
              <View style={styles.horizWrapper}>
                {productQuery.data.data.canTryOn && (
                  <View
                    style={{
                      backgroundColor: COLORS.primary,
                      borderRadius: SIZES.xxLarge / 2,
                      padding: 3,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="tshirt-crew"
                      size={SIZES.large}
                      color={COLORS.white}
                      onPress={() => route.push("/(tabs)/(tryonl)/wardrove")}
                    />
                  </View>
                )}
                <MaterialCommunityIcons
                  name="share-circle"
                  size={SIZES.xxLarge}
                  color={COLORS.primary}
                />
              </View>
            </View>

            <View>
              <Text style={[styles.title, { paddingHorizontal: 10 }]}>
                {productQuery.data.data.name}
              </Text>
            </View>

            {/* variant */}
            <VariantSection
              data={productQuery.data.data.productVariants}
              onPress={(item) => {
                openBottomSheet(item);
              }}
            />

            <View style={styles.detailContainer}>
              <Text style={styles.secondaryTitle}>Chi tiết sản phẩm</Text>
              <View style={styles.detailBox}>
                <Text style={styles.itemDes}>
                  Mô tả: {productQuery.data.data.description}
                </Text>
                <Text style={styles.itemDes}>
                  Thương hiệu: {productQuery.data.data.brand.name}
                </Text>
                {productQuery.data.data.properties.map(
                  (item: any, index: any) => (
                    <Text key={index}>
                      {item.name}: {item.value}
                    </Text>
                  )
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator />
      )}

      {/* ============================ */}
      <View style={[styles.bottom, SHADOWS.medium]}>
        {/* <AntDesign name={"heart"} size={30} color={"red"} onPress={() => console.log('favourite')} /> */}
        {/* ====================================== */}
        {productQuery.isSuccess && (
          <FavoriteLogic
            setIsFavourite={setIsFavourite}
            isFavourite={isFavourite}
            item={productQuery.data.data}
          />
        )}
        {/* ====================================== */}

        <Text
          style={[
            styles.button,
            { backgroundColor: COLORS.black, color: COLORS.white },
          ]}
          onPress={() => {
            openBottomSheet(null);
          }}
        >
          Thêm vào giỏ hàng
        </Text>
        <Text
          style={[
            styles.button,
            { backgroundColor: COLORS.primary, color: COLORS.white },
          ]}
          onPress={() => {
            setAlert({
              title: "Lỗi",
              msg: "Thêm thất bại! Vui lòng thử lại sau!",
            });
          }}
        >
          Mua ngay
        </Text>
      </View>
      {/* bottom sheet */}
      {productQuery.isSuccess && (
        <BottomSheet
          ref={bottomSheetRef}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={true}
          index={-1}
          snapPoints={["55%"]}
        >
          <View style={styles.bottomSheet}>
            <ProductCardShort
              data={productQuery.data.data}
              variant={mySelectedItem}
            />

            <VariantSection
              data={productQuery.data.data.productVariants}
              onPress={(item) => {
                setMySelectedItem(item);
              }}
              selectedItem={mySelectedItem}
            />
            <QuantitySelector
              style={{ position: "absolute", bottom: 70 }}
              initialQuantity={quantity}
              onQuantityChange={(newQuantity) => setQuantity(newQuantity)}
              enabled={mySelectedItem}
            />
            <Text
              style={[
                styles.button,
                styles.bottomSheetBtn,
                { opacity: mySelectedItem ? 1 : 0.7 },
              ]}
              onPress={() => {
                if (mySelectedItem) {
                  handleAddToCart();
                }
              }}
            >
              Thêm vào giỏ hàng
            </Text>
          </View>
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    position: "relative",
  },
  heading: {
    height: 50,
    width: width,
    paddingHorizontal: 15,
    justifyContent: "center",
    position: "absolute",
    top: 25,
    zIndex: 1,
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
  main: {},
  imgWrapper: {
    width: width,
    minHeight: width,
  },
  img: {
    width: width,
    height: width * 1.05,
    objectFit: "cover",
  },
  itemPrice: {
    padding: 5,
    height: 60,
    textAlign: "left",
    textAlignVertical: "center",
    fontFamily: "mon-sb",
    fontSize: SIZES.large,
  },
  itemDes: {
    width: "100%",
    textAlign: "left",
    fontFamily: "mon",
    textAlignVertical: "top",
  },
  bottom: {
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    display: "flex",
    height: 90,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 15,
    paddingBottom: 35,
    alignItems: "center",
  },
  button: {
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "mon-sb",
    fontSize: SIZES.medium,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },

  detailContainer: {
    minHeight: 100,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginTop: 10,
    elevation: 1,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: COLORS.white,
  },
  detailBox: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  bottomSheet: {
    height: height * 0.45,
    position: "relative",
  },
  bottomSheetBtn: {
    backgroundColor: COLORS.black,
    color: COLORS.white,
    alignSelf: "center",
    width: "90%",
    position: "absolute",
    bottom: 5,
  },
});

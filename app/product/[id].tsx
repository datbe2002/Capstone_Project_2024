import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomAlert from "../../components/Arlert";
import Background from "../../components/BackGround";
import Carousel from "../../components/Carousel";
import FavoriteLogic from "../../components/Home/FavoriteLogic";
import ProductCardShort from "../../components/Product/ProductCardShort";
import QuantitySelector from "../../components/Product/QuantitySelector";
import VariantSection from "../../components/Product/VariantSelector";
import { CartData, CartItem } from "../../constants/Type";
import instance from "../context/axiosConfig";
import { addToCart, getProductById } from "../context/productsApi";
import {
  useOrderItems,
  useUserIDStore,
  useUserStore,
  useWardove,
} from "../store/store";
import FeedbackSection from "../../components/Home/FeedbackSection";
import { ScrollView } from "react-native-virtualized-view";
import { COLORS, SHADOWS, SIZES } from "../../assets";
import { BottomModal } from "../../components/BottomModal";
const { height, width } = Dimensions.get("window");

const ProductDetail = () => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const route = useRouter();
  const { id } = useLocalSearchParams();
  const { userState, setUserState } = useUserStore();
  const { wardroveItems, setWardroveItems } = useWardove();
  const { userId } = useUserIDStore();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [alert, setAlert] = useState<any>(null);
  const { orderItems, setOrderItems } = useOrderItems();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const productQuery = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: id !== null,
  });

  const mutation = useMutation({
    mutationFn: (data: CartData) => addToCart(data),
    onSuccess: () => {
      setAlert({ title: "Xong", msg: "Đã thêm vào giỏ hàng của bạn!" });
    },
    onError: (error) => {
      setAlert({ title: "Lỗi", msg: "Thêm thất bại! Vui lòng thử lại sau!" });
    },
  });

  const [mySelectedItem, setMySelectedItem] = useState<any>();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (userState) {
      // console.log(userState.userCartId, userState.id);
      if (mySelectedItem) {
        mutation.mutate({
          userId: userState.id,
          productId: id,
          cartId: userState.userCartId,
          color: mySelectedItem.color.colorCode,
          size: mySelectedItem.size.value,
          price: mySelectedItem.price,
          quantity: quantity,
          sku: mySelectedItem.sku,
        });
      }
    }
  };

  const handleAddToWardrove = () => {
    // Check if the item already exists in the wardroveItems
    if (
      !wardroveItems.some((item: any) => item.id === productQuery.data.data.id)
    ) {
      setWardroveItems([productQuery.data.data]);
      setAlert({ title: "Xong", msg: "Đã thêm vào tủ đồ của bạn!" });
    } else {
      setAlert({
        title: "Thông báo",
        msg: "Sản phẩm này đã có trong tủ đồ của bạn!",
      });
    }
  };

  const _renderItem = (item: any) => {
    return (
      <Image
        style={styles.img}
        source={
          item.imageUrl
            ? { uri: item.imageUrl }
            : require("../../assets/images/default.png")
        }
      />
    );
  };

  useEffect(() => {
    const getCart = async () => {
      try {
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
  }, [mutation.isSuccess]);
  return (
    <SafeAreaView style={styles.container}>
      <Background imageKey={"i2"}>
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
              <View style={[styles.imgWrapper]}>
                <Carousel
                  items={productQuery.data.data.images}
                  renderItem={_renderItem}
                  screenWidth={width}
                />
              </View>

              <View style={[styles.horizWrapper, { paddingHorizontal: 20 }]}>
                <Text style={styles.itemPrice}>
                  {productQuery.data.data.productVariants[0]?.price
                    .toLocaleString("en-US", { minimumFractionDigits: 0 })
                    .replace(/,/g, " ")}
                  đ
                </Text>
                <View style={[styles.horizWrapper, { paddingHorizontal: 10 }]}>
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
                        size={26}
                        color={COLORS.white}
                        onPress={() => handleAddToWardrove()}
                      />
                    </View>
                  )}
                  {/* <MaterialCommunityIcons
                    name="share-circle"
                    size={SIZES.xxLarge}
                    color={COLORS.primary}
                  /> */}
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
                  setMySelectedItem(item);
                  setModalVisible(true);
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
                      <Text key={index} style={styles.itemDes}>
                        {item.name}: {item.value}
                      </Text>
                    )
                  )}
                </View>
              </View>
              <FeedbackSection productId={productQuery.data.data.id} />
            </View>
          </ScrollView>
        ) : (
          <ActivityIndicator color={COLORS.primary} size={50} />
        )}
        {productQuery.isSuccess && (
          <View style={[styles.bottom, SHADOWS.medium]}>
            <FavoriteLogic
              setIsFavourite={setIsFavourite}
              isFavourite={isFavourite}
              item={productQuery.data.data}
            />

            <Text
              style={[
                styles.button,
                { backgroundColor: COLORS.black, color: COLORS.white },
              ]}
              onPress={() => {
                setModalVisible(true);
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
                const obj: CartItem = {
                  cartId: userState?.userCartId,
                  color:
                    productQuery.data.data.productVariants[0].color.colorCode,
                  price: productQuery.data.data.productVariants[0].price,
                  product: productQuery.data.data,
                  productId: productQuery.data.data.id,
                  quantity: 1,
                  size: productQuery.data.data.productVariants[0].size.value,
                  sku: productQuery.data.data.productVariants[0].sku,
                };
                setOrderItems({
                  items: [obj],
                  total: obj.price,
                  totalQuantityProd: 1,
                });
                router.push("/payment");
              }}
            >
              Mua ngay
            </Text>
          </View>
        )}
        {/* bottom sheet */}
        {productQuery.isSuccess && (
          <BottomModal
            isOpen={modalVisible}
            setIsOpen={setModalVisible}
            snapHeight={"65%"}
          >
            <View style={styles.bottomSheet}>
              <ProductCardShort
                data={productQuery.data.data}
                variant={mySelectedItem}
              />
              <ScrollView style={{ marginBottom: 120 }}>
                <View style={{ minHeight: 100 }}>
                  <VariantSection
                    data={productQuery.data.data.productVariants}
                    onPress={(item) => {
                      setMySelectedItem(item);
                    }}
                    selectedItem={mySelectedItem}
                  />
                </View>
              </ScrollView>
              <QuantitySelector
                style={{ position: "absolute", bottom: 65 }}
                initialQuantity={quantity}
                onQuantityChange={(newQuantity) => setQuantity(newQuantity)}
                enabled={mySelectedItem}
              />
              <Text
                style={[
                  styles.button,
                  styles.bottomSheetBtn,
                  {
                    backgroundColor: COLORS.black,
                    color: COLORS.white,
                    left: 20,
                    width: "50%",
                  },
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
              <Text
                style={[
                  styles.button,
                  styles.bottomSheetBtn,
                  {
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                    right: 20,
                    width: "35%",
                  },
                  { opacity: mySelectedItem ? 1 : 0.7 },
                ]}
                onPress={() => {
                  if (mySelectedItem) {
                    const obj: CartItem = {
                      // userId: userState?.id,
                      cartId: userState?.userCartId,
                      color: mySelectedItem.color.colorCode,
                      price: mySelectedItem.price,
                      product: productQuery.data.data,
                      productId: productQuery.data.data.id,
                      quantity: quantity,
                      size: mySelectedItem.size.value,
                      sku: mySelectedItem.sku,
                    };

                    setOrderItems({
                      items: [obj],
                      total: obj.price * obj.quantity,
                      totalQuantityProd: obj.quantity,
                    });
                    router.push("/payment");
                  }
                }}
              >
                Mua ngay
              </Text>
            </View>
          </BottomModal>
        )}
      </Background>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    position: "relative",
  },
  heading: {
    height: 50,
    width: width,
    paddingHorizontal: 15,
    justifyContent: "center",
    position: "absolute",
    top: 8,
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
    fontSize: 20,
    fontFamily: "mon-sb",
  },
  main: {
    width: width,
    paddingBottom: 90,
  },
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
    fontFamily: "mon-sb",
    fontSize: 16,
    color: COLORS.darkGray,
    textAlignVertical: "top",
  },
  bottom: {
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    display: "flex",
    height: 90,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: width,
    borderTopColor: COLORS.gray,
    borderTopWidth: 1,
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
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
  },
  detailBox: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  bottomSheet: {
    height: height * 0.52,
    position: "relative",
  },
  bottomSheetBtn: {
    position: "absolute",
    bottom: 0,
  },
});

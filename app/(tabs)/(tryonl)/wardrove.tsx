import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
  Button,
  Text,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SHADOWS, SIZES } from "../../../assets";
import Background from "../../../components/BackGround";
import { useOrderItems, useUserStore, useWardove } from "../../store/store";
import { CartItem, Product } from "../../../constants/Type";
import { Fontisto, Ionicons, Octicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getModels, tryOn } from "../../context/wardroveApi";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import ReactNativeBlobUtil from "react-native-blob-util";
import Share from "react-native-share";
import { router } from "expo-router";

const { height, width } = Dimensions.get("window");

const wardrove = () => {
  const modelsQuery = useQuery({
    queryKey: ["models"],
    queryFn: getModels,
  });

  const mutation = useMutation({
    mutationFn: (data: any) => tryOn(data),
    onSuccess: (data) => {
      setImageSrc(data.result);
    },
  });

  const { wardroveItems, setWardroveItems } = useWardove();
  const [selectedModel, setSelectedModel] = React.useState<any>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<Product>();
  const [imageSrc, setImageSrc] = useState<any>(null);
  const { userState, setUserState } = useUserStore();
  const { orderItems, setOrderItems } = useOrderItems();
  const [shareLoading, setShareLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const openBottomSheet = (item: any) => {
    bottomSheetRef.current?.expand();
  };

  const handleRemoveItem = (itemToRemove: Product) => {
    setWardroveItems((prevItems: Product[]) =>
      prevItems.filter((item: Product) => item.id !== itemToRemove.id)
    );
  };

  const wardroveRenderItem = ({ item }: { item: Product }) => (
    <Pressable
      style={styles.itemCard}
      onPress={() => {
        handleChangeImg(item);
      }}
    >
      <View style={[styles.itemImgContainer, SHADOWS.medium]}>
        <Image
          style={styles.itemImg}
          source={
            item.defaultImage
              ? { uri: item.defaultImage }
              : require("../../../assets/images/default.png")
          }
        />
        {/* <Text
          style={[
            {
              backgroundColor: COLORS.white,
              color: COLORS.primary,
              paddingHorizontal: 5,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: COLORS.gray,
              position: "absolute",
              fontSize: SIZES.medium,
              fontFamily: "mon-sb",
              bottom: 5,
              left: 10,
            },
          ]}
        >
          {item.name}
        </Text> */}
        <View style={styles.removeIcon}>
          {/* <Octicons
            name="trash"
            size={22}
            color="red"
            onPress={() => {
              handleRemoveItem(item);
            }}
          /> */}
          <Ionicons
            name="trash-sharp"
            size={22}
            color="red"
            onPress={() => {
              handleRemoveItem(item);
            }}
          />
          {/* <Ionicons
            name="trash-bin-outline"
            size={24}
            color={COLORS.errorColor}
            onPress={() => {
              handleRemoveItem(item);
            }}
          /> */}
        </View>
      </View>
    </Pressable>
  );

  const handleChangeImg = (item: any) => {
    setSelectedProduct(item);

    const obj = {
      link_image: selectedModel.imageUrl,
      link_cloth: item.tryOnImage,
      link_edge: item.edgeImage,
    };
    // console.log(obj);
    mutation.mutate(obj);
  };

  const shareImage = () => {
    setShareLoading(true);
    ReactNativeBlobUtil.fetch(
      "GET",
      // "https://firebasestorage.googleapis.com/v0/b/fsvton-18ce5.appspot.com/o/ProductImg%2F3474-like.png?alt=media&token=bbe20475-35cc-483f-bc9a-03da743821f9"
      imageSrc
    )
      .then((res) => {
        let status = res.info().status;
        if (status === 200) {
          let base64Str = res.base64();
          let options = {
            title: "Share file",
            url: `data:image/jpeg;base64,${base64Str}`,
            message: "Check out this awesome image!",
          };
          Share.open(options)
            .then((r) => {
              console.log(r);
            })
            .catch((e) => {
              e && console.log(e);
            });
        } else {
          // handle other status codes
        }
      })
      // Something went wrong:
      .catch((err) => {
        // error handling
        console.log(err);
      })
      .finally(() => {
        setShareLoading(false);
      });
  };

  useEffect(() => {
    setSelectedModel(modelsQuery?.data?.data[0]);
  }, [modelsQuery.isSuccess]);

  useEffect(() => {
    setImageSrc(selectedModel?.imageUrl);
  }, [selectedModel]);

  return (
    <SafeAreaView style={styles.container}>
      <Background imageKey={"i5"}>
        {shareLoading && (
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(255,255,255,0.6)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"large"} />
          </View>
        )}
        {/* <Button title="Click to Share Image" onPress={() => shareImage()} />   */}
        <View style={styles.wrapper}>
          <View style={styles.tryon}>
            <View style={[styles.imageWrapper, SHADOWS.medium]}>
              {selectedModel && (
                <Image
                  style={[styles.img]}
                  source={
                    imageSrc
                      ? { uri: imageSrc }
                      : require("../../../assets/images/default.png")
                  }
                />
              )}

              {mutation.isPending && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(255,255,255,0.6)",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size={"large"} />
                </View>
              )}
            </View>

            {modelsQuery.isSuccess && (
              <View style={styles.rightContainer}>
                <Pressable
                  style={[styles.modelSelector, SHADOWS.medium]}
                  onPress={openBottomSheet}
                >
                  <Image
                    style={[styles.img, { objectFit: "scale-down" }]}
                    source={
                      selectedModel?.imageUrl
                        ? { uri: selectedModel.imageUrl }
                        : require("../../../assets/images/default.png")
                    }
                  />
                </Pressable>
                <View>
                  {selectedProduct && (
                    <Pressable
                      style={styles.itemCard}
                      onPress={() => {
                        router.push({
                          pathname: "/product/[id]",
                          params: { id: selectedProduct.id },
                        });
                      }}
                    >
                      <View style={[styles.itemImgContainer, SHADOWS.medium]}>
                        <Image
                          style={styles.itemImg}
                          source={
                            selectedProduct.defaultImage
                              ? { uri: selectedProduct.defaultImage }
                              : require("../../../assets/images/default.png")
                          }
                        />
                      </View>
                      <Text style={styles.itemDes} numberOfLines={2}>
                        {selectedProduct.name}
                      </Text>
                      <Text style={styles.itemPrice}>
                        {(selectedProduct.productVariants[0]?.price)
                          .toLocaleString("en-US", { minimumFractionDigits: 0 })
                          .replace(/,/g, " ")}
                        đ
                      </Text>
                    </Pressable>
                  )}
                  {selectedProduct && (
                    <Text
                      style={[
                        {
                          backgroundColor: COLORS.primary,
                          color: COLORS.white,
                          height: 35,
                          width: 100,
                          textAlign: "center",
                          textAlignVertical: "center",
                          fontFamily: "mon-sb",
                          fontSize: SIZES.medium,
                          paddingHorizontal: 5,
                          borderRadius: 10,
                        },
                      ]}
                      onPress={() => {
                        const obj: CartItem = {
                          cartId: userState?.userCartId,
                          color:
                            selectedProduct.productVariants[0].color.colorCode,
                          price: selectedProduct.productVariants[0].price,
                          product: selectedProduct,
                          productId: selectedProduct.id,
                          quantity: 1,
                          size: selectedProduct.productVariants[0].size.value,
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
                  )}
                </View>
              </View>
            )}
          </View>
          {mutation.isSuccess && (
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                paddingHorizontal: 10,
              }}
            >
              <Text
                onPress={() => shareImage()}
                style={[
                  {
                    backgroundColor: COLORS.white,
                    color: COLORS.primary,
                    borderWidth: 1,
                    borderColor: COLORS.gray,
                    height: 35,
                    width: 180,
                    textAlign: "center",
                    textAlignVertical: "center",
                    fontFamily: "mon-sb",
                    fontSize: SIZES.medium,
                    paddingHorizontal: 5,
                    borderRadius: 10,
                  },
                ]}
              >
                Chia sẻ hình ảnh
              </Text>
              {/* <Text
                style={{ textAlign: "center", textAlignVertical: "center" }}
              >
                Hoặc
              </Text> */}
            </View>
          )}
          <View style={styles.products}>
            <FlatList
              data={wardroveItems}
              renderItem={wardroveRenderItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              style={styles.itemsList}
              ListEmptyComponent={
                <View
                  style={{
                    width: width * 0.9,
                    height: 120,

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "mon-sb",
                      fontSize: 15,
                      marginVertical: 20,
                    }}
                  >
                    Tủ đồ rỗng
                  </Text>
                  <Pressable
                    style={{
                      backgroundColor: COLORS.primary,
                      padding: 10,
                      borderRadius: 2,
                    }}
                    onPress={() => router.push("/(tabs)/(home)/homepage")}
                  >
                    <Text
                      style={{
                        fontFamily: "mon-sb",
                        color: COLORS.white,
                        fontSize: 16,
                      }}
                    >
                      Xem các sản phẩm ngay !
                    </Text>
                  </Pressable>
                </View>
              }
            />
          </View>
          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            enablePanDownToClose={true}
            snapPoints={["30%"]}
          >
            <View
              style={{
                width: width,
                height: 160,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  styles.itemDes,
                  { textAlign: "center", textAlignVertical: "center" },
                ]}
              >
                Chọn model
              </Text>
              <BottomSheetScrollView
                style={{ height: 130, width: width - 20 }}
                horizontal={true}
              >
                {modelsQuery.isSuccess &&
                  modelsQuery.data?.data?.map((item: any) => (
                    <Pressable
                      key={item.id.toString()}
                      onPress={() => {
                        setSelectedModel(item);
                        setImageSrc(item.imageUrl);
                        bottomSheetRef.current?.close();
                      }}
                    >
                      <View style={styles.itemCard}>
                        <View style={[styles.itemImgContainer, SHADOWS.medium]}>
                          <Image
                            style={styles.itemImg}
                            source={
                              item.imageUrl
                                ? { uri: item.imageUrl }
                                : require("../../../assets/images/default.png")
                            }
                          />
                        </View>
                      </View>
                    </Pressable>
                  ))}
              </BottomSheetScrollView>
            </View>
          </BottomSheet>
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
    alignItems: "center",
    backgroundColor: "transparent",
  },
  tryon: {
    height: height * 0.6,
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    paddingVertical: 10,
    // gap: 10,
    backgroundColor: COLORS.white,
  },
  imageWrapper: {
    height: "100%",
    width: "65%",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    objectFit: "cover",
  },
  rightContainer: {
    height: "100%",
    width: "25%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  modelSelector: {
    width: "100%",
    height: 100,
    padding: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray1,
  },
  products: {
    height: 150,
    width: width - 20,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: COLORS.inputBackgroundColor,
    marginBottom: 20,
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
    height: 200,
    alignItems: "center",
    gap: 5,
    padding: 5,
    backgroundColor: "transparent",
    position: "relative",
  },
  itemImgContainer: {
    width: width * 0.25,
    height: 120,
    padding: 2,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  itemImg: {
    width: "100%",
    height: "100%",

    borderRadius: 7,
    objectFit: "scale-down",
    borderWidth: 1,
    borderColor: COLORS.blue1,
  },
  removeIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 15,
  },
  itemDes: {
    paddingVertical: 2,
    minHeight: 25,
    width: "100%",
    textAlign: "left",
    fontSize: SIZES.medium,
    textAlignVertical: "top",
    fontFamily: "mon-sb",
    // backgroundColor: "red",
  },
  itemPrice: {
    textAlign: "left",
    fontFamily: "mon-b",
    fontSize: SIZES.medium,
    color: COLORS.primary,
    height: "auto",
    width: "100%",
  },
  buyProd: {
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    padding: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

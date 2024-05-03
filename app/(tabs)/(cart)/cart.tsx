import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../../assets";
import ItemCard from "../../../components/Cart/ItemCard";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { CheckBox } from "react-native-elements";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useOrderItems, useUserStore } from "../../store/store";
import { getCartById, updateCart } from "../../context/productsApi";
import Background from "../../../components/BackGround";
import { CartItem } from "../../../constants/Type";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

import CustomAlert from "../../../components/Arlert";
import EmptyComponentCustom from "../../../components/EmptyComponentCustom";
import { Fontisto } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

interface Props { }

const Cart: React.FC<Props> = ({ }) => {
  const [isAdjust, setIsAdjust] = useState(false);
  const [isSelectAll, setSelectAll] = useState(false);
  const { userState } = useUserStore();
  const [selectedItems, setSelectedItems] = useState<Array<CartItem>>([]);
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalQuantityProd, setTotalQuantityProd] = useState<number>(0);

  const [alert, setAlert] = useState<any>(null);

  const { orderItems, setOrderItems } = useOrderItems();
  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartById(userState?.id),
  });

  const mutation = useMutation({
    mutationFn: (data: any) => updateCart(userState?.userCartId, data),
  });

  useFocusEffect(
    React.useCallback(() => {
      if (cartQuery.status === "error" || cartQuery.isStale) {
        cartQuery.refetch();
      }
    }, [cartQuery])
  );

  const handleDeleteItems = () => {
    const updatedCartItems = cartItems.filter(
      (cartItem) =>
        !selectedItems.some(
          (selectedItem) =>
            selectedItem.productId === cartItem.productId &&
            selectedItem.color === cartItem.color &&
            selectedItem.size === cartItem.size
        )
    );
    setIsAdjust(!isAdjust)

    setSelectedItems([]);
    mutation.mutate({ userId: userState?.id, cartItems: updatedCartItems });
    setTimeout(() => {
      setAlert(null);
    }, 400);
  };

  // edit quantity
  const handleQuantityChange = (updatedItem: CartItem) => {
    // update cart items
    const updatedCartItems = cartItems.map((item) =>
      item.productId === updatedItem.productId &&
        item.color === updatedItem.color &&
        item.size === updatedItem.size
        ? updatedItem
        : item
    );
    setCartItems(updatedCartItems);
    // update selected items
    const updatedSelectedItems = selectedItems.map((item) =>
      item.productId === updatedItem.productId &&
        item.color === updatedItem.color &&
        item.size === updatedItem.size
        ? updatedItem
        : item
    );
    setSelectedItems(updatedSelectedItems);
    // call api
    mutation.mutate({ userId: userState?.id, cartItems: updatedCartItems });
  };

  const handleSelected = (selectedItem: CartItem) => {
    setSelectedItems((prevSelectedItems) => {
      const isAlreadySelected = prevSelectedItems.some(
        (item) =>
          item.productId === selectedItem.productId &&
          item.color === selectedItem.color &&
          item.size === selectedItem.size
      );

      if (isAlreadySelected) {
        return prevSelectedItems.filter(
          (item) =>
            item.productId !== selectedItem.productId ||
            item.color !== selectedItem.color ||
            item.size !== selectedItem.size
        );
      } else {
        return [...prevSelectedItems, selectedItem];
      }
    });
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyList}>
        <Image
          style={styles.imageWL}
          source={require("../../../assets/images/wishlistempty.png")}
        />
        <Text style={{ fontFamily: "mon", color: COLORS.black, fontSize: 18 }}>
          Giỏ hàng trống
        </Text>
        <Pressable
          style={{
            backgroundColor: COLORS.primary,
            padding: 15,
            borderRadius: 2,
          }}
          onPress={() => router.push("/(tabs)/(home)/homepage")}
        >
          <Text
            style={{ fontFamily: "mon-sb", color: COLORS.white, fontSize: 16 }}
          >
            Mua sắm ngay!
          </Text>
        </Pressable>
      </View>
    );
  };
  // use effect call

  // update cart items
  useEffect(() => {
    if (cartQuery.isSuccess) {
      setCartItems(cartQuery.data.data.cartItems);
    }
  }, [cartQuery.isSuccess, cartQuery.data]);

  // update selection
  // selector
  useEffect(() => {
    if (isSelectAll) {
      setSelectedItems(cartItems);
    }
  }, [isSelectAll]);

  useEffect(() => {
    setSelectAll(
      cartItems.length > 0 &&
      cartItems.every((item) => selectedItems.includes(item))
    );
  }, [selectedItems, cartItems]);

  // total
  useEffect(() => {
    let newTotal = 0;
    if (selectedItems.length != 0) {
      selectedItems.forEach((element) => {
        newTotal += element.price * element.quantity;
      });
    }
    setTotal(newTotal);
  }, [selectedItems]);
  // get all products
  useEffect(() => {
    let newTotalProds = 0;
    if (selectedItems.length != 0) {
      selectedItems.forEach((element) => {
        newTotalProds += element.quantity;
      });
    }
    setTotalQuantityProd(newTotalProds);
  }, [selectedItems]);

  return (
    <SafeAreaView style={styles.container}>
      <Background imageKey="i5">
        <CustomAlert
          title={alert?.title}
          message={alert?.msg}
          show={alert !== null}
          onDismiss={() => {
            setIsAdjust(false)
            setAlert(null)
          }}
          onConfirm={() => handleDeleteItems()}
        />
        <View style={[styles.horizWrapper, styles.heading]}>
          <Text style={styles.title}>Giỏ hàng</Text>
          <Pressable
            onPress={() => {
              setIsAdjust(!isAdjust);
            }}
          >
            <Text style={{ fontSize: SIZES.medium, color: COLORS.white }}>
              {isAdjust ? "Xong" : "Sửa"}
            </Text>
          </Pressable>
        </View>
        {/* cart item */}
        {cartQuery.isLoading && <ActivityIndicator size={20} />}
        {cartQuery.isSuccess ? (
          <FlatList
            style={{ marginBottom: 80 }}
            data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <EmptyComponentCustom
                text={"Giỏ hàng rỗng"}
                icon={
                  <Fontisto
                    name="shopping-basket"
                    size={40}
                    color={COLORS.white}
                  />
                }
                option={"Mua sắm ngay !"}
                onPress={() => router.push("/(tabs)/(home)/homepage")}
              />
            }
            renderItem={({ item }) => (
              <View>
                <ItemCard
                  item={item}
                  isChecked={selectedItems.some(
                    (x) =>
                      x.productId === item.productId &&
                      x.color === item.color &&
                      x.size === item.size
                  )}
                  handleCheck={() => handleSelected(item)}
                  handleQuantityChange={(i) => handleQuantityChange(i)}
                />
              </View>
            )}
          />
        ) : null}
        {/* total and check out */}
        <View style={styles.summary}>
          <View style={styles.checkBox}>
            {cartQuery.isSuccess && (
              <CheckBox
                checked={isSelectAll}
                onPress={() => {
                  const newIsSelectAll = !isSelectAll;
                  setSelectAll(newIsSelectAll);
                  setSelectedItems(newIsSelectAll ? cartItems : []);
                }}
                disabled={cartItems.length === 0}
              />
            )}

            {/* <Text style={{ fontSize: SIZES.medium }}>Chọn tất cả</Text> */}
          </View>
          {isAdjust ? (
            <View>
              <Pressable
                style={styles.delete}
                onPress={() =>
                  setAlert({
                    title: "Xóa",
                    msg: "Xác nhận xóa các sản phẩm đã chọn?",
                  })
                }
                disabled={cartItems.length === 0}
              >
                <Text
                  style={[
                    styles.btnTextDanger,
                    { opacity: cartItems.length === 0 ? 0.4 : 1 },
                  ]}
                >
                  Xóa
                </Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.checkoutWrapper}>
              <Text style={styles.secondaryTitle}>Tổng tiền: {total}</Text>
              <Pressable
                style={[
                  styles.checkout,
                  { opacity: selectedItems.length === 0 ? 0.6 : 1 },
                ]}
                onPress={() => {
                  if (userState?.verified === true) {
                    setOrderItems({
                      items: selectedItems,
                      total,
                      totalQuantityProd,
                    });
                    router.push("/payment");
                  } else {
                    Alert.alert("Lỗi", "Bạn chưa xác thực", [
                      { text: 'Hủy' },
                      { text: "Xác thực ngay", onPress: () => router.push('/verifylater') },
                    ]);
                  }

                }}
                disabled={selectedItems.length === 0}
              >
                <Text style={styles.btnText}>Thanh toán</Text>
              </Pressable>
            </View>
          )}
        </View>
      </Background>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    position: "relative",
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
  heading: {
    paddingHorizontal: 10,
    height: 55,
  },
  address: {
    padding: 10,
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    gap: 5,
    width: width - 30,
    borderRadius: 5,
    backgroundColor: COLORS.gray1,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    height: 40,
    width: 40,
    borderRadius: 20,
    padding: 5,
  },
  textInput: {
    width: width * 0.75,
    height: 60,
    borderRadius: 10,
    color: "black",
    paddingHorizontal: 10,
  },
  summary: {
    position: "absolute",
    bottom: 0,
    height: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    width: "100%",
    backgroundColor: COLORS.white,
  },
  checkBox: {
    width: 50,
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  checkoutWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkout: {
    backgroundColor: COLORS.primary,
    height: 40,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btnText: {
    fontFamily: "mon-sb",
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  btnTextDanger: {
    fontFamily: "mon-sb",
    fontSize: SIZES.medium,
    color: COLORS.errorColor,
  },
  delete: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.errorColor,
    height: 40,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  emptyList: {
    backgroundColor: "transparent",
    display: "flex",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    height: height / 1.4,
  },
  imageWL: {
    width: width / 2,
    objectFit: "cover",
  },
});

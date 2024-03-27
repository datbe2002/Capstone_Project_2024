import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../../assets";
import ItemCard from "../../../components/Cart/ItemCard";
import { ScrollView } from "react-native-gesture-handler";
import { CheckBox } from "react-native-elements";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../store/store";
import { getCartById, updateCart } from "../../context/productsApi";
import Background from "../../../components/BackGround";
import { CartItem } from "../../../constants/Type";
import { router } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
const { height, width } = Dimensions.get("window");

interface Props {}

interface Product {
  id: any;
  defaultImg: string;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

const Cart: React.FC<Props> = ({}) => {
  const [isAdjust, setIsAdjust] = useState(false);
  const [isSelectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Array<CartItem>>([]);
  const { userState } = useUserStore();
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);
  const isFocus = useIsFocused();

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartById(userState?.id),
  });

  const mutation = useMutation({
    mutationFn: (data: any) => updateCart(userState?.userCartId, data),
  });

  useEffect(() => {
    if (cartQuery.isSuccess) {
      setCartItems(cartQuery.data.data.cartItems);
    }
  }, [cartQuery.isSuccess]);

  // edit quantity
  const handleQuantityChange = (updatedItem: CartItem) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === updatedItem.productId &&
      item.color === updatedItem.color &&
      item.size === updatedItem.size
        ? updatedItem
        : item
    );
    setCartItems(updatedCartItems);
    mutation.mutate({ userId: userState?.id, cartItems: updatedCartItems });
  };

  // selector
  useEffect(() => {
    if (isSelectAll) {
      setSelectedItems(cartItems);
    }
  }, [isSelectAll]);

  useEffect(() => {
    if (
      selectedItems.length === cartItems.length &&
      selectedItems.every((selectedItem) =>
        cartItems.some((cartItem) => cartItem === selectedItem)
      )
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedItems]);

  const handleSelected = (item: CartItem) => {
    if (selectedItems.some((selectedItem) => selectedItem === item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
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

  return (
    <SafeAreaView style={styles.container}>
      <Background imageKey="i5">
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
          <ScrollView>
            {cartItems.length < 1 && <ListEmptyComponent />}
            {cartItems.map((item: any, index: any) => (
              <View key={index}>
                <ItemCard
                  item={item}
                  isChecked={selectedItems.some((x) => x === item)}
                  handleCheck={() => handleSelected(item)}
                  handleQuantityChange={(i) => handleQuantityChange(i)}
                />
              </View>
            ))}
          </ScrollView>
        ) : null}

        {/* total and check out */}

        <View style={styles.summary}>
          <View style={styles.checkBox}>
            <CheckBox
              checked={isSelectAll}
              onPress={() => {
                setSelectAll(!isSelectAll);
                if (selectedItems.length === cartItems.length) {
                  setSelectedItems([]);
                }
              }}
            />
            <Text style={{ fontSize: SIZES.medium }}>Chọn tất cả</Text>
          </View>
          {isAdjust ? (
            <View>
              <Pressable style={styles.delete}>
                <Text style={styles.btnTextDanger}>Xóa</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.checkoutWrapper}>
              <Text style={styles.secondaryTitle}>Tổng tiền: 1000</Text>
              <Pressable style={styles.checkout}>
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
    height: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
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

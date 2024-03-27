import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../../assets";
import InputV2 from "../../../components/InputV2";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { cartItems } from "../exampledata";
import ItemCard from "../../../components/Cart/ItemCard";
import { ScrollView } from "react-native-gesture-handler";
import { CheckBox } from "react-native-elements";
import { router } from "expo-router";
const { height, width } = Dimensions.get("window");

interface Props { }

interface Product {
  id: any;
  defaultImg: string;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

const Cart: React.FC<Props> = ({ }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isAdjust, setIsAdjust] = useState(false);
  const [isSelectAll, setSelectAll] = useState(false);
  const textInputRef = useRef<TextInput>(null);
  const [selectedItems, setSelectedItems] = useState<Array<Product>>([]);

  // edit quantity
  const handleQuantityChange = (item: Product) => {
    let origin = cartItems.find((x) => x.id === item.id);
    if (origin) {
      origin.quantity = item.quantity;
      console.log(origin.quantity);
    }
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
        cartItems.some((cartItem) => cartItem.id === selectedItem.id)
      )
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedItems]);

  const handleSelected = (item: Product) => {
    if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  // address
  useEffect(() => {
    if (isEditable && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [isEditable]);

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.horizWrapper, styles.heading]}>
        <Text style={styles.title}>Giỏ hàng</Text>
        <Pressable
          onPress={() => {
            setIsAdjust(!isAdjust);
          }}
        >
          <Text style={{ fontSize: SIZES.medium }}>
            {isAdjust ? "Xong" : "Sửa"}
          </Text>
        </Pressable>
      </View>

      {/* address */}
      <View style={styles.address}>
        <Text style={styles.secondaryTitle}>Địa chỉ</Text>
        <View style={styles.horizWrapper}>
          <TextInput
            style={[
              styles.textInput,
              isEditable
                ? { backgroundColor: COLORS.white }
                : { backgroundColor: "transparent" },
            ]}
            ref={textInputRef}
            multiline
            numberOfLines={4}
            editable={isEditable}
            placeholder="Địa chỉ của bạn."
          />
          <Pressable style={styles.iconWrapper} onPress={toggleEditable}>
            <FontAwesome5 name="pen" size={20} color="white" />
          </Pressable>
        </View>
      </View>

      {/* cart item */}
      <ScrollView>
        {cartItems.map((item: any, index) => (
          <View key={index}>
            <ItemCard
              item={item}
              isChecked={selectedItems.some((x) => x.id === item.id)}
              handleCheck={() => handleSelected(item)}
              handleQuantityChange={(i) => handleQuantityChange(i)}
            />
          </View>
        ))}
      </ScrollView>

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
            <Pressable style={styles.checkout} onPress={() => router.push('/(tabs)/(cart)/payment')}>
              <Text style={styles.btnText}>Thanh toán</Text>
            </Pressable>
          </View>
        )}
      </View>
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
});

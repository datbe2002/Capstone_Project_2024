import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import { COLORS } from "../../assets";

interface Props {
  initialQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
  style?: any;
  enabled?: boolean;
}

const QuantitySelector: React.FC<Props> = ({
  initialQuantity,
  onQuantityChange,
  style,
  enabled,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.Text}>Số lượng:</Text>
      <View style={styles.buttonGroup}>
        <Pressable
          style={[
            styles.button,
            { opacity: quantity === 1 || !enabled ? 0.4 : 1 },
          ]}
          onPress={decreaseQuantity}
          disabled={quantity === 1 || !enabled}
        >
          <Entypo name="minus" size={24} color="black" />
        </Pressable>
        <Text
          style={{
            height: 30,
            width: 40,
            textAlign: "center",
            textAlignVertical: "center",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: COLORS.darkGray,
            fontFamily: 'mon-b'
          }}
        >
          {quantity}
        </Text>
        <Pressable
          style={[styles.button, { opacity: !enabled ? 0.4 : 1 }]}
          onPress={increaseQuantity}
          disabled={!enabled}
        >
          <Ionicons name="add" size={23} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default QuantitySelector;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 40,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: COLORS.gray,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 100,
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.darkGray,
  },
  Text: {
    fontFamily: 'mon-sb',
    fontSize: 16
  }
});

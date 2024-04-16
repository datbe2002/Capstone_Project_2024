import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
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
      <Text style={styles.text}>Số lượng:</Text>
      <View style={styles.buttonGroup}>
        <AntDesign
          style={[{ opacity: quantity === 1 || !enabled ? 0.4 : 1 }]}
          onPress={decreaseQuantity}
          disabled={quantity === 1 || !enabled}
          name="minuscircleo"
          size={25}
          color={COLORS.primary}
        />

        <Text
          style={{
            height: 30,
            width: 20,
            textAlign: "center",
            textAlignVertical: "center",
            fontFamily: "mon-b",
          }}
        >
          {quantity}
        </Text>

        <Ionicons
          style={{ opacity: !enabled ? 0.4 : 1 }}
          name="add-circle-outline"
          size={31}
          color={COLORS.primary}
          onPress={increaseQuantity}
          disabled={!enabled}
        />
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
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 10,
  },

  text: {
    fontFamily: "mon-sb",
    fontSize: 16,
  },
});

import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../assets";
import { ScrollView } from "react-native-gesture-handler";

interface Item {
  size: {
    value: string;
  };
  color: {
    name: string;
  };
  //   id: number | undefined;
}

interface Props {
  data: Item[];
  onPress: (prop: any) => void;
  selectedItem?: Item;
}

const styles = StyleSheet.create({
  variantItemList: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 10,
  },
  variantItem: {
    minWidth: 60,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1.5,
    borderColor: COLORS.blue1,
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
  variantText: {
    width: "auto",
    fontFamily: "mon",
    fontSize: SIZES.medium,
    color: COLORS.primary,
    padding: 0,
    margin: 0,
  },
  variantContaner: {
    marginTop: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  secondaryTitle: {
    fontSize: SIZES.medium,
    fontFamily: "mon-sb",
  },
  variantItemPressed: {
    backgroundColor: COLORS.pink,
  },
});

const VariantSection: React.FC<Props> = ({ data, onPress, selectedItem }) => (
  <View style={styles.variantContaner}>
    <Text style={styles.secondaryTitle}>Các loại có sẵn</Text>
    <View style={styles.variantItemList}>
      {data.map((item, index) => (
        <Pressable
          key={index}
          style={[
            styles.variantItem,
            item === selectedItem ? styles.variantItemPressed : null,
          ]}
          onPress={() => onPress(item)}
        >
          <Text style={[styles.variantText]}>{item.size.value.trim()}</Text>
          <Text style={[styles.variantText]}>{item.color.name.trim()}</Text>
        </Pressable>
      ))}
    </View>
  </View>
);

export default VariantSection;

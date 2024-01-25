import React from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { COLORS, SIZES } from "../assets";
import { TouchableOpacity } from "react-native-gesture-handler";

interface CustomButtonProps {
  onPress?: () => void;
  buttonText: string;
  buttonColor?: "primary" | "secondary";
  style?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  buttonText,
  buttonColor = "primary",
  style,
}) => {
  return (
    // <TouchableOpacity onPress={onPress} style={[style, styles.buttonChild]}>
    //   <Text style={styles.textInside}>{buttonText}</Text>
    // </TouchableOpacity>
    <View style={style}>
      <TouchableOpacity
        style={[
          styles.buttonChild,
          {
            backgroundColor:
              buttonColor === "primary" ? COLORS.primary : COLORS.secondary,
          },
        ]}
        onPress={onPress}
      >
        <Text style={styles.textInside}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonChild: {
    borderRadius: 16,
    minHeight: 60,
    minWidth: 120,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textInside: {
    fontSize: SIZES.large,
    fontFamily: "mon-sb",
    color: "white",
    textAlign: "center",
  },
});

export default CustomButton;

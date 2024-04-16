import React from "react";
import {
  TextInput,
  StyleSheet,
  TextStyle,
  TextInputProps,
  Dimensions,
  View,
} from "react-native";
import { COLORS, SIZES } from "../assets";
const { height, width } = Dimensions.get("window");

interface CustomInputProps extends TextInputProps {
  style?: TextStyle;
  elementAfter?: any;
  onSubmitEditing?: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  style = {},
  elementAfter,
  ...props
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput {...props} style={[styles.input]} />
      {elementAfter}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    width: width / 1.2,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    backgroundColor: "red",
  },
  input: {
    fontFamily: "mon",
    height: "100%",
    width: "90%",
    borderColor: "transparent",
    fontSize: SIZES.large,
  },
});

export default CustomInput;

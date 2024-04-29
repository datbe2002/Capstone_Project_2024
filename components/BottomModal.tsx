import { AntDesign } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import { Alert, Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../assets";
const { width } = Dimensions.get("window");
interface Props {
  children: ReactNode;
  snapHeight: any;
  isOpen: boolean;
  setIsOpen: (props: any) => any;
}

const styles = StyleSheet.create({
  centeredView: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: "auto",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    width: 50,
    alignItems: "flex-end",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalBackdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black
    position: "absolute",
    top: -30,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export const BottomModal: React.FC<Props> = ({
  snapHeight,
  children,
  isOpen,
  setIsOpen,
}) => {
  return (
    <View style={[styles.centeredView, { position: "relative" }]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(!isOpen);
        }}
      >
        <View style={styles.modalBackdrop}></View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(!isOpen);
        }}
      >
        <View style={[styles.centeredView]}>
          <View style={[styles.modalView, { height: snapHeight }]}>
            <View
              style={{
                width: width,
                alignItems: "flex-end",
                paddingHorizontal: 20,
                paddingTop: 20,
              }}
            >
              <AntDesign
                onPress={() => setIsOpen(!isOpen)}
                name="closecircleo"
                size={24}
                color="black"
              />
            </View>
            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
};

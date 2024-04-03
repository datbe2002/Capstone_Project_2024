import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Pressable,
  FlatList,
  Modal,
  Text,
  StyleSheet,
} from "react-native";
import { COLORS, SHADOWS } from "../../assets";

interface ModelSelectorProps {
  data: any[];
  onModelSelect: (model: any) => void;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  data,
  onModelSelect,
  isDropdownOpen,
  toggleDropdown,
}) => {
  const [selectedModel, setSelectedModel] = useState<any | null>(data[0]);
  const [dropdownPosition, setDropdownPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const handleSelect = (item: any) => {
    setSelectedModel(item);
    toggleDropdown();
    onModelSelect(item);
  };

  const handleLayout = (event: any) => {
    setDropdownPosition(event.nativeEvent.layout);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleDropdown} onLayout={handleLayout}>
        <Image source={{ uri: selectedModel.imageUrl }} style={[styles.img]} />
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDropdownOpen}
        onRequestClose={toggleDropdown}
      >
        <Pressable style={styles.fullScreen} onPress={toggleDropdown}>
          <View style={[styles.dropdown, { top: dropdownPosition.height }]}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleSelect(item)}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{ width: 50, height: 50 }}
                  />
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  dropdown: {
    position: "absolute",
    width: "100%",
    right: 0,
    backgroundColor: "red",
  },
  fullScreen: {
    flex: 1,
  },
  img: {
    width: 78,
    height: 78,
    borderRadius: 12,
    objectFit: "cover",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});

export default ModelSelector;

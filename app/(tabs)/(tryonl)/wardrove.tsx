import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SHADOWS, SIZES } from "../../../assets";
import Background from "../../../components/BackGround";
import { useWardove } from "../../store/store";
import { router } from "expo-router";
import { Product } from "../../../constants/Type";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getModels, tryOn } from "../../context/wardroveApi";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  TouchableWithoutFeedback,
} from "@gorhom/bottom-sheet";
const { height, width } = Dimensions.get("window");

const wardrove = () => {
  const modelsQuery = useQuery({
    queryKey: ["models"],
    queryFn: getModels,
  });

  const mutation = useMutation({
    mutationFn: (data: any) => tryOn(data),
    onSuccess: (data) => {
      setImageSrc(data);
    },
  });

  const { wardroveItems, setWardroveItems } = useWardove();
  const [selectedModel, setSelectedModel] = React.useState<any>(
    modelsQuery?.data?.data[0] || null
  );
  const [imageSrc, setImageSrc] = useState<any>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const openBottomSheet = (item: any) => {
    bottomSheetRef.current?.expand();
  };

  const handleRemoveItem = (itemToRemove: Product) => {
    setWardroveItems((prevItems: Product[]) =>
      prevItems.filter((item: Product) => item.id !== itemToRemove.id)
    );
  };

  const wardroveRenderItem = ({ item }: { item: Product }) => (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/(tabs)/(home)/product/[id]",
          params: { id: item.id },
        });
      }}
    >
      <Pressable
        style={styles.itemCard}
        onPress={() => {
          handleChangeImg(item);
        }}
      >
        <View style={[styles.itemImgContainer, SHADOWS.medium]}>
          <Image
            style={styles.itemImg}
            source={
              item.defaultImage
                ? { uri: item.defaultImage }
                : require("../../../assets/images/default.png")
            }
          />
          <Ionicons
            name="trash-outline"
            size={24}
            color={COLORS.errorColor}
            style={styles.removeIcon} // Add this
            onPress={() => {
              handleRemoveItem(item);
            }}
          />
        </View>
      </Pressable>
    </Pressable>
  );

  const handleChangeImg = (item: any) => {
    const obj = {
      link_image: selectedModel.imageUrl,
      link_cloth: item.tryOnImage,
      link_edge: item.edgeImage,
    };
    // mutation.mutate({
    //   link_image: "https://firebasestorage.googleapis.com/v0/b/fsvton-18ce5.appspot.com/o/FSVTON%2Ftest_img%2F000143_0.jpg?alt=media&token=7f20f20d-9658-4426-91bf-a8bc98720c53",
    //   link_cloth: "https://firebasestorage.googleapis.com/v0/b/fsvton-18ce5.appspot.com/o/FSVTON%2Ftest_clothes%2F000028_1.jpg?alt=media&token=7c8c98a3-d17e-4698-bfa0-69fdab723a0c",
    //   link_edge: "https://firebasestorage.googleapis.com/v0/b/fsvton-18ce5.appspot.com/o/FSVTON%2Ftest_edge%2F000028_1.jpg?alt=media&token=8ba10a17-1fe9-4884-97d4-f9443c16ba37"
    // })
    console.log("item ===", item);
    console.log("obj ===", obj);
  };

  useEffect(() => {
    setImageSrc(selectedModel.imageUrl);
  }, [selectedModel]);
  // console.log(imageSrc);

  return (
    <SafeAreaView style={styles.container}>
      <Background imageKey={"i4"}>
        <View style={styles.wrapper}>
          <View style={styles.tryon}>
            <View style={styles.imageWrapper}>
              {mutation.isPending && <ActivityIndicator />}
              {selectedModel && (
                <Image
                  style={[
                    styles.img,
                    // {
                    //   height: 400, width: 200,
                    //   objectFit: "contain",
                    // },
                  ]}
                  source={
                    imageSrc
                      ? { uri: imageSrc }
                      : require("../../../assets/images/default.png")
                  }
                />
              )}
            </View>
            {modelsQuery.isSuccess && (
              <Pressable
                style={[styles.modelSelector, SHADOWS.medium]}
                onPress={openBottomSheet}
              >
                <Image
                  style={[
                    { width: 78, height: 78, borderRadius: 8 },
                    styles.img,
                  ]}
                  source={
                    selectedModel?.imageUrl
                      ? { uri: selectedModel.imageUrl }
                      : require("../../../assets/images/default.png")
                  }
                />
              </Pressable>
            )}
          </View>
          <View style={styles.products}>
            <FlatList
              data={wardroveItems}
              renderItem={wardroveRenderItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              style={styles.itemsList}
            />
          </View>
          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            enablePanDownToClose={true}
            snapPoints={["22%"]}
          >
            <BottomSheetScrollView
              style={{ height: 130, width: width - 20 }}
              horizontal={true}
            >
              {modelsQuery.isSuccess &&
                modelsQuery.data?.data?.map((item: any) => (
                  <Pressable
                    key={item.id.toString()}
                    onPress={() => {
                      setSelectedModel(item);
                      setImageSrc(item.imageUrl);
                      bottomSheetRef.current?.close();
                    }}
                  >
                    <View style={styles.itemCard}>
                      <View style={[styles.itemImgContainer, SHADOWS.medium]}>
                        <Image
                          style={styles.itemImg}
                          source={
                            item.imageUrl
                              ? { uri: item.imageUrl }
                              : require("../../../assets/images/default.png")
                          }
                        />
                      </View>
                    </View>
                  </Pressable>
                ))}
            </BottomSheetScrollView>
          </BottomSheet>
        </View>
      </Background>
    </SafeAreaView>
  );
};

export default wardrove;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  wrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tryon: {
    height: height * 0.7,
    width: "100%",
    alignItems: "center",
    position: "relative",
    backgroundColor: COLORS.white,
  },
  imageWrapper: {
    height: "100%",
    width: width,
    paddingHorizontal: 10,
    position: "absolute",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  modelSelector: {
    height: 80,
    width: 80,
    right: 5,
    top: 10,
    padding: 3,
    position: "absolute",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  products: {
    paddingBottom: 25,
    height: 130,
    width: width - 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.inputBackgroundColor,
    elevation: 2,
  },

  itemsList: {
    width: "98%",
    paddingHorizontal: 5,
    paddingVertical: 2,
    display: "flex",
    flexDirection: "row",
  },
  itemCard: {
    width: width / 4,
    height: 100,
    alignItems: "center",
    gap: 5,
    padding: 5,
    backgroundColor: "transparent",
    position: "relative",
  },
  itemImgContainer: {
    width: width / 4.5,
    height: 85,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  itemImg: {
    width: width / 4.7,
    height: 80,
    borderRadius: 9,
    objectFit: "cover",
  },
  removeIcon: {
    position: "absolute",
    top: 5, // Adjust as needed
    right: 5, // Adjust as needed
  },
});

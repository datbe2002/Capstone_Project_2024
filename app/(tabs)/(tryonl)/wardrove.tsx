import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
  Button,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SHADOWS } from "../../../assets";
import Background from "../../../components/BackGround";
import { useWardove } from "../../store/store";
import { Product } from "../../../constants/Type";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getModels, tryOn } from "../../context/wardroveApi";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import ReactNativeBlobUtil from "react-native-blob-util";
import Share from "react-native-share";

const { height, width } = Dimensions.get("window");

const wardrove = () => {
  const modelsQuery = useQuery({
    queryKey: ["models"],
    queryFn: getModels,
  });

  const mutation = useMutation({
    mutationFn: (data: any) => tryOn(data),
    onSuccess: (data) => {
      console.log("first");
      setImageSrc(data.result);
    },
  });

  const { wardroveItems, setWardroveItems } = useWardove();
  const [selectedModel, setSelectedModel] = React.useState<any>(null);
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
        <View style={styles.removeIcon}>
          <Ionicons
            name="trash-outline"
            size={24}
            color={COLORS.errorColor}
            onPress={() => {
              handleRemoveItem(item);
            }}
          />
        </View>
      </View>
    </Pressable>
  );

  const handleChangeImg = (item: any) => {
    const obj = {
      link_image: selectedModel.imageUrl,
      link_cloth: item.tryOnImage,
      link_edge: item.edgeImage,
    };
    console.log(obj);
    mutation.mutate(obj);
  };

  const shareImage = () => {
    ReactNativeBlobUtil.fetch(
      "GET",
      "https://firebasestorage.googleapis.com/v0/b/fsvton-18ce5.appspot.com/o/ProductImg%2F3474-like.png?alt=media&token=bbe20475-35cc-483f-bc9a-03da743821f9"
    )
      .then((res) => {
        let status = res.info().status;
        if (status === 200) {
          let base64Str = res.base64();
          let options = {
            title: "Share file",
            url: `data:image/jpeg;base64,${base64Str}`,
            message: "Check out this awesome image!",
          };
          Share.open(options)
            .then((r) => {
              console.log(r);
            })
            .catch((e) => {
              e && console.log(e);
            });
        } else {
          // handle other status codes
        }
      })
      // Something went wrong:
      .catch((err) => {
        // error handling
        console.log(err);
      });
  };

  useEffect(() => {
    setSelectedModel(modelsQuery?.data?.data[0]);
  }, [modelsQuery.isSuccess]);

  useEffect(() => {
    setImageSrc(selectedModel?.imageUrl);
  }, [selectedModel]);

  return (
    <SafeAreaView style={styles.container}>
      <Background imageKey={"i5"}>
        <Button title="Click to Share Image" onPress={() => shareImage()} />
        <View style={styles.wrapper}>
          <View style={styles.tryon}>
            <View style={[styles.imageWrapper, SHADOWS.medium]}>
              {selectedModel && (
                <Image
                  style={[styles.img]}
                  source={
                    imageSrc
                      ? { uri: imageSrc }
                      : require("../../../assets/images/default.png")
                  }
                />
              )}
              {mutation.isPending && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(255,255,255,0.6)",
                  }}
                />
              )}
              {mutation.isPending && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(255,255,255,0.6)",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size={"large"} />
                </View>
              )}
            </View>

            {modelsQuery.isSuccess && (
              <Pressable
                style={[styles.modelSelector, SHADOWS.medium]}
                onPress={openBottomSheet}
              >
                <Image
                  style={[
                    styles.img,
                    {
                      width: 72,
                      height: 72,
                      borderRadius: 8,
                      objectFit: "scale-down",
                    },
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
    backgroundColor: "transparent",
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
    borderRadius: 10,
    objectFit: "cover",
  },
  modelSelector: {
    height: 80,
    width: 80,
    right: 10,
    top: 10,
    padding: 3,
    position: "absolute",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  products: {
    height: 110,
    width: width - 20,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: COLORS.inputBackgroundColor,
    marginBottom: 20,
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
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  itemImg: {
    width: width / 4.7,
    height: 80,
    borderRadius: 7,
    objectFit: "scale-down",
    borderWidth: 1,
    borderColor: COLORS.blue1,
  },
  removeIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.blue1,
    borderRadius: 15,
  },
});

import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../assets";
// import { categories } from "../../app/(tabs)/exampledata";
const { height, width } = Dimensions.get("window");

interface CategoriesProps {
  props?: any;
  categories: Array<Category>;
}

type Category = {
  id: number;
  name: string;
  props?: any;
};

const CategoriesSection: React.FC<CategoriesProps> = ({
  props,
  categories,
}) => {
  const router = useRouter();
  return (
    <View style={styles.categories}>
      <View style={[styles.horizWrapper, styles.cateTitleWrapper]}>
        <Text style={styles.title}>Danh mục</Text>
        <Pressable
          style={styles.horizWrapper}
          onPress={() => {
            console.log("more cate");
            router.push("/categories");
          }}
        >
          <Text style={styles.secondaryTitle}>Xem tất cả</Text>
          <FontAwesome5
            name="arrow-circle-right"
            size={20}
            color={COLORS.primary}
          />
        </Pressable>
      </View>

      <View style={styles.cateList}>
        {categories?.map((item: any, index) => (
          <Pressable
            key={index}
            onPress={() => {
              console.log("cate " + index);
            }}
          >
            <View style={[styles.cateCard, SHADOWS.medium]}>
              <Image
                style={styles.cateImg}
                source={
                  item.imgSrc
                    ? { uri: item.imgSrc }
                    : require("../../assets/images/default.png")
                }
              />
              <Text style={[styles.cateTitle, styles.secondaryTitle]}>
                {item.name}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default CategoriesSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  categories: {
    paddingVertical: 10,
    gap: 15,
    backgroundColor: "transparent",
  },
  cateTitleWrapper: {
    gap: 30,
    paddingHorizontal: 10,
  },
  cateList: {
    paddingBottom: 5,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  cateCard: {
    height: width / 2.5,
    width: width / 2.2,
    borderRadius: 10,
    position: "relative",
    backgroundColor: COLORS.inputBackgroundColor,
  },
  cateImg: {
    height: width / 2.6,
    width: width / 2.2,
    borderRadius: 10,
    top: 0,
    objectFit: "cover",
    position: "absolute",
    backgroundColor: "transparent",
  },
  cateTitle: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
});

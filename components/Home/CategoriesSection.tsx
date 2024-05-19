import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { memo } from "react";
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
import cate3 from "../../assets/images/categories-template/ao-khoac-template.jpg";
import cate1 from "../../assets/images/categories-template/ao-template.jpg";
import cate2 from "../../assets/images/categories-template/quan-template.jpg";
import cate4 from "../../assets/images/categories-template/quanshort-template.jpg";
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

  const handleSearch = (item: any) => {
    router.push({
      pathname: "/(tabs)/(home)/products",
      params: { cateParam: item.name },
    });
  };
  // console.log('categories 1')
  function addImageToCategories(categories: any, images: any) {
    // Make sure there are enough images for each category
    if (categories.length > images.length) {
      // console.log("Not enough images for all categories");
      return;
    }

    // Add an image to each category
    for (let i = 0; i < categories.length; i++) {
      categories[i].imgSrc = images[i];
    }

    return categories;
  }
  const images = [cate1, cate2, cate3, cate4];
  const temp = categories.filter((x) => x.id !== -1).slice(0, 4);
  const quadcate: any[] = addImageToCategories(temp, images);
  // console.log(categories);
  return (
    <View style={styles.categories}>
      <View style={[styles.horizWrapper, styles.cateTitleWrapper]}>
        <Text style={styles.title}>Danh mục</Text>
        <Pressable
          style={styles.horizWrapper}
          onPress={() => {
            router.push("/(tabs)/(home)/products");
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
        {quadcate?.map((item: any, index) => (
          <Pressable
            key={index}
            onPress={() => {
              handleSearch(item);
            }}
          >
            <View style={[styles.cateCard, SHADOWS.medium]}>
              <Image style={styles.cateImg} source={item.imgSrc} />
              <Text
                style={[
                  styles.cateTitle,
                  styles.secondaryTitle,
                  {
                    backgroundColor: COLORS.white,
                    color: COLORS.primary,
                    paddingHorizontal: 5,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: COLORS.gray,
                  },
                ]}
              >
                {item.name}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default memo(CategoriesSection);

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
    justifyContent: "center", // Add this
    alignItems: "center", // Add this
  },
  cateImg: {
    height: width / 2.6,
    width: width / 2.3,
    borderRadius: 10,
    position: "absolute",
    objectFit: "cover",
  },
  cateTitle: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
});

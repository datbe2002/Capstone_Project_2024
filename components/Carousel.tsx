import React, { useState, useRef, useEffect } from "react";
import { ScrollView, View, Animated, StyleSheet } from "react-native";
import { COLORS } from "../assets";

interface CarouselProps {
  items: any[];
  screenWidth: number;
  renderItem: (item: any) => JSX.Element;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  screenWidth,
  renderItem,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  //   reset animate when change index
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: activeIndex,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [activeIndex]);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={screenWidth}
        decelerationRate="fast"
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <View
            style={{
              width: screenWidth,
              justifyContent: "center",
              alignItems: "center",
            }}
            key={index}
          >
            {renderItem(item)}
          </View>
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {items.map((_, index) => (
          <Animated.View
            key={index}
            style={
              index === activeIndex
                ? styles.activeIndicator
                : styles.inactiveIndicator
            }
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicatorContainer: {
    position: "absolute",
    width: "100%",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  activeIndicator: {
    height: 10,
    width: 20, // Set a fixed width here
    borderRadius: 5,
    backgroundColor: COLORS.secondary,
    margin: 5,
  },
  inactiveIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.gray,
    margin: 5,
  },
});

export default Carousel;

import React, { ReactNode } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import i1 from "../assets/images/bb1.png";
import i2 from "../assets/images/bb2.png";
import i3 from "../assets/images/bb3.png";
import i4 from "../assets/images/bb4.png";
import i5 from "../assets/images/bb5.png";
import i6 from "../assets/images/bb6.png";
// Map of images

const images = {
  i1,
  i2,
  i3,
  i4,
  i5,
  i6,
};

interface BackgroundProps {
  imageKey: keyof typeof images;
  children: ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ imageKey, children }) => {
  const image = images[imageKey];

  return (
    <ImageBackground source={image} style={styles.background}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default Background;

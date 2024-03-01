import { View, Text, Dimensions } from "react-native";
import React from "react";
import { MotiView } from "moti";
import { BlurView } from "expo-blur";

const Loader = () => {
  const { height, width } = Dimensions.get("screen");
  return (
    <BlurView
      intensity={50}
      tint="dark"
      style={{
        flex: 1,
        zIndex: 7,
        height: height,
        width: width,
        position: "absolute",
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        className="bg-primary"
        style={{
          height: 164,
          width: 164,
          borderRadius: 36,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MotiView
          from={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            borderWidth: 0.5,
            shadowOpacity: 0.5,
          }}
          animate={{
            width: 40 + 20,
            height: 40 + 20,
            borderRadius: (40 + 20) / 2,
            borderWidth: 40 / 10,
          }}
          transition={{
            type: "timing",
            duration: 1000,
            loop: true,
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            shadowOpacity: 1,
            borderWidth: 40 / 10,
            borderColor: "white",
            shadowColor: "white",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: 10,
          }}
        />
      </View>
    </BlurView>
  );
};

export default Loader;

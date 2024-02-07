import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

const TextButton = ({
  label,
  onPress,
  isLoading,
  icon,
  prependIcon = false,
}) => {
  return (
    <Pressable
      className={`flex flex-row h-[40px] justify-center items-center ${
        isLoading ? "bg-secondary" : "bg-primary"
      } w-[100%] rounded-md`}
      onPress={onPress}
      disabled={isLoading}
    >
 
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text className="font-interregular text-white text-center text-[14px] py-2">
        {label}
      </Text>
      )}
      {prependIcon && icon}
    </Pressable>
  );
};

export default TextButton;

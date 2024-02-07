import { View, Text, Pressable } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { Logout } from "../context/slicers";

const Profile = () => {
  
  const dispatch = useDispatch()

  async function handlePress(){
    await AsyncStorage.removeItem("token")
    dispatch(Logout())
  }
  return (
    <View className="justify-center items-center flex-1">
      <Pressable onPress={handlePress} className="h-12 w-40 bg-primary justify-center items-center rounded-3xl">
        <Text className="font-intermedium text-xl text-white text-center">Logout</Text>
      </Pressable>
    </View>
  );
};

export default Profile;

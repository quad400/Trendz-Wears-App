import { View, Text, Pressable } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../context/slicers";
import { AntDesign } from "@expo/vector-icons";

const Profile = () => {
  
  const dispatch = useDispatch()

  async function handlePress(){
    await AsyncStorage.removeItem("token")
    dispatch(Logout())
  }

  const {user} = useSelector((state)=> state.product)

  return (
    <View className="justify-center items-center flex-1 mx-4">
      <View className="h-20 w-20 shadow-md bg-primary justify-center items-center rounded-full mb-6">
        <Text className="text-[24px] font-intersemibold text-center text-white">{user?.name.split("")[0]}</Text>
      </View>
      <Text className="text-[18px] font-intersemibold text-center text-balck">{user?.name}</Text>
      <Text className="text-[14px] mt-3 font-intersemibold text-center text-gray-500">{user?.email}</Text>
      <Text className="text-[14px] my-3 font-intermedium text-center text-gray-700">{user?.address}</Text>
      <Pressable onPress={handlePress} className="h-10 w-40 flex-row bg-primary justify-evenly items-center rounded-xl">
        <Text className="font-intermedium text-[18px] text-white text-center">Logout</Text>
        <AntDesign name="logout" color="white" size={22} />
      </Pressable>
    </View>
  );
};

export default Profile;

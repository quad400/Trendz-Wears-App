import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components";
import { categories } from "../constants";
import { ProductData } from "../constants/data";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { AddToWishlist, GetWishlist } from "../context/slicers";
import { Naira } from "../utils";
import { showMessage } from "react-native-flash-message";

const Wishlist = ({navigation}) => {
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(GetWishlist())
  },[dispatch])

  const {wishlist} = useSelector((state)=> state.product)

  
  const handleWishList = useCallback((id) => {
    dispatch(AddToWishlist(id));
    showMessage({
        message: "Successfully remove from wishlist",
        type: "success",
      });
    
  }, []);


  function renderProducts() {
    return (
      <View className="flex flex-row gap-x-3 gap-y-1 mt-3 flex-wrap mx-1">
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item?._id}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate("Detail", { item });
                }}
                className="w-[159px] bg-zinc-50 rounded-md"
                key={index}
              >
                <ImageBackground
                  source={{ uri: item?.images[0] }}
                  className="h-[140px] w-[159px]"
                  resizeMode="cover"
                  borderRadius={5}
                >
                  <View className="bg-gray-100 justify-center items-center rounded-full h-6 w-6 absolute right-2 top-2">
                    <MaterialIcons
                        onPress={() => handleWishList(item?._id)}
                        name="favorite"
                        size={16}
                        color="brown"
                      />
                  </View>
                </ImageBackground>
                <View className="mt-2 mb-1">
                  <View className="flex-row justify-between items-start">
                    <Text
                      numberOfLines={1}
                      className="text-textColor w-[80%] text-[12px] font-intersemibold"
                    >
                      {item.title}
                    </Text>
                    <View className="flex-row justify-start w-[20%] space-x-1 items-center">
                      <AntDesign name="star" size={10} color="gold" />
                      <Text className="text-textColor font-interregular text-[10px]">
                        5.0
                      </Text>
                    </View>
                  </View>
                  <Text className="text-textColor text-[11px] font-intermedium mt-2">
                    {Naira.format(item.price)}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <Header lable="My Wishlist" />
        {renderProducts()}
    </SafeAreaView>
  );
};

export default Wishlist;

import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Naira } from "../utils";
import { AddToCart, GetCart } from "../context/slicers";
import { useDispatch } from "react-redux";

const Detail = ({ navigation, route }) => {
  const { item } = route.params;

  const [displayImage, setDisplayImage] = useState(item?.images[0]);
  const [size, setSize] = useState(item?.sizes[0]);
  const [color, setColor] = useState(item?.colors[0]);
  
  const dispatch = useDispatch()

  function handleAddtoCart(){
    const body = {
      "productId": item?._id,
      "size": size,
      "color": color
    }

    dispatch(AddToCart(body))
    dispatch(GetCart())
  }

  function renderImages() {
    return (
      <View className="flex-row rounded-md bg-gray-200 space-x-2 p-1.5 border-white border-[1px]">
        {item?.images?.map((itemContent, index) => {
          return (
            <Pressable key={index} onPress={() => setDisplayImage(itemContent)}>
              <Image
                source={{
                  uri: itemContent,
                }}
                resizeMode="cover"
                style={{
                  borderWidth: 1,
                  borderColor: "white",
                }}
                className="h-[36px] w-[36px] border-[1px] rounded-sm"
              />
            </Pressable>
          );
        })}
      </View>
    );
  }

  function renderContent() {
    return (
      <View className="px-3 pt-4">
        <View className="justify-between flex-row items-center">
          <View className="flex-row justify-start w-[20%] space-x-1 items-center">
            <AntDesign name="star" size={10} color="gold" />
            <Text className="text-textColor font-interregular text-[10px]">
              5.0
            </Text>
          </View>
        </View>
        <Text className="text-textColor text-[13px] my-3 font-intersemibold">
          {item.title}
        </Text>
        <View>
          <Text className="text-textColor text-[11px] font-intersemibold">
            Product details
          </Text>
          <Text className="text-textColor text-[11px] my-2 font-interregular">
            {item.description}
          </Text>
          <View className="h-[1px] bg-gray-100 w-full" />
        </View>
        <Text className="text-textColor text-[11px] mt-3 mb-2 font-intersemibold">
          Select size
        </Text>

        <View className="flex-row">
          {item?.sizes?.map((sizeContent, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => setSize(sizeContent)}
                className={`flex border h-8 px-3 mx-1.5 mt-3 border-gray-100 rounded-[5px] flex-row justify-center items-center ${
                  size === sizeContent && "bg-primary"
                }`}
              >
                <Text
                  className={`text-[12px] text-gray40 font-intermedium text-center ${
                    size === sizeContent && "text-white"
                  }`}
                >
                  {sizeContent}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text className="text-textColor text-[11px] mt-3 font-intersemibold">
          Select color
        </Text>
        <View className="flex-row mb-5">
          {item?.colors?.map((colorContent, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => setColor(colorContent)}
                className={`flex border h-8 px-3 mx-1.5 mt-3 border-gray-100 rounded-[5px] flex-row justify-center items-center ${
                  color === colorContent && "bg-primary"
                }`}
              >
                <Text
                  className={`text-[12px] text-gray40 font-intermedium text-center ${
                    color === colorContent && "text-white"
                  }`}
                >
                  {colorContent}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <ScrollView>
        <ImageBackground
          source={{ uri: displayImage }}
          resizeMode="cover"
          className="w-full h-[300px]"
        >
          <View className="mx-3 mt-5 justify-between items-center flex-row">
            <View className="bg-gray-100 justify-center items-center rounded-full h-8 w-8">
              <AntDesign
                onPress={() => navigation.goBack()}
                name="arrowleft"
                size={24}
                color="black"
              />
            </View>
            <View className="bg-gray-100 justify-center items-center rounded-full h-8 w-8">
              <MaterialIcons
                onPress={() => {
                  console.log("fav");
                }}
                name="favorite-outline"
                size={24}
                color="#404040"
              />
            </View>
          </View>
          <View className="justify-center items-center absolute bottom-5 left-0 right-0">
            {renderImages()}
          </View>
        </ImageBackground>

        {renderContent()}
      </ScrollView>

      <View className="h-[70px] w-[90%] mx-3 mt-3">
        <View className="h-[1px] bg-gray-100 w-full" />

        <View className="flex-row justify-between items-center mt-3">
          <View>
            <Text className="font-intermedium text-gray-400 text-[12px]">
              Total Price
            </Text>
            <Text className="text-textColor text-[16px] font-intersemibold">
              {Naira.format(item.price)}
            </Text>
          </View>

          <Pressable
            onPress={handleAddtoCart}
            className="bg-primary w-[65%]  rounded-xl py-3 justify-center items-center flex-row space-x-2"
          >
            <Text className="text-[14px] text-white font-intermedium">
              Add to cart
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Detail;

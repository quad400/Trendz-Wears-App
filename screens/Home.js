import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { categories } from "../constants";
import { products } from "../api";
import axios from "axios";
import { ProductData } from "../constants/data";

const Home = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // const BASE_URL = "http://127.0.0.1:8000/api";

  // const products = async () => {
  //   try {
  //     const response = await axios.get(`http://127.0.0.1:8000/api/product/`);
  //     console.log(response)
  //     console.log(response.data)
  //     return response.data
  // } catch (e) {
  //     console.log(e.message)
  //   }
  // };

  function renderCategory() {
    return (
      <FlatList
      contentContainerStyle={{
        backgroundColor: "white",
        paddingBottom: 5
      }}
        data={categories}
        keyExtractor={(item) => `${item.name}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              onPress={() => setSelectedCategory(item.slug)}
              className={`flex border h-10 px-3 mx-1.5 mt-3 border-gray-100 rounded-[5px] flex-row justify-center items-center ${
                selectedCategory === item.slug && "bg-primary"
              }`}
            >
              <Text
                className={`text-[12px] text-gray40 font-intermedium text-center ${
                  selectedCategory === item.slug && "text-white"
                }`}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        }}
      />
    );
  }

  function renderProducts() {
    return (
      <View className="flex flex-row gap-x-3 gap-y-1 mt-3 flex-wrap mx-1">
        {ProductData.map((item, index) => {
          return (
            <Pressable onPress={()=> {navigation.navigate("Detail")}} key={index}>
              <ImageBackground
                source={item.image}
                className="h-[140px] w-[159px]"
                borderRadius={5}
              >
                <View className="bg-gray-100 justify-center items-center rounded-full h-6 w-6 absolute right-2 top-2">
                  <MaterialIcons
                    onPress={() => {
                      console.log("fav");
                    }}
                    name="favorite-outline"
                    size={16}
                    color="#404040"
                  />
                </View>
              </ImageBackground>
              <View className="mt-2 mb-1">
                <View className="flex-row justify-between items-center">
                  <Text className="text-textColor text-[12px] font-intersemibold">
                    {item.name}
                  </Text>
                  <View className="flex-row justify-center space-x-1 items-center">
                    <AntDesign name="star" size={10} color="gold" />
                    <Text className="text-textColor font-interregular text-[10px]">
                      5
                    </Text>
                  </View>
                </View>
                <Text className="text-textColor text-[11px] font-interregular">
                  N{item.price}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-white w-full h-full">
      <View className="p-3">
        <Text className="text-textColor text-[18px] font-intermedium">
          Hello Quadri
        </Text>
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate("Search");
        }}
        className="flex-row justify-start items-center w-full mx-3"
      >
        <View className="flex border w-[80%] h-10 px-3 border-gray-100 rounded-[5px] flex-row justify-start items-center space-x-2">
          <AntDesign name="search1" size={20} color="#A36D3E" />
          <Text className="text-[12px] text-gray40 font-intermedium">
            Search
          </Text>
        </View>
        <View className="justify-center items-center bg-primary px-2 h-10 ml-2 rounded-md">
          <Ionicons name="filter" size={24} color="white" />
        </View>
      </Pressable>

      <ScrollView
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={[0]}
      >
        {/* Category */}
        {renderCategory()}
        {renderProducts()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

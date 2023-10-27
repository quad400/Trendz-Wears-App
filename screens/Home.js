import { View, Text, TextInput, Pressable, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { categories } from "../constants";

const Home = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  function renderCategory() {
    return (
      <FlatList
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

      <View>
        {/* Category */}
        {renderCategory()}
      </View>
    </SafeAreaView>
  );
};

export default Home;

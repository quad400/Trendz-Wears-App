import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const Home = ({navigation}) => {

function renderCategory(){
    return <View>
        
    </View>
}



  return (
    <SafeAreaView className="bg-white w-full h-full">
      <View className="p-3">
        <Text className="text-textColor text-[18px] font-intermedium">
          Hello Quadri
        </Text>
      </View>
      <Pressable onPress={()=> {navigation.navigate("Search")}} className="flex-row justify-start items-center w-full mx-3">
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

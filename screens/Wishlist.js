import { View, Text, ScrollView, FlatList, Pressable, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Header} from "../components"
import { categories } from '../constants'
import { ProductData } from '../constants/data'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'


const Wishlist = () => {

    const [selectedCategory, setSelectedCategory] = useState("all");

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
                <Pressable key={index}>
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
   <SafeAreaView className="bg-white h-full w-full">
        <Header lable="My Wishlist" />

        <ScrollView
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={[0]}
      >
        {/* Category */}
        {renderCategory()}
        {renderProducts()}
      </ScrollView>

   </SafeAreaView>
    )
}

export default Wishlist
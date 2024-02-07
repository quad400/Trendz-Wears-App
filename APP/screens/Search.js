import { View, Text, TextInput, ScrollView, Pressable, ImageBackground, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components";
import { ProductData } from "../constants/data";
import { useDispatch, useSelector } from "react-redux";
import { SearchProduct } from "../context/slicers";
import { Naira } from "../utils";

const Search = ({navigation}) => {
  const [s, setS] = useState("");

  
  const dispatch = useDispatch()
  
  const handleResult = useCallback((event)=>{
    setS(event)
    dispatch(SearchProduct(event))
  },[dispatch, s])
  
  const {search} = useSelector(state=> state.product)


  function renderProducts() {
    return (
      <View className="flex flex-row gap-x-3 gap-y-1 mt-3 flex-wrap mx-1">
        <FlatList
          data={search}

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
    <SafeAreaView className="bg-white w-full h-full">
      <Header lable="Search" />
      <View className="mx-3 flex border h-10 px-3 border-gray-100 rounded-[5px]  flex-row justify-start items-center space-x-2">
        <AntDesign name="search1" size={20} color="#A36D3E" />
        <TextInput
          cursorColor="black"
          placeholder="Search"
          autoCorrect={false}
          autoComplete="off"
          value={s}
          onChangeText={handleResult}
          autoCapitalize="none"
          className={`text-[12px] w-[90%] font-intermedium outline-none`}
        />
      </View>
      <View className="mt-4 mb-32">
        <View className="mx-3 flex-row justify-between items-center">
          <Text className="text-textColor text-[10px] font-intersemibold">Result for jacket</Text>
          <Text className="text-gray85 text-[10px] font-interregular">{search.length} found</Text>
        </View>
        <View className="h-[2px] w-full justify-center items-center mx-3 bg-gray-100 mt-2" />

        
        <ScrollView
        stickyHeaderHiddenOnScroll={true}
        contentContainerStyle={{
          marginBottom: 40
        }}
        stickyHeaderIndices={[0]}
      >
        {renderProducts()}
      </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Search;

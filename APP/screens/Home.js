import {
  View,
  Text,
  Pressable,
  FlatList,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { categories } from "../constants";
import { Naira } from "../utils";
import { AuthContext } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { AddToWishlist, GetAllProduct, GetWishlist } from "../context/slicers";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [isFav, setIsFav] = useState(false);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllProduct(page, selectedCategory));
    dispatch(GetWishlist());
  }, [dispatch, selectedCategory]);

  const handleWishList = useCallback((id) => {
    dispatch(AddToWishlist(id));

    setIsFav(!isFav);
    if (isFav === false) {
      showMessage({
        message: "Successfully added to wishlist",
        type: "success",
      });
    } else {
      showMessage({
        message: "Successfully remove from wishlist",
        type: "success",
      });
    }
  }, []);

  const { products, wishlist, user } = useSelector((state) => state.product);

  console.log(user)
  function renderProducts() {
    return (
      <View className="flex flex-row  gap-x-3 gap-y-2 mt-3 flex-wrap mx-1">
        <FlatList
          ListHeaderComponent={
            <ScrollView
              contentContainerStyle={{
                marginBottom: 20,
                paddingBottom: 10,
                backgroundColor: "whitesmoke",
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {categories.map((item) => {
                return (
                  <Pressable
                  key={item.id}
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
              })}
            </ScrollView>
          }
          data={products}
          keyExtractor={(item) => item?._id}
          renderItem={({ item, index }) => {
            wishlist.find((item) => {
              if (item?._id.toString() === item?._id.toString()) {
                setIsFav(true);
              } else {
                setIsFav(false);
              }
            });
            return products.length === 0 ? (
              <View className="bg-red-800 h-[300px] w-full">
                <Text>No product for this category</Text>
              </View>
            ) : (
              <Pressable
                onPress={() => {
                  navigation.navigate("Detail", { item });
                }}
                className="w-[159px] bg-zinc-50 rounded-md"
                key={item?._id}
              >
                <ImageBackground
                  source={{ uri: item?.images[0] }}
                  className="h-[140px] w-[159px]"
                  resizeMode="cover"
                  borderRadius={5}
                >
                  <View className="bg-gray-100 justify-center items-center rounded-full h-6 w-6 absolute right-2 top-2">
                    {isFav ? (
                      <MaterialIcons
                        onPress={() => handleWishList(item?._id)}
                        name="favorite"
                        size={16}
                        color="brown"
                      />
                    ) : (
                      <MaterialIcons
                        onPress={() => handleWishList(item?._id)}
                        name="favorite-outline"
                        size={16}
                        color="black"
                      />
                    )}
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
      <View className="p-3">
        <Text className="text-textColor text-[18px] font-intermedium">
          Hello {user?.name}
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

      {renderProducts()}
    </SafeAreaView>
  );
};

export default Home;

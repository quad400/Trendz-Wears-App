import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, TextButton } from "../components";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { cart } from "../constants";

const CartItem = ({ item }) => {
  return (
    <View className="flex-row gap-3 justify-start items-center mt-2">
      <Image
        source={item.image}
        resizeMode="cover"
        className="h-[80px] w-[80px] rounded-md"
      />
      <View className="flex-1 h-[80px] justify-evenly">
        <Text className="text-textColor text-xs font-intersemibold">
          {item.name}
        </Text>
        <Text className="text-textColor text-[8px] font-interregular">
          Size: {item.size}
        </Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-textColor text-xs font-intermedium">
            N{item.price}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Checkout = () => {
  return (
    <SafeAreaView className="bg-white w-full h-full">
      <Header lable="Checkout" />

      <FlatList
        data={cart}
        ListHeaderComponent={() => {
          return (
            <View className="mt-3">
              <View>
                <Text className="text-textColor mb-3 font-intersemibold text-[12px]">
                  Shipping Address
                </Text>
                <View className="flex-row gap-2">
                  <MaterialIcons name="my-location" size={24} color="#A36D3E" />
                  <View>
                    <Text className="text-textColor text-[12px] font-intermedium">
                      Home
                    </Text>
                    <Text className="text-textColor text-[10px] font-interregular">
                      10, Allen Avenue ikeja Ogba Road
                    </Text>
                  </View>
                </View>
                <View className="h-[1px] w-full bg-gray-200 my-3" />
              </View>
              <View>
                <Text className="text-textColor mb-3 font-intersemibold text-[12px]">
                  Shipping Type
                </Text>
                <View className="flex-row gap-2">
                  <MaterialCommunityIcons
                    name="truck-delivery"
                    size={24}
                    color="#A36D3E"
                  />
                  <View>
                    <Text className="text-textColor text-[12px] font-intermedium">
                      Cargo
                    </Text>
                    <Text className="text-textColor text-[10px] font-interregular">
                      Estimated arrival 23rd august
                    </Text>
                  </View>
                </View>
                <View className="h-[1px] w-full bg-gray-200 my-2" />
              </View>
              <View className="mt-3">
                <Text className="text-textColor text-[13px] font-intermedium">
                  Order List
                </Text>
              </View>
            </View>
          );
        }}
        contentContainerStyle={{
            marginHorizontal: 12,
        }}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => {
          return (
            <View className="mx-3 my-3">
              <TextButton label="Continue to Payment" />
            </View>
          );
        }}
        renderItem={({ item, index }) => {
          return <CartItem item={item} />;
        }}
      />
    </SafeAreaView>
  );
};

export default Checkout;

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, TextButton } from "../components";
import { cart } from "../constants";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const CartItem = ({ item }) => {
  const rightSwipeAction = () => {
    return (
      <View className="h-fit mb-2 w-16 justify-center items-center bg-red-200">
        <TouchableOpacity>
          <MaterialCommunityIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={rightSwipeAction}>
      <View className="flex-row gap-3 justify-start items-center mx-3 mt-2">
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
            <View className="flex-row justify-center items-center space-x-2">
              <View className="bg-gray-100 h-3 justify-center items-center w-4 rounded-sm">
                <AntDesign name="minus" size={10} color="black" />
              </View>
              <Text>2</Text>
              <View className="bg-primary h-3 justify-center items-center w-4 rounded-sm">
                <AntDesign name="plus" size={10} color="white" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const Cart = ({navigation}) => {
  const [promoCode, setPromoCode] = useState("");

  function footerComponent (){
    return (
      <View className="mt-3">
        <View className="h-[1px] w-full bg-gray-200 mb-3" />
        <View className="mx-3 mb-10">
          <View className="border boder-[1px] flex-row h-[40px] w-full justify-center items-stretch pl-2 rounded-md border-primary">
            <TextInput
              cursorColor="black"
              placeholder="Promo Code"
              autoCorrect={false}
              autoComplete="off"
              value={promoCode}
              onChangeText={(e) => setPromoCode(e)}
              autoCapitalize="none"
              className={`text-[12px] w-[60%] font-intermedium outline-none`}
            />
            <Pressable className="bg-primary h-fit w-[40%] rounded-md justify-center items-center">
              <Text className="text-white text-[12px] font-intermedium">
                Apply
              </Text>
            </Pressable>
          </View>
          <View className="mt-4 flex-row justify-between items-center">
            <Text className="text-textColor text-[11px] font-interregular">Subtotal</Text>
            <Text className="text-textColor text-[14px] font-intermedium">N20,000</Text>
          </View>
          <View className="mt-2 flex-row justify-between items-center">
            <Text className="text-textColor text-[11px] font-interregular">Delivery Fee</Text>
            <Text className="text-textColor text-[14px] font-intermedium">N1000</Text>
          </View>
          <View className="mt-2 flex-row justify-between items-center">
            <Text className="text-textColor text-[11px] font-interregular">Discount</Text>
            <Text className="text-textColor text-[14px] font-intermedium">0</Text>
          </View>
        <View className="h-[1px] w-full bg-gray-200 mb-3 my-3" />
          <View className="mt-2 mb-4 flex-row justify-between items-center">
            <Text className="text-textColor text-[11px] font-interregular">Total</Text>
            <Text className="text-textColor text-[14px] font-intermedium">N20,000</Text>
          </View>
        <TextButton 
          onPress={()=>navigation.navigate("Checkout")}
          label="Proceed to Checkout"
        />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-white w-full h-full">
      <GestureHandlerRootView>
        <Header lable="My Cart" />

        <FlatList
          data={cart}
          ListFooterComponentStyle={{
            marginBottom: 100,
          }}
          keyExtractor={(item) => item.id}
          ListFooterComponent={footerComponent}
          renderItem={({ item, index }) => {
            return <CartItem item={item} />;
          }}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Cart;

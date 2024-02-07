import { View, Text } from "react-native";
import React from "react";
import Home from "../screens/Home";
import Cart from "../screens/Cart";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Wishlist from "../screens/Wishlist";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard:true,
        headerShown: false,
        tabBarStyle: {
          borderRadius: 10,
          marginHorizontal: 6,
          backgroundColor: "#404040",
          position: "absolute",
          bottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className="flex-row justify-center items-center">
                <View
                  className={`justify-center items-center mr-1 ${
                    focused && "h-8 w-8 rounded-full bg-white"
                  }`}
                >
                  <Entypo
                    name="home"
                    size={18}
                    color={focused ? "#A36D3E" : "white"}
                  />
                </View>
                <Text className="text-white text-[12px] font-intermedium">
                  Home
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className="flex-row justify-center items-center">
                <View
                  className={`justify-center items-center mr-1 ${
                    focused && "h-8 w-8 rounded-full bg-white"
                  }`}
                >
                  <Entypo
                    name="shopping-cart"
                    size={18}
                    color={focused ? "#A36D3E" : "white"}
                  />
                </View>
                <Text className="text-white text-[12px] font-intermedium">
                  Cart
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className="flex-row justify-center items-center">
                <View
                  className={`justify-center items-center mr-1 ${
                    focused && "h-8 w-8 rounded-full bg-white"
                  }`}
                >
                  <MaterialIcons
                    name="favorite"
                    size={18}
                    color={focused ? "#A36D3E" : "white"}
                  />
                </View>
                <Text className="text-white text-[12px] font-intermedium">
                  Wishlist
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className="flex-row justify-center items-center">
                <View
                  className={`justify-center items-center mr-1 ${
                    focused && "h-8 w-8 rounded-full bg-white"
                  }`}
                >
                  <FontAwesome5
                    name="user-alt"
                    size={18}
                    color={focused ? "#A36D3E" : "white"}
                  />
                </View>
                <Text className="text-white text-[12px] font-intermedium">
                  Profile
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

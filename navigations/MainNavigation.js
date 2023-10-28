import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/Onboarding";
import SignUp from "../screens/auth/SignUp";
import SignIn from "../screens/auth/SignIn";
import Home from "../screens/Home";
import Search from "../screens/Search";
import BottomNavigation from "./BottomNavigation";
import Checkout from "../screens/Checkout";
import Detail from "../screens/Detail";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};

export default MainNavigation;

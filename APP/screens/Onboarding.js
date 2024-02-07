import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextButton } from "../components";
import { Feather } from "@expo/vector-icons";

const Onboarding = ({navigation}) => {
  return (
    <SafeAreaView className="bg-white h-full w-full px-5">
      <View className="flex flex-row justify-center items-center space-x-5 mt-8">
      <Image
        source={require("../assets/images/img1.png")}
        resizeMode="cover"
        borderRadius={30}
        className="h-64 w-40"
      />
        <View className="flex flex-col justify-center items-center space-y-2">
          <Image
            source={require("../assets/images/img1.png")}
            resizeMode="cover"
            borderRadius={30}
            className="h-36 w-28"
          />
          <Image
            source={require("../assets/images/img1.png")}
            resizeMode="cover"
            borderRadius={56}
            className="h-28 w-28"
          />
        </View>
      </View>
      <View className="mt-4 mb-7">
        <Text className="font-intersemibold text-[20px] text-center text-textColor">
          The <Text className="text-primary">fashion app</Text> that makes you look your best
        </Text>
        <Text className="font-interregular text-textColor text-[12px] mt-2 text-center">Elevate your fashion sense and be ready to rock on trendy items from our mobile app</Text>
      </View>
      <TextButton 
        label="Let's Get Started"
        onPress={()=>{navigation.navigate("SignUp")}}
        prependIcon={true}
        icon={<Feather name="chevrons-right" size={24} color="white" />}
      />
      <View className="flex flex-row justify-center items-center mt-3">

      <Text className="text-center text-textColor font-interregular text-[12px]">Already have an account ? </Text>
      <Pressable onPress={()=> navigation.navigate("SignIn")}><Text className="text-primary font-interregular text-[12px]">Sign in</Text></Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

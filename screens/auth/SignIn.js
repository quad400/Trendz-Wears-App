import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputText, TextButton } from "../../components";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  return (
    <SafeAreaView className="bg-white h-full w-full px-5">
      <View className="flex justify-start items-center ">
        <Text className="font-intersemibold text-textColor mt-4 text-[20px]">
          Login Account
        </Text>
        <Text className="font-interregular text-center w-[70%] mt-2 text-gray55 text-[12px]">
          Fill your information below 
        </Text>
      </View>
      <KeyboardAwareScrollView>
        {/* Email */}
        <InputText
          label="Email"
          placeholder="Enter your email"
          setValue={setEmail}
          keyboardType="email-address"
          setGetEmailValidationStatus={setGetEmailValidationStatus}
          value={email}
        />
        <InputText
          label="Password"
          placeholder="Enter your password"
          setValue={setPassword}
          value={password}
          isPassword={true}
        />
        <View className="mt-5">
          <TextButton
            label="Sign In"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <View className="flex flex-row justify-center items-center mt-6">
          <Text className="text-[12px] font-interregular">
            Does not have an account ?{" "}
          </Text>
          <Pressable onPress={() => navigation.navigate("SignUn")}>
            <Text className="text-primary text-[12px] font-interregular">
              Sign up
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

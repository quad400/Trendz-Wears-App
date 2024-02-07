import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputText, TextButton } from "../../components";
import { Checkbox } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Register } from "../../context/slicers";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const body = { name, email, address, password };
    setIsLoading(true);

    if (
      name == "" ||
      email === "" ||
      address === "" ||
      password === "" ||
      confirmPassword === "" ||
      isAgree === false
    ) {
      showMessage({
        message: "All input are required",
        type: "danger",
      });
      setIsLoading(false);
    } else {
      if (password === confirmPassword) {
        if (password.length > 6) {
          if (getEmailValidationStatus) {
            dispatch(Register(body));
            setIsLoading(false);
            navigation.navigate("SignIn");
          } else {
            showMessage({
              message: "Invalid email",
              type: "danger",
            });
            setIsLoading(false);
          }
        } else {
          showMessage({
            message: "password must be greater than 7 character",
            type: "danger",
          });
          setIsLoading(false);
        }
      } else {
        showMessage({
          message: "password mismatch",
          type: "danger",
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView className="bg-white h-full w-full px-5">
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View className="flex justify-start items-center ">
          <Text className="font-intersemibold text-textColor mt-4 text-[20px]">
            Create Account
          </Text>
          <Text className="font-interregular text-center w-[70%] mt-2 text-textColor text-[12px]">
            Fill your information below or register with your social account
          </Text>
        </View>

        <KeyboardAvoidingView className="mt-4 w-full">
          {/* Name */}
          <InputText
            label="Name"
            placeholder="Enter your name"
            setValue={setName}
            value={name}
          />

          {/* Email */}
          <InputText
            label="Email"
            placeholder="Enter your email"
            setValue={setEmail}
            keyboardType="email-address"
            setGetEmailValidationStatus={setGetEmailValidationStatus}
            value={email}
          />
          <View className="w-full mt-2">
            <Text>Address</Text>
            <View className="flex-row w-full h-10 px-2 mt-2 rounded-[5px] border-gray-100 border items-center">
              <TextInput
                placeholder="Enter your address"
                cursorColor="black"
                autoCapitalize="words"
                autoComplete="off"
                keyboardType="default"
                autoCorrect={false}
                value={address}
                onChangeText={setAddress}
                className="text-[14px] w-full font-intermedium outline-none"
              />
            </View>
          </View>
          <InputText
            label="Password"
            placeholder="Enter your password"
            setValue={setPassword}
            value={password}
            isPassword={true}
          />
          <InputText
            label="Confirm Password"
            placeholder="Enter your password"
            setValue={setConfirmPassword}
            value={confirmPassword}
            isPassword={true}
          />
        </KeyboardAvoidingView>
        <View className="flex flex-row mb-6 items-center justify-start">
          <Checkbox
            status={isAgree ? "checked" : "unchecked"}
            onPress={() => setIsAgree(!isAgree)}
            color="black"
            className="h-2 w-2"
          />
          <View className="flex flex-row justify-start space-x-1 items-center">
            <Text className="text-textColor font-interregular text-[12px]">
              I agree to
            </Text>
            <Pressable>
              <Text className="text-primary underline font-interregular text-[12px]">
                Terms & condition
              </Text>
            </Pressable>
          </View>
        </View>

        <TextButton
          label="Sign Up"
          isLoading={isLoading}
          onPress={handleSubmit}
          // onPress={()=>navigation.navigate("BottomNavigation", {screen: "Home"})}
        />

        <View className="flex flex-row justify-center items-center mt-6">
          <Text className="text-[12px] font-interregular">
            Already have an account ?{" "}
          </Text>
          <Pressable onPress={() => navigation.navigate("SignIn")}>
            <Text className="text-primary text-[12px] font-interregular">
              Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

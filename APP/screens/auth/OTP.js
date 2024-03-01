import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, Feather } from "@expo/vector-icons";
import { OtpInput } from "react-native-otp-entry";
import axios from "axios";
import { Loader, TextButton } from "../../components";
import { BASE_URL } from "../../context/base";
import { ResendCode, Verify } from "../../context/slicers";
import { useDispatch, useSelector } from "react-redux";

const OTP = ({ navigation, route }) => {
  const [code, setCode] = useState("");

  const token = route.params.token;
  const initialTime = 10 * 60; // 3 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    let interval = null;

    if (timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeRemaining]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const submitOTP = () => {
    const body = { code: code };
    console.log(body);
    setIsLoading(true);
    dispatch(Verify(body));
    setIsLoading(false);
  };

  function handleResendCode() {
    dispatch(ResendCode());
  }

  return (
    <SafeAreaView className="flex-1 bg-white h-full w-full mt-4 px-3">
      {loading && <Loader />}
      <View className="flex-1 w-full justify-start items-center">
        <Text className="font-interbold text-[20px] text-textColor">
          Enter Code
        </Text>
        <Text className="font-interregular text-[10px] mx-10 text-center text-gray40 mt-2">
          We have sent you an email with the code
        </Text>

        {/* error msg */}
        {alert && (
          <Text className="text-red-600 text-center mt-2 text-[12px] font-interregular">
            {alertMessage}
          </Text>
        )}

        <OtpInput
          numberOfDigits={4}
          focusColor="#404040"
          focusStickBlinkingDuration={500}
          onTextChange={setCode}
          theme={{
            containerStyle: {
              width: "60%",
              marginTop: 30,
              marginBottom: 50,
            },
            pinCodeContainerStyle: {
              backgroundColor: "#40404005",
              borderWidth: 0,
            },

            pinCodeTextStyle: {
              color: "#404040",
              fontFamily: "InterMedium",
            },
          }}
        />
        <TextButton
          label="Verify"
          isLoading={isLoading}
          onPress={submitOTP}
          // onPress={()=>navigation.navigate("BottomNavigation", {screen: "Home"})}
        />
        <Text className="text-red-600 text-[12px] font-interregular text-center">
          {formatTime(timeRemaining)}
        </Text>

        <Pressable className="mt-20" onPress={handleResendCode}>
          <Text className="font-interregular text-[12px] text-primary">
            Resend Code
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default OTP;

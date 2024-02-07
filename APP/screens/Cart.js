import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, TextButton } from "../components";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { Naira } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToCart,
  DeductFromCart,
  GetCart,
  RemovefromCart,
} from "../context/slicers";

const Cart = ({ navigation }) => {
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.product);

  useEffect(() => {
    if (cart === null) {
      dispatch(GetCart());
    }
  }, [dispatch]);

  function footerComponent() {
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
            <Text className="text-textColor text-[11px] font-interregular">
              Subtotal
            </Text>
            <Text className="text-textColor text-[14px] font-intermedium">
              {Naira.format(cart?.cartTotal)}
            </Text>
          </View>
          <View className="mt-2 flex-row justify-between items-center">
            <Text className="text-textColor text-[11px] font-interregular">
              Delivery Fee
            </Text>
            <Text className="text-textColor text-[14px] font-intermedium">
              {Naira.format(0)}
            </Text>
          </View>
          <View className="mt-2 flex-row justify-between items-center">
            <Text className="text-textColor text-[11px] font-interregular">
              Discount
            </Text>
            <Text className="text-textColor text-[14px] font-intermedium">
              {Naira.format(0)}
            </Text>
          </View>
          <View className="h-[1px] w-full bg-gray-200 mb-3 my-3" />
          <View className="mt-2 mb-4 flex-row justify-between items-center">
            <Text className="text-textColor text-[11px] font-interregular">
              Total
            </Text>
            <Text className="text-textColor text-[14px] font-intermedium">
              {Naira.format(cart?.cartTotal)}
            </Text>
          </View>
          <TextButton
            onPress={() => navigation.navigate("Checkout")}
            label="Proceed to Checkout"
          />
        </View>
      </View>
    );
  }

  const CartItem = ({ item }) => {
    const [qty, setQty] = useState(item?.quantity);

    const body = {
      productId: item?.product?._id,
      size: item?.size,
      color: item?.color,
    };
    const handleDelete = useCallback(() => {
      dispatch(RemovefromCart(item?.product?._id));
    }, [dispatch]);

    const handleDeduct = useCallback(() => {
      dispatch(DeductFromCart(body));
      setQty(qty - 1);
    }, [qty, dispatch]);

    const handleIncrease = useCallback(() => {
      dispatch(AddToCart(body));
      setQty(qty + 1);
    }, [qty, dispatch]);

    const rightSwipeAction = () => {
      return (
        <View className="h-fit mb-2 w-16 justify-center items-center bg-red-200">
          <TouchableOpacity>
            <MaterialCommunityIcons
              onPress={handleDelete}
              name="delete"
              size={24}
              color="red"
            />
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <Swipeable renderRightActions={rightSwipeAction} key={item?._id}>
        <View className="flex-row gap-3 justify-start items-center mx-3 mt-2">
          <Image
            source={{ uri: item?.product?.images[0] }}
            resizeMode="cover"
            className="h-[80px] w-[80px] rounded-md"
          />
          <View className="flex-1 h-[80px] justify-evenly">
            <Text className="text-textColor text-xs font-intersemibold">
              {item?.product?.title}
            </Text>
            <Text className="text-textColor text-[8px] font-interregular">
              Size: {item?.size}
            </Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-textColor text-xs font-intermedium">
                {Naira.format(item?.product?.price)}
              </Text>
              <View className="flex-row justify-center items-center space-x-2">
                <Pressable
                  disabled={qty < 2 ? true : false}
                  onPress={handleDeduct}
                  className="bg-gray-100 h-4 justify-center items-center w-8 rounded-sm"
                >
                  <AntDesign name="minus" size={16} color="black" />
                </Pressable>
                <Text>{qty}</Text>
                <Pressable
                  onPress={handleIncrease}
                  className="bg-primary h-4 justify-center items-center w-8 rounded-sm"
                >
                  <AntDesign name="plus" size={16} color="white" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView className="bg-white w-full h-full">
      <GestureHandlerRootView>
        <Header lable="My Cart" />
        <>
          {loading ? (
            <ActivityIndicator color="#522e10" size="large" />
          ) : (
            <FlatList
              data={cart?.products}
              ListFooterComponentStyle={{
                height: "100%",
                marginBottom: 100,
              }}
              keyExtractor={(item) => item.id}
              ListFooterComponent={
                cart === null || cart?.products.length === 0 ? (
                  <View className="w-full h-full justify-center items-center">
                    <Text className="text-xl font-intermedium text-gray-800 text-center">
                      No Product in cart
                    </Text>
                  </View>
                ) : (
                  footerComponent
                )
              }
              renderItem={({ item, index }) => {
                return <CartItem key={item?._id} item={item} />;
              }}
            />
          )}
        </>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Cart;

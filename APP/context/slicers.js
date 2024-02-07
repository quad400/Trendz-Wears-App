import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const initialState = {
  products: [],
  wishlist: [],
  user: null,
  cart: null,
  search: [],
  token: null,
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.products = [...action.payload];
    },
    getWishlist: (state, action) => {
      state.wishlist = [...action.payload];
    },
    cart: (state, action) => {
      state.cart = action.payload;
    },
    search: (state, action) => {
      state.search = action.payload;
    },
    token: (state, action) => {
      state.token = action.payload;
    },
    user: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export default slice.reducer;

/*
''''''''''''''''''''''''''PRODUCT'''''''''''''''''''''''''
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
*/
export const GetAllProduct = (page, category) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}product/?category=${category}&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(slice.actions.getAllProducts(data.products));
    } catch (error) {
      console.log("error");
      console.log(error.message);
    }
  };
};

export const SearchProduct = (search) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`${BASE_URL}product/?s=${search}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(slice.actions.search(data.products));
    } catch (error) {
      console.log("error");
      console.log(error.message);
    }
  };
};

/*
''''''''''''''''''''''''''CART'''''''''''''''''''''''''
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
*/

export const GetCart = () => {
  return async (dispatch, getState) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios.get(`${BASE_URL}cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(slice.actions.cart(data));
    } catch (error) {
      console.log("error");
      console.log(error.message);
    }
  };
};

export const AddToCart = (body) => {
  return async (dispatch, getState) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(`${BASE_URL}cart/add`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showMessage({
        message: "Product is successfully added to cart",
        type: "success",
      });
      dispatch(GetCart());
    } catch (error) {
      console.log("error");
      console.log(error.message);
    }
  };
};

export const DeductFromCart = (body) => {
  return async (dispatch, getState) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(`${BASE_URL}cart/remove`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showMessage({
        message: "Product successfully deducted",
        type: "success",
      });
      dispatch(GetCart());
    } catch (error) {
      console.log("error");
      console.log(error.message);
    }
  };
};

export const RemovefromCart = (id) => {
  return async (dispatch, getState) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(`${BASE_URL}cart/remove/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showMessage({
        message: "Product successfully delete from cart",
        type: "success",
      });
      dispatch(GetCart());
    } catch (error) {
      console.log("error");
      console.log(error.message);
    }
  };
};

/*
'''''''''''''''''''''''''' WISHLIST'''''''''''''''''''''''''
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
*/
export const GetWishlist = () => {
  return async (dispatch, getState) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios.get(`${BASE_URL}user/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(slice.actions.getWishlist(data?.data));
    } catch (error) {
      console.log("error");
      console.log(error.message);
    }
  };
};

export const AddToWishlist = (id) => {
  return async (dispatch, getState) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios.put(`${BASE_URL}user/wishlist/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(GetWishlist());
    } catch (error) {
      console.log("error");
      console.log(error.message);
    }
  };
};

/*
''''''''''''''''''''''''''USER'''''''''''''''''''''''''
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
*/
export const Register = (body) => {
  return async (dispatch, getState) => {
    try {
      await axios.post(`${BASE_URL}user/register`, body, {
        headers: { "Content-Type": "application/json" },
      });
      showMessage({
        message: "Account created successfully",
        type: "success",
      });
    } catch (error) {
      showMessage({
        message: "User already exists with that email",
        type: "danger",
      });
      console.log("Error: ", error.message);
    }
  };
};

export const Login = (body, navigation) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(`${BASE_URL}user/login`, body, {
        headers: { "Content-Type": "application/json" },
      });
      if (data?.email_verified === false) {
        await AsyncStorage.setItem("token", data?.token);
        navigation.navigate("OTP", { token: data?.token });
        showMessage({
          message: "OTP has been sent to this email",
          type: "success",
        });
      } else {
        dispatch(slice.actions.token(data?.token));
      }
      dispatch(slice.actions.user(data));
    } catch (error) {
      showMessage({
        message: "Invalid details",
        type: "danger",
      });
      console.log("Error: ", error.message);
    }
  };
};

export const Verify = (body) => {
  return async (dispatch, getState) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios.post(`${BASE_URL}user/verify`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(slice.actions.user(data?.data));
      dispatch(slice.actions.token(token));
    
    } catch (error) {
      showMessage({
        message: "Invalid OTP code or has expire",
        type: "danger",
      });
      console.log("Error: ", error.message);
    }
  };
};
export const ResendCode = () => {
  
  return async (dispatch, getState) => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log()
      const res = await axios.post(`${BASE_URL}user/regenerate-otp`, null,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      showMessage({
        message: "OTP has been resent to your mail",
        type: "success",
      });
      console.log(res.data);
    } catch (e) {
      showMessage({
        message: e.message,
        type: "danger",
      });
      console.log(e.message);
    }
  };
};

export const GetUser = () => {
  return async (dispatch, getState) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const { data } = await axios.get(`${BASE_URL}user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(slice.actions.user(data));
      }
    } catch (error) {
      console.log("error");
      console.log(error.message);
    }
  };
};

export const Logout = () => {
  return (dispatch, getState) => {
    dispatch(slice.actions.logout());
  };
};

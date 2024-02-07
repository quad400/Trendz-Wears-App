import axios from "axios";
import { BASE_URL } from "./base";

/*
''''''''''''''''''''''''''AUTHENTICATION'''''''''''''''''''''''''
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
*/

export const Register = async (body) => {
  try {
    const { data } = await axios.post(`${BASE_URL}user/register`, body, {
      headers: { "Content-Type": "application/json" },
    });

    return data;
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export const Login = async (body) => {
  try {
    const { data } = await axios.post(`${BASE_URL}user/login`, body, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export const Verify = async (body, token) => {
  try {
    console.log("body", body);
    console.log("token", token);
    const { data } = await axios.post(`${BASE_URL}user/verify`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export const ResendCode = async (token) => {
  console.log(token);
  try {
    const res = await axios.post(`${BASE_URL}user/regenerate-otp`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
  } catch (e) {
    console.log(e.message);
  }
};




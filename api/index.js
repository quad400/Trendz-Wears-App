import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const products = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product/`);
    console.log(response.data)
    return response.data
} catch (e) {
    console.log(e.message)
  }
};

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, ScrollView, Text, View } from "react-native";
import { API_URL } from "@env";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API response error", error.response);
    } else {
      console.error("Error get data product", error.message);
    }
    throw error;
  }
};
console.log("API url:", API_URL);

const LoginScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView className="flex-1 bg-gray-100 py-10 gap-4 px-6">
      {products.length > 0 &&
        products.map((item, index) => (
          <View key={index} className=" border border-slate-500">
            <Image source={{ uri: item.image }} className="w-auto h-40" />
            <Text>{item.title.substring(0, 25)} ...</Text>
            <Text>$ {item.price}</Text>
          </View>
        ))}
    </ScrollView>
  );
};
export default LoginScreen;

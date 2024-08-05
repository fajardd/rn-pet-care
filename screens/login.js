import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from "react-native";
import Cookies from "js-cookie";
import { login } from "../services/auth.services";

const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (value, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const data = await login(formData);
      setFormData({
        email: "",
        password: "",
      });
      console.log("data login", data);

      Cookies.set("token", data.token, { expires: 1 / 24 }); // 1 jam = 1/24 hari

      navigation.navigate("Home");
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1">
      <View className="flex-1  items-center bg-white px-6 space-y-12">
        <View className="mt-16 justify-center items-center px-10">
          <Text className="font-bold text-2xl  text-[#1F4DD2] mb-2">
            Login here
          </Text>
          <Text className="text-center font-medium">
            Welcome back to the medical records application
          </Text>
        </View>
        <View className="p-6 w-full">
          <View className="space-y-2">
            <Text>Email</Text>
            <TextInput
              name="email"
              value={formData.email}
              onChangeText={(value) => handleInputChange(value, "email")}
              placeholder="Masukkan Email"
              className="border border-slate-400 focus:border-[#1F4DD2] rounded-md bg-white p-2"
              autoCapitalize="none"
            />
          </View>
          <View className="mt-6 space-y-2">
            <Text>Password</Text>
            <TextInput
              name="password"
              value={formData.password}
              onChangeText={(value) => handleInputChange(value, "password")}
              placeholder="Masukkan Password"
              className="border border-slate-400 focus:border-[#1F4DD2] rounded-md bg-white p-2"
              secureTextEntry
            />
          </View>
          <View className="mt-2">
            {errorMessage ? (
              <Text style={{ color: "red" }}>{errorMessage}</Text>
            ) : null}
          </View>
          <View className="mt-6 rounded-md">
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className="bg-[#1F4DD2] py-3 rounded-md"
            >
              <Text className="text-white text-center">
                {isLoading ? "Logging in..." : "Login"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text className="text-slate-400 mt-24 ">v0.1.0</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

import axios from "axios";
import { API_URL } from "@env";
console.log("env:", API_URL);

export const login = async (loginData) => {
  const response = await axios.post(
    `http://192.168.78.209:4000/mob/v1/login`,
    loginData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

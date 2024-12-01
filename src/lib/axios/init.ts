import axios from "axios";

const APIInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API ?? "https://fakestoreapi.com",
});

export default APIInstance
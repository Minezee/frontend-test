import axios from "axios";

const APIInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export default APIInstance
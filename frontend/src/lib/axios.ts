import axios from "axios";

const BASE_URL = "https://be-ticketinggp.vercel.app/api";

export default axios.create({
  baseURL: BASE_URL,
});
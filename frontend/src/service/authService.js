import axios from "axios";

export const userData = (data) => axios.post("/auth/register", data)
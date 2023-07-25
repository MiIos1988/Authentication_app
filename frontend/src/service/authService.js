import axios from "axios";

export const userData = (data) => axios.post("http://localhost:5050/auth/register", data)
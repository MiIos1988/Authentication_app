import axios from "axios";

export const userData = (data) => axios.post("/auth/register", data)

export const userDataGoogle = (data) => axios.post("/auth/register-google", data)
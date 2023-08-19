import axios from "axios";

export const userData = (data) => axios.post("/auth/register", data);

export const userDataGoogle = (data) => axios.post("/auth/register-google", data);

export const loginData = (data) => axios.post("/auth/login", data);
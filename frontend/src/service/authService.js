import axios from "axios";
import jwt_decode from 'jwt-decode';

export const userData = (data) => axios.post("/auth/register", data);

export const userDataGoogle = (data) => axios.post("/auth/register-google", data);

export const loginData = (data) => axios.post("/auth/login", data);

export const resetPassword = (data) => axios.post("/auth/reset-password", data);

export const userDataGoogleLogin = (data) => axios.post("/auth/login-google", data);

export const setTokenInLocalStorage = (token) => localStorage.setItem("token-acc", JSON.stringify(token))

export const isUserLogin = () => localStorage.getItem("token-acc");

export const isUser = () => isUserLogin() && jwt_decode(localStorage.getItem("token-acc"))?.role === "user";

export const isAdmin = () => isUserLogin() && jwt_decode(localStorage.getItem("token-acc"))?.role === "admin";